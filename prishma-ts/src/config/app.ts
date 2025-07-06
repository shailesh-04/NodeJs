import { color } from "04-utils";
import express, { Application } from "express";
import index from "../routers/_index";
const env = {
    PORT: 3000
}
class App {
    public app: Application;
    constructor() {
        this.app = express();
        this.routers();
    }
    private async appConfig() {

    }
    private async middleware() {
    }
    private async routers() {
        this.app.use("/", index);
    }
    public start = () => {
        this.app.listen(env.PORT, () => {
            color([`SERVER IS START : http://localhost:${env.PORT}`, "green", ["underline"]]);
        });
    }
}
const app = new App();

export const start = app.start;
export default app.app;
