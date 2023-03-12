import mongoose from "mongoose";
import environmentVarables from "./environments";

const dbConfig = async () => {
  try {
    const connect = await mongoose.connect(environmentVarables.MONGODB_URI);
    console.log(`Base Connected to ${connect.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

export default dbConfig;
