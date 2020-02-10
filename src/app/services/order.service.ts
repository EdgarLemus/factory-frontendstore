import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from "@angular/http";
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { environment } from '../../environments/environment';
import { Order } from '../models/order';
import { SecurityService } from './security.service';
import { EncripterService } from './encripter.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OrderService {

  constructor(private _http: HttpClient,
    private encripterService: EncripterService,
    private securityService: SecurityService) { }

  public createOrder(order: any): Observable<Order> {

    let headers = this.securityService.getHeaderTokenBySession();

    return this._http
      .post(environment.URLOrder + environment.endPointGetOrder, '{ "order":"' + order + '"}', { headers: headers })
      .pipe(
        map(((response: any) => {
          console.log(response)
          return response;
        }),
          catchError((e: Response) => throwError(e)))
      );

  }

}