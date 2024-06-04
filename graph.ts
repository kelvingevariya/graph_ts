// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Client } from "@microsoft/microsoft-graph-client";
import "isomorphic-fetch";
import { ConfidentialClientApplication } from "@azure/msal-node";
import { Meetings } from "./types/Meetings";

interface Subscription {
  changeType: string;
  notificationUrl: string;
  resource: string;
  expirationDateTime: string;
  clientState: string;
}

interface FormData {
  subject: string;
  start: string;
  end: string;
  body: string;
  attendees?: string[];
}

interface Meeting {
  subject: string;
  organizer: any;
  start: any;
  end: any;
  onlineMeeting: any;
  isOnlineMeeting: boolean;
}

export async function createSubscription(
  msalClient: ConfidentialClientApplication,
  userId: string,
) {
  const client = getAuthenticatedClient(msalClient, userId);
  try {
    const subscription: Subscription = {
      changeType: "created,updated,deleted",
      notificationUrl:
        "https://1f71-2406-b400-d11-38e0-698e-8861-2149-76be.ngrok-free.app/notifications",
      resource: "/me/events",
      expirationDateTime: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
      clientState: "SecretClientState",
    };
    try {
      const response = await client.api("/subscriptions").post(subscription);
      console.log("Subscription created:", response);
    } catch (error) {
      console.log(
        "Error creating subscription:",
        JSON.stringify(error, null, 2),
      );
    }
  } catch (error) {
    console.error("Error creating subscription:", error);
  }
}

export async function getUserDetails(
  msalClient: ConfidentialClientApplication,
  userId: string,
) {
  const client = getAuthenticatedClient(msalClient, userId);

  const user = await client
    .api("/me")
    .select("displayName,mail,mailboxSettings,userPrincipalName")
    .get();
  return user;
}

export async function getCalendarView(
  msalClient: ConfidentialClientApplication,
  userId: string,
  start: string,
  end: string,
  timeZone: string,
) {
  const client = getAuthenticatedClient(msalClient, userId);

  return client
    .api("/me/calendarview")
    .header("Prefer", `outlook.timezone="${timeZone}"`)
    .query({
      startDateTime: encodeURIComponent(start),
      endDateTime: encodeURIComponent(end),
    })
    .select("subject,organizer,start,end")
    .orderby("start/dateTime")
    .top(50)
    .get();
}

export async function createEvent(
  msalClient: ConfidentialClientApplication,
  userId: string,
  formData: FormData,
  timeZone: string,
) {
  const client = getAuthenticatedClient(msalClient, userId);

  const newEvent: any = {
    subject: formData.subject,
    start: {
      dateTime: formData.start,
      timeZone: timeZone,
    },
    end: {
      dateTime: formData.end,
      timeZone: timeZone,
    },
    body: {
      contentType: "text",
      content: formData.body,
    },
  };

  if (formData.attendees) {
    newEvent.attendees = [];
    formData.attendees.forEach((attendee) => {
      newEvent.attendees.push({
        type: "required",
        emailAddress: {
          address: attendee,
        },
      });
    });
  }

  await client.api("/me/events").post(newEvent);
}

export async function getTeamsMeetings(
  msalClient: ConfidentialClientApplication,
  userId: string,
  timeZone: string,
) {
  const client = getAuthenticatedClient(msalClient, userId);

  try {
    const meetingsGet = await client
      .api("/me/events")
      .header("Prefer", `outlook.timezone="${timeZone}"`)
      .select([
        "id",
        "originalStartTimeZone",
        "originalEndTimeZone",
        "subject",
        "weblink",
        "body",
        "start",
        "end",
        "organizer",
        "onlineMeeting",
        "isOnlineMeeting",
      ])

      .get();

    const onlineMeetings = meetingsGet.value.filter(
      (event) => event.isOnlineMeeting === true,
    );

    return onlineMeetings;
  } catch (error) {
    console.log(JSON.stringify(error), "11111111");
    return 0;
  }
}

export function getAuthenticatedClient(
  msalClient: ConfidentialClientApplication,
  userId: string,
): Client {
  if (!msalClient || !userId) {
    throw new Error(
      `Invalid MSAL state. Client: ${
        msalClient ? "present" : "missing"
      }, User ID: ${userId ? "present" : "missing"}`,
    );
  }

  const client = Client.init({
    authProvider: async (done) => {
      try {
        const account = await msalClient
          .getTokenCache()
          .getAccountByHomeId(userId);

        if (account) {
          const scopes =
            process.env.OAUTH_SCOPES || "https://graph.microsoft.com/.default";
          const response = await msalClient.acquireTokenSilent({
            scopes: scopes.split(","),
            redirectUri: process.env.OAUTH_REDIRECT_URI,
            account: account,
          });

          done(null, response.accessToken);
        }
      } catch (err) {
        console.log(JSON.stringify(err, Object.getOwnPropertyNames(err)));
        done(err, null);
      }
    },
  });

  return client;
}

export async function getEventDetails(
  userId: string,
  eventId: string,
  msalClient,
) {
  const client = getAuthenticatedClient(msalClient, userId);

  try {
    const event = await client
      .api(`/me/events/${eventId}`)
      .select("subject,organizer,start,end,onlineMeeting,isOnlineMeeting")
      .get();

    return event;
  } catch (error) {
    console.error("Error getting event details:", error);
    return null;
  }
}
