import admin from "firebase-admin";
import * as functions from "firebase-functions";
import { generateDataStore, generateDidKey } from "../utils/helper.js";

//FIXME: Handle if there is no correct team did.
export default functions
  .runWith({
    timeoutSeconds: 300,
  })
  .https.onRequest(async (request, response) => {
    try {
      const teamPost = request.body as ICreateTeamPostReq;
      const { type, teamDid, posterDid, postTitle, body } = teamPost;
      const date = Date.now();

      // Generate random did for teamPost and init ceramic.
      const postKey = generateDidKey();
      const postDataStore = await generateDataStore(postKey);
      const postDid = postDataStore.id;

      // Save teamPost key to Firestore.
      const db = admin.firestore();
      const teamPostRef = db.collection("teamPostDid").doc(postDid);
      await teamPostRef.set({
        key: postKey,
        teamDid: teamDid,
      });

      // Save to teamPost Ceramic Store.
      const newTeamPost: IEnvfyTeamPost = {
        postDid: postDid,
        ...teamPost,
        createdAt: date,
      };

      const a = await postDataStore.set("envfyTeamPost", { ...newTeamPost });
      console.log(a);

      // Get the team did gen key from Firestore.
      const teamRef = db.collection("teamDid").doc(teamDid);
      const teamDidDoc = await teamRef.get();
      const teamKey = teamDidDoc.data()?.key;

      // Save teamPost data to the team Ceramic Store.
      const teamsDataStore = await generateDataStore(teamKey);
      const doc = (await teamsDataStore.get("envfyTeam")) as IEnvfyTeam;
      const data = { ...doc };
      const post = {
        type,
        posterDid,
        postDid,
        postTitle,
        postSummary: body,
        createdAt: date,
      };
      if (data.posts && data.posts?.length > 0) {
        data.posts?.push(post);
      } else {
        data.posts = [];
        data.posts.push(post);
      }
      const b = await teamsDataStore.set("envfyTeam", { ...data });
      console.log(b);

      response.send(JSON.stringify({ errors: false }));
    } catch (error) {
      functions.logger.error(error);
      response.send(JSON.stringify({ errors: true }));
    }
  });
