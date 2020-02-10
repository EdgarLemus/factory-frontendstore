import { Cart } from "src/app/models/cart.model";

export class CartRequest {

    constructor(public idSession: String,
                public cart: Cart) {
    }
  
  }
  