import { Middleware } from "@decorators/express";
import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import { env } from "../../utils/env";

export class AuthMiddleware implements Middleware {
  async use(req: Request, res: Response, next: NextFunction): Promise<any> {
    const authorization = req.header("Authorization");

    if (!authorization) {
      return res
        .status(401)
        .json({ msg: "Você não está autorizado a fazer isso" });
    }

    try {
      const token = authorization.replace("Bearer ", "");
      jwt.verify(token, env("JWT_SECRET"));

      const user = jwt.decode(token);

      res.locals.user = user;
    } catch (error) {
      return res
        .status(401)
        .json({ msg: "Você não está autorizado a fazer isso" });
    }

    next();
  }
}
