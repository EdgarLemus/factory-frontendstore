
    export class Delivery{  
      constructor(
        public delivery: IDelivery
      ){}
      }


      export interface IDelivery{
        desc:number,
        name:String,
        value: String
    }