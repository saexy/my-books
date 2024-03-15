import { Model } from "../../utils/model";

export class User extends Model {
  override tableName() {
    return "users";
  }
}
