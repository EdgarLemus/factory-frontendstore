import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { HttpClient } from "@angular/common/http";
import { CategoryResponse } from "./models/responses/category-response";
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { environment } from '../../environments/environment';
import { Category, Product } from '.././app.models';

@Injectable()
export class CategoryService {

  public url = "assets/data/";
  private categoryResponse: CategoryResponse;
  public categories:Category[];

  constructor(private _httpClient: HttpClient) {
    this.getCategoriesMock().subscribe(data => {
      this.categories = data;
    })
   }

  public getCategoriesMock(): Observable<Category[]> {

    let headers = new Headers({
      'Content-Type': 'application/json',
      'X-RqUID': 'application/json', 'X-IPAddr': 'application/json'
      , 'X-Session': 'application/json'
    });

    let options = new RequestOptions({ headers: headers });
    
    return this._httpClient
      .get(this.url + 'categories-response.json')
      .pipe(
        map(((response: any) => {
          this.categoryResponse = response;
          if (this.categoryResponse.categories.length > 0) {
            this.categories = this.categoryResponse.categories;
          }

 
          return this.categories;
        }),
          catchError((e: Response) => throwError(e)))
      );

  }

}
