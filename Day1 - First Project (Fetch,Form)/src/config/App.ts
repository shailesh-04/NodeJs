import express, {
  type Application,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import StudentRoutes from "../modules/student/student.Routes.js";
import Env from "./Env.js";
import { resolve } from "node:path";
import { connect } from "./Database.js";
import { respond } from "../utils/respond.js";
export const env = new Env();
class App {
  app: Application;
  constructor() {
    this.app = express();
    env.init();
    connect();
    this.middleware();
    this.routes();

  }
  private middleware():void{
    this.app.use(express.json({limit:"12mb"}));
    this.app.use(express.static(resolve(process.cwd(),"public")));
    this.app.use(express.urlencoded({extended:true,limit:"12mb"}));
  }
  private routes(): void {
    this.app.use("/api/students", new StudentRoutes().router);

    // Unknown routes
    this.app.use((_req: Request, res: Response) => {
      res.status(404).json({ success: false, message: "Route not found" });
    });

    // Central error handler (Express 5 forwards async errors here)
    this.app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
      if (err?.code === 11000) {
        respond(req, res, 409, { success: false, message: "Email already exists" });
        return;
      }
      if (err?.name === "ValidationError") {
        respond(req, res, 400, { success: false, message: err.message });
        return;
      }
      console.error(err);
      respond(req, res, 500, { success: false, message: "Internal server error" });
    });
  }
  listen(){
    this.app.listen(env.port,()=>{
        console.log("Server Start At : http://localhost:3000");
    });
  }
}

export default App;
