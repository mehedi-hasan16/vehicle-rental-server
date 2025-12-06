import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    console.log({ authToken: token });

    if (!token) {
      return res
        .status(500)
        .json({ message: "you are not allowed to get the data" });
    }
    const decode = jwt.verify(token, config.jwt_secret!) as JwtPayload;
    req.user = decode;

    if (roles.length && !roles.includes(decode.role)) {
      return res.status(500).json({ error: "unauthorized" });
    }
    next();
  };
};

export default auth;
