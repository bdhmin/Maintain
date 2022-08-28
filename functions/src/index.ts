import * as functions from "firebase-functions";

exports.test = functions.https.onRequest((request, response) => {
  functions.logger.info("Function works!");
  response.send("Function succeeded!");
});

// exports.