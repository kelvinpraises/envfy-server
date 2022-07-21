import { DataModel } from "@glazed/datamodel";
import { DIDDataStore } from "@glazed/did-datastore";
import admin from "firebase-admin";
import * as functions from "firebase-functions";
import { aliases } from "../utils/constants.js";
import { generateCeramic, generateDidKey } from "../utils/helper.js";

export default functions
  .runWith({
    timeoutSeconds: 300,
  })
  .https.onRequest(async (request, response) => {
    try {
      // FIXME: Team names must be validated as unique.
      const team = request.body as ICreateTeamReq;

      // Admin ceramic
      const adminCeramic = await generateCeramic(process.env.ENV_DID!);
      const adminModel = new DataModel({ ceramic: adminCeramic, aliases });
      const adminDataStore = new DIDDataStore({
        ceramic: adminCeramic,
        model: adminModel,
      });

      // Generate random did for team and init ceramic.
      const key = generateDidKey();
      const ceramic = await generateCeramic(key);
      const did = ceramic.did?.id!;
      const model = new DataModel({ ceramic, aliases });
      const dataStore = new DIDDataStore({ ceramic, model });

      // Save team id to Firebase.
      const db = admin.firestore();
      const teamRef = db.collection("teamDid").doc(did);
      await teamRef.set({
        name: team.teamName,
        key: key,
      });

      // Save team data to Team Ceramic Store.
      const date = Date.now();

      const newTeam: IEnvfyTeam = {
        teamDid: did,
        ...team,
        createdAt: date,
      };
      await dataStore.set("envfyTeam", { ...newTeam });

      // Save team id to Teams Ceramic Store.
      const doc = (await adminDataStore.get("envfyTeams")) as IEnvfyTeams;

      const teams = [...doc.data];

      teams.push({
        teamDid: did,
        teamName: team.teamName,
        membersCount: team.membersCount,
        createdAt: date,
      });

      const data: IEnvfyTeams = { data: [...teams] };

      await adminDataStore.set("envfyTeams", { ...data });

      response.send(JSON.stringify({ errors: false }));
    } catch (error) {
      functions.logger.error(error);
      response.send(JSON.stringify({ errors: true }));
    }
  });
