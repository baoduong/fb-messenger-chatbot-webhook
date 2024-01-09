const express = require("express");
const app = express();
const functions = require("firebase-functions");
app.get("/health-check", (req, res) => {
  res.send("webhook is ready");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

exports.webhook = functions.https.onRequest(app);
