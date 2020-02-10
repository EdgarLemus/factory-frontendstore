export class CatalogRequest {

  constructor(public requestHeader: RequestHeaderCatalog,
    public requestPayload: RequestPayloadCatalog
  ) {
  }

}

export class RequestHeaderCatalog {

  constructor(public session: string,
    public channel: string
  ) {
  }

}
export class RequestPayloadCatalog {

  constructor(public All: boolean,
    public CountProduct: number,
    public Availability: boolean,
    public NameCategory: String,
    public InitialRangePrice: number,
    public FinalRangePrice: number
  ) {
  }

}
