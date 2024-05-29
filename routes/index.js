// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// <IndexRouterSnippet>
var express = require("express");
var router = express.Router();
const { createSubscription } = require("../graph");

/* GET home page. */
router.get("/", function (req, res) {
  const msalClient = req.app.locals.msalClient;
  const userId = req.session.userId;

  console.log(userId, msalClient);

  (async () => {
    try {
      await createSubscription(msalClient, userId);
    } catch (error) {
      console.error("Error setting up subscription:", error);
    }
  })();
  let params = {
    active: { home: true },
  };

  res.render("index", params);
});

module.exports = router;
// </IndexRouterSnippet>
