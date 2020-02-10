import { Category } from "../../../app.models";

export class CategoryResponse {

  constructor(public statusCode: string,
    public statusMessage: string,
    public categories: Category[],
  ) {
  }

}
