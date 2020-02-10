import { SafeResourceUrl } from '@angular/platform-browser';

export class Category {
  constructor(public id: number, 
              public name:string, 
              public hasSubCategory: boolean,
              public parentId: number){ }
}

export class Product {
  constructor(public _id: string,
              public id: number,
              public name: string,
              public images: Array<any>,
              public oldPrice: number,
              public newPrice: number,
              public discount: number,
              public ratingsCount: number,
              public ratingsValue: number,
              public description: string,
              public detailDescription: string,
              public additionalInformation: string,
              public availibilityCount: number,
              public cartCount: number,
              public color: Array<string>,
              public size: Array<string>,
              public weight: number,
              public categoryId: number,
              public comments: CommentUser[]){ }
}

export class CommentUser{
  constructor(public comment:string,
            public user: string,
            public creationDate: string,
            public rating:any){}
}

export class Images64Bits {
  constructor(public big: string,
              public medium: string,
              public small: string
              ){}
}

export class Images {
  constructor(public big: SafeResourceUrl,
              public medium: SafeResourceUrl,
              public small: SafeResourceUrl
              ){}
}