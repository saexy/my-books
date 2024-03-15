import { Model } from "../../utils/model";

export class CategoryModel extends Model {
  static override tableName(): string {
    return "categories";
  }
}
