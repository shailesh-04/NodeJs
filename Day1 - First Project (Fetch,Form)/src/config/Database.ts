import mongoose from "mongoose";
import { env } from "./App.js";

export async function connect(): Promise<void> {
  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log("Databage Connect");
  } catch (error) {
    
    console.log("Databage Connection Error");
    console.log(error);
    console.log("-------------- Close Server ------------------");
    process.exit(1);
  }
}
