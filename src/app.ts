import express, { Application, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler";
import { AppError, Httcode } from "./utils/appError";
import api from "./api";

const appConfig = (app: Application) => {
  //Middlewares
  app
    .use(express.json())
    .use(morgan("dev"))
    .use(cors())
    //api endpoint
    .use("/api", api)
    //catch unexisting routes
    .all("*", (req: Request, res: Response, next: NextFunction) => {
      next(
        new AppError({
          message: `This Route ${req.originalUrl} dose not exist`,
          httpCode: Httcode.NOT_FOUND,
        })
      );
    })
    //error handler
    .use(errorHandler);
};

export default appConfig;
