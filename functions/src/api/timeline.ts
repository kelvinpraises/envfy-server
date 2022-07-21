import * as functions from "firebase-functions";

export default functions.pubsub
  .schedule("every 5 minutes")
  .onRun(async (context) => {
    // Get data from temp db and clear.
    // Push into the Timeline.
    // Save Timeline did to Timelines.
  });
