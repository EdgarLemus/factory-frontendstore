
export class UserResponse {

  constructor(public code: string,
    public message: string,
    public exception: string,
    public response: ApprovalResponse,
  ) {
  }

}

export class ApprovalResponse {

  constructor(public approvalCode: string
  ) {
  }

}
