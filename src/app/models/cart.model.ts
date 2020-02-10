import { Product } from "../app.models";

export class Cart {
    constructor(public compareList: Product[],
                public wishList: Product[],
                public products: Product[],
                public totalPrice: number,
                public totalCartCount: number) { }
}