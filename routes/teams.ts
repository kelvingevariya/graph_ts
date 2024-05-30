import express, { Request, Response } from "express";
import { getTeamsMeetings } from "../graph";
import { Session } from "express-session";
import { Meetings } from "../types/Meetings";

interface TeamsParams {
  active: { teams: boolean };
  meetings?: Meetings[]; // Adjust the type of meetings based on your actual data structure
}
const router = express.Router();

/* GET /teams */
router.get(
  "/",
  async function (
    req: Request & {
      session: Session & { userId?: string };
    },
    res: Response,
  ) {
    if (!req.session.userId) {
      // Redirect unauthenticated requests to home page
      res.redirect("/");
    } else {
      const params: TeamsParams = {
        active: { teams: true },
      };

      try {
        // Get the Teams meetings
        const meetings = await getTeamsMeetings(
          req.app.locals.msalClient,
          req.session.userId,
        );
        console.log(JSON.stringify(meetings));
        // Assign the meetings to the view parameters
        //@ts-ignore
        // params.meetings = meetings.value;
      } catch (err) {
        req.flash("error_msg", [
          "Could not fetch Teams meetings",
          `Debug info: ${JSON.stringify(err, Object.getOwnPropertyNames(err))}`,
        ]);
      }

      res.render("teams", params);
    }
  },
);

export default router;
