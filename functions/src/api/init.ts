import { DataModel } from "@glazed/datamodel";
import { DIDDataStore } from "@glazed/did-datastore";
import * as functions from "firebase-functions";
import { aliases } from "../utils/constants.js";
import { generateCeramic } from "../utils/helper.js";

export default functions
  .runWith({
    timeoutSeconds: 300,
  })
  .https.onRequest(async (_, response) => {
    const ceramic = await generateCeramic(process.env.ENV_DID!);

    const model = new DataModel({ ceramic, aliases });

    const dataStore = new DIDDataStore({ ceramic, model });

    try {
      // Create Protocol State
      const protocolStateDid = await dataStore.set("envfyProtocolState", {
        envfyTeams: 0,
        eventsCompleted: 0,
        pooledFunds: 0,
        lifetimePooledFunds: 0,
      });
      console.log("protocolStateDid: ", protocolStateDid);

      // Create Envfy Timeline
      const timelinesDid = await dataStore.set("envfyTimelines", { data: [] });
      console.log("timelinesDid: ", timelinesDid);

      // Create Envfy Teams
      const teamsDid = await dataStore.set("envfyTeams", { data: [] });
      console.log("teamsDid: ", teamsDid);
      response.end();
    } catch (error) {
      console.log("couldn't save that something went wrong");
      console.log(error);
    }
  });
