export type Meetings = {
  "@odata.etag": string;
  id: string;
  subject: string;
  isOnlineMeeting: boolean;
  start: StartOrEnd;
  end: StartOrEnd;
  organizer: Organizer;
  onlineMeeting: OnlineMeeting;
};
export type StartOrEnd = {
  dateTime: string;
  timeZone: string;
};
export type Organizer = {
  emailAddress: EmailAddress;
};
export type EmailAddress = {
  name: string;
  address: string;
};
export type OnlineMeeting = {
  joinUrl: string;
};

/**
 * 
 * "id","originalStartTimeZone","originalEndTimeZone","subject","weblink","body","start","end","organizer","onlineMeeting"
 *  {
    "@odata.etag": "W/\"ZSt0LS9d+kihqNB4oLpvpwAAZXiRFw==\"",
    "id": "AQMkADAwATNiZmYAZC03MDVkLWQyNjQtMDACLTAwCgBGAAADibpzyrdo1kqB-CnypSavfAcAZSt0LS9d_kihqNB4oLpvpwAAAgENAAAAZSt0LS9d_kihqNB4oLpvpwAAAGV3CfoAAAA=",
    "createdDateTime": "2024-05-28T07:12:29.2981357Z",
    "lastModifiedDateTime": "2024-05-28T07:14:29.9432038Z",
    "changeKey": "ZSt0LS9d+kihqNB4oLpvpwAAZXiRFw==",
    "categories": [],
    "transactionId": null,
    "originalStartTimeZone": "India Standard Time",
    "originalEndTimeZone": "India Standard Time",
    "iCalUId": "040000008200E00074C5B7101A82E0080000000002EFA766CEB0DA01000000000000000010000000580022419E2E7E49A4BDF4C478C0C23E",
    "uid": "040000008200E00074C5B7101A82E0080000000002EFA766CEB0DA01000000000000000010000000580022419E2E7E49A4BDF4C478C0C23E",
    "reminderMinutesBeforeStart": 15,
    "isReminderOn": true,
    "hasAttachments": false,
    "subject": "Test Meeting",
    "bodyPreview": "________________________________________________________________________________\r\nMicrosoft Teams meeting\r\nJoin on your computer, mobile app or room device\r\nClick here to join the meeting\r\nMeeting ID: 952 936 617 595 8\r\nPasscode: t9rC3T\r\nDownload Te",
    "importance": "normal",
    "sensitivity": "normal",
    "isAllDay": false,
    "isCancelled": false,
    "isOrganizer": true,
    "responseRequested": true,
    "seriesMasterId": null,
    "showAs": "busy",
    "type": "singleInstance",
    "webLink": "https://outlook.live.com/owa/?itemid=AQMkADAwATNiZmYAZC03MDVkLWQyNjQtMDACLTAwCgBGAAADibpzyrdo1kqB%2FCnypSavfAcAZSt0LS9d%2BkihqNB4oLpvpwAAAgENAAAAZSt0LS9d%2BkihqNB4oLpvpwAAAGV3CfoAAAA%3D&exvsurl=1&path=/calendar/item",
    "onlineMeetingUrl": null,
    "isOnlineMeeting": true,
    "onlineMeetingProvider": "teamsForBusiness",
    "allowNewTimeProposals": true,
    "occurrenceId": null,
    "isDraft": false,
    "hideAttendees": false,
    "responseStatus": {
      "response": "organizer",
      "time": "0001-01-01T00:00:00Z"
    },
    "body": {
      "contentType": "html",
      "content": "<html>\r\n<head>\r\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\r\n</head>\r\n<body>\r\n<div><br>\r\n<br>\r\n<br>\r\n<div style=\"width:100%\"><span style=\"white-space:nowrap; color:#5F5F5F; opacity:.36\">________________________________________________________________________________</span>\r\n</div>\r\n<div class=\"me-email-text\" lang=\"\" style=\"color:#252424; font-family:'Segoe UI','Helvetica Neue',Helvetica,Arial,sans-serif\">\r\n<div style=\"margin-top:24px; margin-bottom:20px\"><span style=\"font-size:24px; color:#252424\">Microsoft Teams meeting</span>\r\n</div>\r\n<div style=\"margin-bottom:20px\">\r\n<div style=\"margin-top:0px; margin-bottom:0px; font-weight:bold\"><span style=\"font-size:14px; color:#252424\">Join on your computer, mobile app or room device</span>\r\n</div>\r\n<a href=\"https://teams.live.com/meet/9529366175958?p=2uWRqoXXYDKomUF7kH\" class=\"me-email-headline\" style=\"font-size:14px; font-family:'Segoe UI Semibold','Segoe UI','Helvetica Neue',Helvetica,Arial,sans-serif; text-decoration:underline; color:#6264a7\">Click\r\n here to join the meeting</a> </div>\r\n<div style=\"margin-bottom:20px; margin-top:20px\">\r\n<div style=\"margin-bottom:4px\"><span data-tid=\"meeting-code\" style=\"font-size:14px; color:#252424\">Meeting ID:\r\n<span style=\"font-size:16px; color:#252424\">952 936 617 595 8</span> </span><br>\r\n<span style=\"font-size:14px; color:#252424\">Passcode: </span><span style=\"font-size:16px; color:#252424\">t9rC3T\r\n</span>\r\n<div style=\"font-size:14px\"><a href=\"https://www.microsoft.com/en-us/microsoft-teams/download-app\" class=\"me-email-link\" style=\"font-size:14px; text-decoration:underline; color:#6264a7; font-family:'Segoe UI','Helvetica Neue',Helvetica,Arial,sans-serif\">Download\r\n Teams</a> | <a href=\"https://www.microsoft.com/microsoft-teams/join-a-meeting\" class=\"me-email-link\" style=\"font-size:14px; text-decoration:underline; color:#6264a7; font-family:'Segoe UI','Helvetica Neue',Helvetica,Arial,sans-serif\">\r\nJoin on the web</a></div>\r\n</div>\r\n</div>\r\n<div style=\"margin-bottom:24px; margin-top:20px\"><a href=\"https://aka.ms/JoinTeamsMeeting\" class=\"me-email-link\" style=\"font-size:14px; text-decoration:underline; color:#6264a7; font-family:'Segoe UI','Helvetica Neue',Helvetica,Arial,sans-serif\">Learn More</a>\r\n | <a href=\"https://teams.live.com/meetingOptions/meetings/9529366175958/view?localeCode=en-US\" class=\"me-email-link\" style=\"font-size:14px; text-decoration:underline; color:#6264a7; font-family:'Segoe UI','Helvetica Neue',Helvetica,Arial,sans-serif\">\r\nMeeting options</a> </div>\r\n</div>\r\n<div style=\"font-size:14px; margin-bottom:4px; font-family:'Segoe UI','Helvetica Neue',Helvetica,Arial,sans-serif\">\r\n</div>\r\n<div style=\"font-size:12px\"></div>\r\n</div>\r\n<div style=\"width:100%\"><span style=\"white-space:nowrap; color:#5F5F5F; opacity:.36\">________________________________________________________________________________</span>\r\n</div>\r\n<div></div>\r\n<div style=\"opacity:0.5\"><br>\r\nReplies and calendar responses will not be sent to the organizer</div>\r\n</body>\r\n</html>\r\n"
    },
    "start": {
      "dateTime": "2024-05-28T07:30:00.0000000",
      "timeZone": "UTC"
    },
    "end": {
      "dateTime": "2024-05-28T08:00:00.0000000",
      "timeZone": "UTC"
    },
    "location": {
      "displayName": "Microsoft Teams Meeting",
      "locationType": "default",
      "uniqueId": "Microsoft Teams Meeting",
      "uniqueIdType": "private"
    },
    "locations": [
      {
        "displayName": "Microsoft Teams Meeting",
        "locationType": "default",
        "uniqueId": "Microsoft Teams Meeting",
        "uniqueIdType": "private"
      }
    ],
    "recurrence": null,
    "attendees": [],
    "organizer": {
      "emailAddress": {
        "name": "Kelvin Gevariya",
        "address": "outlook_4CDD93284314540A@outlook.com"
      }
    },
    "onlineMeeting": {
      "joinUrl": "https://teams.live.com/meet/9529366175958?p=2uWRqoXXYDKomUF7kH"
    },
    "calendar@odata.associationLink": "https://graph.microsoft.com/v1.0/users('outlook_4CDD93284314540A@outlook.com')/calendars('AQMkADAwATNiZmYAZC03MDVkLWQyNjQtMDACLTAwCgBGAAADibpzyrdo1kqB-CnypSavfAcAZSt0LS9d_kihqNB4oLpvpwAAAgEGAAAAZSt0LS9d_kihqNB4oLpvpwAAACx2wwwAAAA=')/$ref",
    "calendar@odata.navigationLink": "https://graph.microsoft.com/v1.0/users('outlook_4CDD93284314540A@outlook.com')/calendars('AQMkADAwATNiZmYAZC03MDVkLWQyNjQtMDACLTAwCgBGAAADibpzyrdo1kqB-CnypSavfAcAZSt0LS9d_kihqNB4oLpvpwAAAgEGAAAAZSt0LS9d_kihqNB4oLpvpwAAACx2wwwAAAA=')"
  }
 */
