import { Controller, Get, Response } from "@decorators/express";
import { Response as ResponseType } from "express";
import { AuthMiddleware } from "../auth/auth.middleware";

@Controller("/user", [AuthMiddleware])
export class UserController {
  @Get("/")
  get(@Response() res: ResponseType) {
    return res.status(200).json(res.locals.user);
  }
}
