import { Document } from "mongoose";

export interface iUser extends Document {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

export interface iUserDocument extends Document, iUser {
  comparePassword(password: string): Promise<boolean>;
}
