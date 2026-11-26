import { Router } from "express";
import StudentController from "./student.Controller.js";

class StudentRoutes {
  readonly router = Router();
  private readonly controller = new StudentController();

  constructor() {
    this.router
      .route("/")
      .get(this.controller.all)
      .post(this.controller.add);

    this.router
      .route("/:id")
      .get(this.controller.one)
      .post(this.controller.update) // HTML forms only support GET/POST
      .put(this.controller.update)
      .delete(this.controller.remove);
  }
}

export default StudentRoutes;
