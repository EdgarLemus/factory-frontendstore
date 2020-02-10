export class ProductRequest {

  constructor(public requestHeader: RequestHeaderProduct,
    public requestPayload: RequestPayloadProduct
  ) {
  }

}

export class RequestHeaderProduct {

  constructor(public session: string,
    public channel: string
  ) {
  }

}
export class RequestPayloadProduct {

  constructor(public id: string,
  ) {
  }

}
