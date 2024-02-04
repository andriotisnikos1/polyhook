import { t } from "../../central.config.js";
import create from "./create.js";
import edit from "./edit.js";
import fetch from "./fetch.js";
import list from "./list.js";

export default t.router({
    create: create,
    list: list,
    fetch: fetch,
    edit: edit
})
