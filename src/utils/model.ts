import { database } from "../database";

export class Model {
  static tableName() {
    return "model";
  }

  static query() {
    return database(this.tableName());
  }
}
