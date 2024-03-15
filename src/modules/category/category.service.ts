import { Category } from "./category";
import { CategoryModel } from "./category.model";

export class CategoryService {
  static async list(userId: number, page: number, limit: number): Promise<any> {
    const offset = (page - 1) * limit;
    const list: Category[] = await CategoryModel.query()
      .where({ user_id: userId })
      .limit(limit + 1)
      .offset(offset)
      .select();

    const items = list.filter((item, i) => i < limit);
    const next = list.length >= limit + 1;

    return { currentPage: page, items, next };
  }

  static async find(userId: number, id: number): Promise<Category> {
    const [category] = await CategoryModel.query()
      .where({ user_id: userId, id })
      .limit(1)
      .select();

    return category;
  }

  static async store(category: Category): Promise<any> {
    await CategoryModel.query()
      .insert(category)
      .onConflict("id")
      .merge(["name", "description"]);
  }

  static async delete(userId: number, id: number): Promise<void> {
    await CategoryModel.query().where({ user_id: userId, id }).delete();
  }
}
