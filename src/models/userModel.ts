import { Schema, model } from "mongoose";
import isEmail from "validator/lib/isEmail";
import { iUserDocument } from "../interface/user.interface";
import bcrtpt from "bcrypt";

const userSchema: Schema<iUserDocument> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Your Name"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email "],
      validate: [isEmail, "Please Enter A Valid Email"],
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Your Password Is Needed"],
    },
    confirmPassword: {
      type: String,
      required: [true, "Please Confirm Your Password"],
    },
    role: {
      type: String,
      enum: ["user", "admin", "manager"],
      message: "You must either be a user, admin or a manager",
      default: "user",
    },
  },
  { timestamps: true }
);

//Middleware for hashing password
userSchema.pre("save", async function (next) {
  let user = this;
  if (!user.isModified("password")) next();
  const salt = await bcrtpt.genSalt(12);
  user.password = await bcrtpt.hash(user.password, salt);
  user.confirmPassword = user.password;
  next();
});

//Method to Compare Password
userSchema.methods.comparePassword = async function (userPassword: string) {
  const isMatch = await bcrtpt.compare(userPassword, this.password);
  return isMatch;
};

const userModel = model<iUserDocument>("users", userSchema);
export default userModel;
