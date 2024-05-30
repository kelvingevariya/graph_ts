import createError from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import session, { Session } from "express-session";

import flash from "connect-flash";
import { ConfidentialClientApplication, LogLevel } from "@azure/msal-node";
import indexRouter from "./routes/index";
import notificationRouter from "./routes/webhook";

import teamsRouter from "./routes/teams";
import webhookRouter from "./routes/webhook";
import authRouter from "./routes/auth";
import calendarRouter from "./routes/calendar";

dotenv.config();

const app = express();

// In-memory storage of logged-in users
app.locals.users = {};

// MSAL config
const msalConfig = {
  auth: {
    clientId: process.env.OAUTH_CLIENT_ID || "",
    authority: process.env.OAUTH_AUTHORITY!,
    clientSecret: process.env.OAUTH_CLIENT_SECRET!,
  },
  system: {
    loggerOptions: {
      loggerCallback(
        loglevel: LogLevel,
        message: string,
        containsPii: boolean,
      ) {
        if (!containsPii) console.log(message);
      },
      piiLoggingEnabled: false,
      logLevel: LogLevel.Verbose,
    },
  },
};

// Create msal application object

app.locals.msalClient = new ConfidentialClientApplication(msalConfig);

// Session middleware
app.use(
  session({
    secret: "value",
    resave: false,
    saveUninitialized: false,
    unset: "destroy",
  }),
);

// Flash middleware
app.use(flash());

// Set up local vars for template layout
app.use(
  (
    req: Request & {
      session: Session & { userId?: string };
    },
    res: Response,
    next: NextFunction,
  ) => {
    res.locals.error = req.flash("error_msg");

    const errs = req.flash("error");
    for (const err of errs) {
      res.locals.error.push({ message: "An error occurred", debug: err });
    }

    try {
      if (req.session.userId) {
        res.locals.user = app.locals.users[req.session.userId];
      }
    } catch (error) {
      console.log(error);
    }
    next();
  },
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

import hbs from "hbs";
import { parseISO, format } from "date-fns";
hbs.registerHelper("eventDateTime", (dateTime: string) => {
  const date = parseISO(dateTime);
  return format(date, "M/d/yy h:mm a");
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/calendar", calendarRouter);
app.use("/teams", teamsRouter);

app.use("/webhook", webhookRouter);
app.use("/notifications", notificationRouter);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

// error handler
app.use((err: any, req: Request, res: Response) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

app.listen(3000, () => {
  console.log("Server Started");
});

export default app;
