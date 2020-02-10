
export class ReserveResponse {

    constructor(public products: ProductFind[]
    ) {
    }

}

export class ProductFind {

    constructor(public id: number,
        public availibilityCount:boolean

    ) {
    }

}
