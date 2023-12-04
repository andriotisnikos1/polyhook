import { t } from "../../central.config.js";
import create from "./create.js";
import dev_invoke from "./dev_invoke.js";

export default t.router({
    create: create,
    dev_invoke: dev_invoke
})
