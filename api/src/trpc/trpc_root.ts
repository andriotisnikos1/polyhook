import { t } from "../central.config.js";
import auth from "./auth/auth.js";
import polyhooks from "./polyhooks/polyhooks.js";
import projects from "./projects/projects.js";

export default t.router({
    polyhooks: polyhooks,
    auth: auth,
    projects: projects
})
