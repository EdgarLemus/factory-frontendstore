import { Product } from "../../../app.models";

export class ProductResponse {

  constructor(public result: boolean,
    public product: Product,
  ) {
  }

}
