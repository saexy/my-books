import { Controller, Get, Response } from "@decorators/express";
import { Response as ResponseType } from "express";

@Controller("/users")
export class UserController {
  @Get("/")
  getAll(@Response() res: ResponseType) {
    return res.status(200).json([{ id: 1 }]);
  }
}
