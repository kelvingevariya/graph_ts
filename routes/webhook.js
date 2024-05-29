const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

// Middleware to parse JSON bodies
router.use(bodyParser.json());

// Endpoint to receive notifications
router.post("/", (req, res) => {
  // Respond to validation request

  // Handle the notification
  const notification = req.body;
  console.log("Received notification:", notification);

  // Process the notification (e.g., send an alert)
  // ...

  res.status(200).json({ notification: notification });
});

router.get("/", (req, res) => {
  res.status(200).send("Ok");
});

module.exports = router;
