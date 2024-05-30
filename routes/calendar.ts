import express, { Request, Response } from "express";

import dateFns from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";
import iana from "windows-iana";
import { body, validationResult } from "express-validator";
import validator from "validator";
import { createEvent, getCalendarView } from "../graph";

const router = express.Router();

interface CalendarParams {
  active: { calendar: boolean };
  events?: any[]; // Adjust the type of events based on your actual data structure
}

router.get("/", async (req: Request, res: Response) => {
  if (!req.session.userId) {
    res.redirect("/");
  } else {
    const params: CalendarParams = {
      active: { calendar: true },
    };

    const user = req.app.locals.users[req.session.userId];
    const timeZoneId = iana.findIana(user.timeZone)[0];
    console.log(`Time zone: ${timeZoneId.valueOf()}`);

    const weekStart = zonedTimeToUtc(
      dateFns.startOfWeek(new Date()),
      timeZoneId.valueOf(),
    );
    const weekEnd = dateFns.addDays(weekStart, 7);
    console.log(`Start: ${dateFns.formatISO(weekStart)}`);

    try {
      const events = await getCalendarView(
        req.app.locals.msalClient,
        req.session.userId,
        dateFns.formatISO(weekStart),
        dateFns.formatISO(weekEnd),
        user.timeZone,
      );

      params.events = events.value;
    } catch (err) {
      req.flash("error_msg", [
        "Could not fetch events",
        `Debug info: ${JSON.stringify(err, Object.getOwnPropertyNames(err))}`,
      ]);
    }

    res.render("calendar", params);
  }
});

router.get("/new", (req: Request, res: Response) => {
  if (!req.session.userId) {
    res.redirect("/");
  } else {
    res.locals.newEvent = {};
    res.render("newevent");
  }
});

router.post(
  "/new",
  [
    body("ev-subject").escape(),
    body("ev-attendees")
      .customSanitizer((value) => value.split(";"))
      .custom((value) => {
        value.forEach((element) => {
          if (!validator.isEmail(element)) {
            throw new Error("Invalid email address");
          }
        });
        return true;
      }),
    body("ev-start").isISO8601(),
    body("ev-end").isISO8601(),
    body("ev-body").escape(),
  ],
  async (req: Request, res: Response) => {
    if (!req.session.userId) {
      res.redirect("/");
    } else {
      const formData = {
        subject: req.body["ev-subject"],
        attendees: req.body["ev-attendees"],
        start: req.body["ev-start"],
        end: req.body["ev-end"],
        body: req.body["ev-body"],
      };

      const formErrors = validationResult(req);
      if (!formErrors.isEmpty()) {
        let invalidFields = "";
        formErrors.array().forEach((error) => {
          if (error.type === "field") {
            invalidFields += `${error.path.slice(3)},`;
          }
        });

        formData.attendees = formData.attendees.join(";");
        return res.render("newevent", {
          newEvent: formData,
          error: [
            {
              message: `Invalid input in the following fields: ${invalidFields}`,
            },
          ],
        });
      }

      const user = req.app.locals.users[req.session.userId];

      try {
        await createEvent(
          req.app.locals.msalClient,
          req.session.userId,
          formData,
          user.timeZone,
        );
      } catch (error) {
        req.flash("error_msg", [
          "Could not create event",
          `Debug info: ${JSON.stringify(
            error,
            Object.getOwnPropertyNames(error),
          )}`,
        ]);
      }

      res.redirect("/calendar");
    }
  },
);

export default router;
