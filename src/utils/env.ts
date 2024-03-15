import dotenv from "dotenv";

export const env = (key: string, defaultValue: any = "") => {
  dotenv.config();
  return process.env[key] ?? defaultValue;
};
