import { UserDTO } from "../dto/UserDTO";

export class UserRequest {
  userDto : UserDTO;
  constructor(public idSesion: string,
    public email: string,
    password: string
  ) {
  }
  

}

