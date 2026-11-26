import type { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { randomBytes, scrypt as scryptCb, type BinaryLike } from "node:crypto";
import { promisify } from "node:util";
import Student from "../../model/Student.js";
import { respond } from "../../utils/respond.js";

const scrypt = promisify(scryptCb) as (
  password: BinaryLike,
  salt: BinaryLike,
  keylen: number,
) => Promise<Buffer>;

async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const hash = await scrypt(password, salt, 64);
  return `${salt}:${hash.toString("hex")}`;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Express 5 forwards rejected promises to the error handler automatically,
// so no try/catch is needed in these handlers.
class StudentController {
  // POST /api/students
  add = async (req: Request, res: Response): Promise<void> => {

    

    const { name, email, password } = req.body ?? {};

    if (!name || !email || !password) {
      respond(req, res, 400, { success: false, message: "name, email and password are required" });
      return;
    }
    if (!EMAIL_RE.test(String(email))) {
      respond(req, res, 400, { success: false, message: "Invalid email" });
      return;
    }
    if (String(password).length < 6) {
      respond(req, res, 400, { success: false, message: "Password must be at least 6 characters" });
      return;
    }

    const student = await Student.create({
      name: String(name),
      email: String(email),
      password: await hashPassword(String(password)),
    });

    const { password: _omit, ...data } = student.toObject();
    respond(req, res, 201, { success: true, message: "Student created successfully", data });
  };

  // GET /api/students
  all = async (_req: Request, res: Response): Promise<void> => {
    const students = await Student.find().select("-password").sort({ createdAt: -1 });
    res.status(200).json({ success: true, message: "Students fetched successfully", data: students });
  };

  // GET /api/students/:id
  one = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      res.status(400).json({ success: false, message: "Invalid student id" });
      return;
    }

    const student = await Student.findById(id).select("-password");
    if (!student) {
      res.status(404).json({ success: false, message: "Student not found" });
      return;
    }
    res.status(200).json({ success: true, message: "Student fetched successfully", data: student });
  };

  // PUT /api/students/:id  (also POST /api/students/:id from the HTML edit form)
  update = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      respond(req, res, 400, { success: false, message: "Invalid student id" });
      return;
    }

    const { name, email, password } = req.body ?? {};
    const changes: { name?: string; email?: string; password?: string } = {};

    if (name !== undefined) changes.name = String(name);
    if (email !== undefined) {
      if (!EMAIL_RE.test(String(email))) {
        respond(req, res, 400, { success: false, message: "Invalid email" });
        return;
      }
      changes.email = String(email);
    }
    // Blank password from the edit form means "keep the current one".
    if (password !== undefined && password !== "") {
      if (String(password).length < 6) {
        respond(req, res, 400, { success: false, message: "Password must be at least 6 characters" });
        return;
      }
      changes.password = await hashPassword(String(password));
    }

    if (Object.keys(changes).length === 0) {
      respond(req, res, 400, { success: false, message: "Nothing to update" });
      return;
    }

    const student = await Student.findByIdAndUpdate(id, changes, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!student) {
      respond(req, res, 404, { success: false, message: "Student not found" });
      return;
    }
    respond(req, res, 200, { success: true, message: "Student updated successfully", data: student });
  };

  // DELETE /api/students/:id
  remove = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      res.status(400).json({ success: false, message: "Invalid student id" });
      return;
    }

    const student = await Student.findByIdAndDelete(id);
    if (!student) {
      res.status(404).json({ success: false, message: "Student not found" });
      return;
    }
    res.status(200).json({ success: true, message: "Student deleted successfully" });
  };
}

export default StudentController;
