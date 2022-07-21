import { DataModel } from "@glazed/datamodel";
import { DIDDataStore } from "@glazed/did-datastore";
import admin from "firebase-admin";
import * as functions from "firebase-functions";
import { aliases } from "../utils/constants.js";
import { generateCeramic } from "../utils/helper.js";

export default functions
  .runWith({
    timeoutSeconds: 300,
  })
  .https.onRequest(async (request, response) => {
    try {
      const userPost = request.body as IUserPost;

      // Save userPost to temp store for timeline handler
      const db = admin.firestore();
      const { FieldValue } = admin.firestore;

      const timelineRef = db.collection("timeline").doc("temp");

      await timelineRef.set(
        {
          data: FieldValue.arrayUnion(userPost),
        },
        { merge: true }
      );

      // Gets pooled funds from Protocol State.
      const ceramic = await generateCeramic(process.env.ENV_DID!);
      const model = new DataModel({ ceramic, aliases });
      const dataStore = new DIDDataStore({ ceramic, model });

      const doc = (await dataStore.get(
        "envfyProtocolState"
      )) as IEnvfyProtocolState;

      // Update pooled funds from Protocol State.
      const newState = {
        ...doc,
      };
      newState.pooledFunds = doc.pooledFunds + userPost.donation;
      await dataStore.set("envfyProtocolState", newState);

      response.send(JSON.stringify({ errors: false }));
    } catch (error) {
      functions.logger.error(error);
      response.send(JSON.stringify({ errors: true }));
    }
  });
