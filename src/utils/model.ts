import { database } from "../database";

export abstract class Model {
  tableName() {
    return "model";
  }

  query() {
    return database(this.tableName());
  }
}
