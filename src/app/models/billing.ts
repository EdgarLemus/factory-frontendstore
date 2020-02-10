export class Billing{
  constructor(
    public firstName: String,
    public lastName:  String,
    public middleName: String, 
    public company: String,
    public email: String,
    public phone: String,
    public country: ICountry, 
    public city: String,
    public state: String,
    public zip:  String,
    public address: String
  ){}
  }

  export interface ICountry{
    name:String,
    code: String
}