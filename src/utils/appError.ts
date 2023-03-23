export enum Httpcode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTORIZED = 401,
  FOBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLIT = 409,
  UNPROCESSIBLE_IDENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
}

interface ErrorArgs {
  name?: string;
  isOperational?: boolean;
  message: string;
  httpCode: Httpcode;
}

export class AppError extends Error {
  public readonly name: string;
  public readonly isOperational: boolean = true;
  public readonly httpCode: Httpcode;
  constructor(args: ErrorArgs) {
    super(args.message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.httpCode = args.httpCode;
    this.name = args.name || "Error";

    if (args.isOperational !== undefined) {
      this.isOperational = args.isOperational;
    }

    Error.captureStackTrace(this);
  }
}
