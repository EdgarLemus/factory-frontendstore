import { Cart } from "src/app/models/cart.model";

export class CartResponse {

    constructor(public idSession: String,
                public cart: Cart) {
    }
  
  }
  