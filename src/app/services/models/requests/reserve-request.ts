import { Product } from "../../../app.models";

export class ReserveRequest {

    constructor(public requestPayload: ReserveRequestPayload
    ) {
    }

}

export class ReserveRequestPayload {

    constructor(public products: ProductSearch[]

    ) {
    }

}

export class ProductSearch {

    constructor(public id: number,
        public name: string,
        public quantity: string,
        public availibilityCount: boolean

    ) {
    }

}
