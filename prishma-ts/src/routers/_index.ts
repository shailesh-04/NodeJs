import { catchErr } from "04-utils";
import { Router } from "express";
import users from "./users";
const index = Router();

try {
    index.use("/json/users/",users);
} catch (error) {
    catchErr(error, "routers/_index.ts");
}
export default index;