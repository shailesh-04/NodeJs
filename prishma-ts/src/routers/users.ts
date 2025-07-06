import { catchErr } from "04-utils";
import { Router } from "express";
import UsersControllers from "../controllers/users";
const users = Router();
const userController = new UsersControllers();
try {
    users.get('/', userController.getUsers);
} catch (error) {
    catchErr(error, "routers.users.ts");
}
export default users;