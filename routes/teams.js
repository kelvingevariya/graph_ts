const router = require("express-promise-router").default();
const graph = require("../graph.js");

/* GET /teams */
router.get("/", async function (req, res) {
  if (!req.session.userId) {
    // Redirect unauthenticated requests to home page
    res.redirect("/");
  } else {
    const params = {
      active: { teams: true },
    };

    try {
      // Get the Teams meetings
      const meetings = await graph.getTeamsMeetings(
        req.app.locals.msalClient,
        req.session.userId,
      );

      // Assign the meetings to the view parameters
      params.meetings = meetings.value;
    } catch (err) {
      req.flash("error_msg", {
        message: "Could not fetch Teams meetings",
        debug: JSON.stringify(err, Object.getOwnPropertyNames(err)),
      });
    }

    res.render("teams", params);
  }
});

module.exports = router;
