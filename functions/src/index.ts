import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import * as dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

import admin from "firebase-admin";
admin.initializeApp();

export { default as init } from "./api/init.js";
export { default as createUserPost } from "./api/post-handler.js";
export { default as createTeam } from "./api/team-create-handler.js";
export { default as createTeamPostComment } from "./api/team-post-comment-handler.js";
export { default as createTeamPost } from "./api/team-post-handler.js";
