import { Request, Response } from "express";
import UserModel from "../models/users";
import { catchErr } from "04-utils";

class UsersControllers {
    private user: UserModel;
    constructor() {
        this.user = new UserModel();
    }
    public getUsers = async (req: Request, res: Response): Promise<any> => {
        try 
        {
            const payload = await this.user.getUsers();
            return res.status(200).json({ success: true, payload });
        } catch (error: any) {
            catchErr(error, "UserController > getUser()");
            return res.status(500).json({
                message: "Faild To Fetch Users! ",
                detail: error.message,
            });
        }
    }
}

export default UsersControllers;