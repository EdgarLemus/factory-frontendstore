export class ValidateKeyRequest {

    constructor(
        public requestHeader: RequestValidateHeader,
        public requestPayload: RequestValidatePayload
    ) {
    }

}

export class RequestValidateHeader {

    constructor(public token: string
    ) {
    }

}
export class RequestValidatePayload {

    constructor(public Id: string
    ) {
    }

}
