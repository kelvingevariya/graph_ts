import express, { Request, Response } from "express";
import { getTeamsMeetings } from "../graph";

interface TeamsParams {
  active: { teams: boolean };
  meetings?: any[]; // Adjust the type of meetings based on your actual data structure
}
const router = express.Router();

/* GET /teams */
router.get("/", async function (req, res) {
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

      // Assign the meetings to the view parameters
      params.meetings = meetings.value;
    } catch (err) {
      req.flash("error_msg", [
        "Could not fetch Teams meetings",
        `Debug info: ${JSON.stringify(err, Object.getOwnPropertyNames(err))}`,
      ]);
    }

    res.render("teams", params);
  }
});

export default router;
