import express from "express";
import cors from "cors";
import { attachControllers } from "@decorators/express";
import { UserController } from "./modules/user/user.controller";
import { AuthController } from "./modules/auth/auth.controller";

export const app = express();
const router = express.Router();

attachControllers(router, [UserController, AuthController]);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(router);
