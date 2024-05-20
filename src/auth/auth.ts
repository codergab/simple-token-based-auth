import { NextFunction, Request, Response } from "express";
import { errorResponse } from "../utils/responseHandler";
import { verify } from "jsonwebtoken";
import { config } from "../config/env";
import { ErrorResponseObject } from "../common/http";

const { JWT_SECRET } = config;

export const authenticatedUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(401).json(new ErrorResponseObject("Request not authenticated"));
  }

  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json(new ErrorResponseObject("Request not authenticated"));
  }

  verify(token, JWT_SECRET as string, (err: any, decoded: any) => {
    if (err) return res.status(401).json(new ErrorResponseObject("invalid token"));
    req.user = decoded;
    return next();
  });
};
