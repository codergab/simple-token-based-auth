import mongoose from "mongoose";
import { config } from "../config/env";

const connectDb = async () => {
  try {
    await mongoose.connect(
      config.DATABASE_URI || "mongodb://127.0.0.1:27017/test"
    );
    console.info('database connected')
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default connectDb;
