export class EmailRequest {

  constructor(public requestHeader: EmailRequestHeader,
    public requestPayload: EmailRequestPayload) {
  }

}

export class EmailRequestHeader {

  constructor(public session: number,
    public channel: boolean) {

  }
}

export class EmailRequestPayload {

  constructor(public cellphone: String,
    public mailOptions: Email) {

  }
}

export class Email {

  constructor(public from: String,
    public to: String,
    public subject: String,
    public text: String
  ) {

  }
}

