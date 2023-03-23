import { Request, Response, NextFunction } from "express";
import { iUser } from "../interface/user.interface";
import userModel from "../models/userModel";
import { AppError, Httpcode } from "../utils/appError";
import { asyncHandler } from "../utils/asyncHandler";

export const register = asyncHandler(
  async (req: Request<{}, {}, iUser>, res: Response, next: NextFunction) => {
    const { email, name, password, confirmPassword } = req.body;

    const user = await userModel.create({
      email,
      name,
      password,
      confirmPassword,
    });
    if (!user) {
      next(
        new AppError({
          message: "Account Not Created",
          httpCode: Httpcode.BAD_REQUEST,
        })
      );
    }
    return res.status(Httpcode.CREATED).json({
      message: "Success",
      data: user,
    });
  }
);

export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user)
      next(
        new AppError({
          message: "Account Does not exist",
          httpCode: Httpcode.NOT_FOUND,
        })
      );
    await user?.comparePassword(password);
    return res.status(200).json({
      message: "Success",
      data: user,
    });
  }
);
