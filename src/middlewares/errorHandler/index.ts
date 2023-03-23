import { Request, Response, NextFunction } from "express";
import { AppError, Httpcode } from "../../utils/appError";

const devError = (err: AppError, res: Response) => {
  return res.status(Httpcode.INTERNAL_SERVER_ERROR).json({
    error: err,
    status: err.httpCode,
    mesage: err.message,
    stack: err.stack,
  });
};

const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  devError(err, res);
};

export default errorHandler;
