import {
  Body,
  Controller,
  Delete,
  Get,
  Params,
  Post,
  Query,
  Response,
} from "@decorators/express";
import { Response as ResponseType } from "express";
import { AuthMiddleware } from "../auth/auth.middleware";
import { CategoryService } from "./category.service";
import { Category } from "./category";

@Controller("/categories", [AuthMiddleware])
export class CategoryController {
  @Get("/")
  async list(@Response() res: ResponseType, @Query() query: any) {
    try {
      const { user } = res.locals;
      const page = Number(query.page ?? 1);
      const limit = Number(query.limit ?? 15);

      const list = await CategoryService.list(user.id, page, limit);

      return res.status(200).json(list);
    } catch (error) {
      return res.status(500).json({ msg: "Ocorreu um erro interno." });
    }
  }

  @Get("/:id")
  async find(@Response() res: ResponseType, @Params("id") id: number) {
    try {
      const { user } = res.locals;

      const category = await CategoryService.find(user.id, id);

      if (!category) {
        return res
          .status(404)
          .json({ msg: "Esta categoria não foi encontrada." });
      }

      return res.status(200).json(category);
    } catch (error) {
      return res.status(500).json({ msg: "Ocorreu um erro interno." });
    }
  }

  @Post("/")
  async store(@Response() res: ResponseType, @Body() body: Category) {
    try {
      const { user } = res.locals;

      body.user_id = user.id;

      await CategoryService.store(body);

      return res.status(200).json({ msg: "Categoria salva com sucesso." });
    } catch (error) {
      return res.status(500).json({ msg: "Ocorreu um erro interno." });
    }
  }

  @Delete("/:id")
  async delete(@Response() res: ResponseType, @Params("id") id: number) {
    try {
      const { user } = res.locals;

      const category = await CategoryService.find(user.id, id);

      if (!category) {
        return res
          .status(404)
          .json({ msg: "Esta categoria não foi encontrada." });
      }

      await CategoryService.delete(user.id, id);

      return res.status(200).json({ msg: "Categoria deletada com sucesso." });
    } catch (error) {
      return res.status(500).json({ msg: "Ocorreu um erro interno." });
    }
  }
}
