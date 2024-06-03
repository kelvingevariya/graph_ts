import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { scheduleTask } from "../Bot/BotFile";
import { getEventDetails } from "../graph";

const router = express.Router();

router.use(bodyParser.json());

router.post("/", async (req: Request, res: Response) => {
  if (req.query.validationToken) {
    res.status(200).send(req.query.validationToken);
  } else {
    const notification = req.body;

    if (notification.value && notification.value.length > 0) {
      for (const event of notification.value) {
        if (event.changeType === "created" && event.resourceData) {
          const eventId = event.resourceData.id;
          const userId = event.resource.split("/")[1]; // Extract userId from resource

          // Get event details using Microsoft Graph API
          const eventDetails = await getEventDetails(
            userId,
            eventId,
            req.app.locals.msalClient,
          );

          if (eventDetails && eventDetails.onlineMeeting) {
            const meetingUrl = eventDetails.onlineMeeting.joinUrl;
            const startTime = eventDetails.start.dateTime;
            const timeZone = eventDetails.start.timeZone;

            // Schedule the bot to join the meeting
            scheduleTask(meetingUrl, startTime, timeZone);
          }
          //origin
        }
      }
    }

    console.log("Received notification:");
    res.status(202).json({ notification });
  }
});

export default router;
