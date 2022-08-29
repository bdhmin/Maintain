import * as functions from "firebase-functions";

exports.test = functions.https.onRequest((request, response) => {
  functions.logger.info("Function works!");
  response.send("Function succeeded!");
});

// exports.

// Delete tasks after 30 days of being deleted

// When change order is implemented, create cloud function that resets all orders to be better spread out