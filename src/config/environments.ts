import dotenv from "dotenv";
dotenv.config();

const environmentVarables = {
  PORT: process.env.PORT as string,
  MONGODB_URI: process.env.MONGODB_URI as string,
};

export default environmentVarables;
