import { Product } from "../../../app.models";

export class CatalogResponse {

  constructor(public result: boolean,
    public products: Product[],
  ) {
  }

}
