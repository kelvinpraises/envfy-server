import admin from "firebase-admin";
import * as functions from "firebase-functions";
import { generateDataStore } from "../utils/helper.js";

export default functions
  .runWith({
    timeoutSeconds: 300,
  })
  .https.onRequest(async (request, response) => {
    try {
      const { commenterDid, postDid, comment } =
        request.body as ICreatePostCommentReq;
      const date = Date.now();

      // Get teamPost key from Firestore.
      const db = admin.firestore();
      const teamPostRef = db.collection("teamPostDid").doc(postDid);
      const postDoc = await teamPostRef.get();
      const postKey = postDoc.data()?.key;

      const postDataStore = await generateDataStore(postKey);
      const doc = (await postDataStore.get("teamPost")) as IEnvfyTeamPost;
      const { comments, allowComments } = doc;

      if (!allowComments) {
        throw new Error("comment not allowed");
      }

      const data = {
        commenterDid,
        comment,
        createdAt: date,
      };

      if (comments && comments?.length > 0) {
        const commentData = [...comments];
        commentData.push(data);
        const teamPostData = { comments: [...commentData] };
        await postDataStore.merge("teamPost", { ...teamPostData });
      } else {
        const teamPostData = { comments: [data] };
        await postDataStore.merge("teamPost", { ...teamPostData });
      }

      response.send(JSON.stringify({ errors: false }));
    } catch (error) {
      functions.logger.error(error);
      response.send(JSON.stringify({ errors: true }));
    }
  });
