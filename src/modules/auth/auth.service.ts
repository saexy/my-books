import { database } from "../../database";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { env } from "../../utils/env";

export class AuthService {
  static async register(
    name: string,
    email: string,
    password: string
  ): Promise<any> {
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);
    const [user] = await database("users")
      .insert({ name, email, password: passwordHash })
      .returning("*");

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      env("JWT_SECRET"),
      { expiresIn: "1d" }
    );

    return { token };
  }

  static async alreadyExists(email: string): Promise<boolean> {
    const checkIfExists = await database("users").where({ email }).select();

    return checkIfExists.length > 0;
  }

  static async login(email: string, password: string): Promise<any> {
    const [user] = await database("users").where({ email }).select();

    if (!user) {
      return null;
    }

    const check = await bcrypt.compare(password, user.password);

    if (!check) {
      return null;
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      env("JWT_SECRET"),
      { expiresIn: "1d" }
    );

    return { token };
  }
}
