import express from "express";
import { Request, Response } from "express";
import { createSubscription, getUserDetails } from "../graph";

import { ConfidentialClientApplication } from "@azure/msal-node";
import { Session } from "express-session";

const router = express.Router();

router.get(
  "/signin",
  async (
    req: Request & {
      session: Session & { userId?: string };
    },
    res: Response,
  ) => {
    const scopes =
      process.env.OAUTH_SCOPES || "https://graph.microsoft.com/.default";

    const urlParameters = {
      scopes: scopes.split(","),
      redirectUri: process.env.OAUTH_REDIRECT_URI!,
    };

    try {
      const authUrl = await (
        req.app.locals.msalClient as ConfidentialClientApplication
      ).getAuthCodeUrl(urlParameters);
      res.redirect(authUrl);
    } catch (error) {
      console.log(`Error: ${error}`);
      req.flash("error_msg", [
        "Could not fetch events",
        `Debug info: ${JSON.stringify(
          error,
          Object.getOwnPropertyNames(error),
        )}`,
      ]);
      res.redirect("/");
    }
  },
);

router.get(
  "/callback",
  async (
    req: Request & {
      session: Session & { userId?: string };
    },
    res: Response,
  ) => {
    const scopes =
      process.env.OAUTH_SCOPES || "https://graph.microsoft.com/.default";
    const tokenRequest = {
      code: req.query.code as string,
      scopes: scopes.split(","),
      redirectUri: process.env.OAUTH_REDIRECT_URI!,
    };

    try {
      const response = await (
        req.app.locals.msalClient as ConfidentialClientApplication
      ).acquireTokenByCode(tokenRequest);

      req.session.userId = response.account!.homeAccountId;

      const user = await getUserDetails(
        req.app.locals.msalClient,
        req.session.userId,
      );

      req.app.locals.users[req.session.userId] = {
        displayName: user.displayName,
        email: user.mail || user.userPrincipalName,
        timeZone: user.mailboxSettings.timeZone,
      };
    } catch (error) {
      req.flash("error_msg", [
        "Error completing authentication",
        JSON.stringify(error, Object.getOwnPropertyNames(error)),
      ]);
    }

    const msalClient = req.app.locals
      .msalClient as ConfidentialClientApplication;
    const userId = req.session.userId || "";

    (async () => {
      try {
        await createSubscription(msalClient, userId);
      } catch (error) {
        console.error("Error setting up subscription:", error);
      }
    })();

    res.redirect("/");
  },
);

router.get(
  "/signout",
  async (
    req: Request & {
      session: Session & { userId?: string };
    },
    res: Response,
  ) => {
    if (req.session.userId) {
      const accounts = await (
        req.app.locals.msalClient as ConfidentialClientApplication
      )
        .getTokenCache()
        .getAllAccounts();

      const userAccount = accounts.find(
        (a) => a.homeAccountId === req.session.userId,
      );

      if (userAccount) {
        await (req.app.locals.msalClient as ConfidentialClientApplication)
          .getTokenCache()
          .removeAccount(userAccount);
      }
    }

    req.session.destroy(() => {
      res.redirect("/");
    });
  },
);

export default router;
