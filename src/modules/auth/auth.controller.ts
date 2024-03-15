import { Body, Controller, Post, Response } from "@decorators/express";
import { Response as ResponseType } from "express";
import { AuthService } from "./auth.service";

@Controller("/auth")
export class AuthController {
  @Post("/login")
  async login(@Response() res: ResponseType, @Body() body: any) {
    try {
      const { email, password } = body;

      if (password.length < 8) {
        return res
          .status(411)
          .json({ msg: "A senha precisa ter mais de 8 caracteres." });
      }

      if (!/\d/.test(password)) {
        return res
          .status(412)
          .json({ msg: "A senha precisa ter pelo menos 1 número." });
      }

      const token = await AuthService.login(email, password);

      if (!token) {
        return res.status(401).json({ msg: "Usuário ou senha inválidos." });
      }

      return res.status(200).json(token);
    } catch (error) {
      return res.status(500).json({ msg: "Ocorreu um erro interno." });
    }
  }

  @Post("/register")
  async register(@Response() res: ResponseType, @Body() body: any) {
    try {
      const { name, email, password } = body;

      if (password.length < 8) {
        return res
          .status(411)
          .json({ msg: "A senha precisa ter mais de 8 caracteres." });
      }

      if (!/\d/.test(password)) {
        return res
          .status(412)
          .json({ msg: "A senha precisa ter pelo menos 1 número." });
      }
      const exists = await AuthService.alreadyExists(email);

      if (exists) {
        return res
          .status(409)
          .json({ msg: "Já existe um usuário com este email" });
      }

      const token = await AuthService.register(name, email, password);

      return res.status(200).json(token);
    } catch (error) {
      return res.status(500).json({ msg: "Ocorreu um erro interno." });
    }
  }
}
