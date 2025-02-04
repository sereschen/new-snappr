import { ErrorRequestHandler } from "express";
import { HTTPError } from "../utils/errors";

export const errorHandlerMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof HTTPError) {
    res.status(err.code).json({
      code: err.code,
      error: err.message,
      name: err.name,
      date: err.date,
      cause: err.cause,
    });
  } else {
    console.error(err);
    res.status(500).json({
      code: 500,
      error: err.message,
      name: 'unknown',
      date: new Date(),
      cause: null,
    });
  }
  next();
};

export default errorHandlerMiddleware;