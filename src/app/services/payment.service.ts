import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { environment } from '../../environments/environment';
import { SecurityService } from './security.service';
import { Payment } from '../models/payment';
import { EncripterService } from './encripter.service';
import { PaymentRequest } from './models/requests/payment-request';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PaymentService {

  constructor(private _http: HttpClient,
    private securityService: SecurityService) { }

  public createPayment(payment: any): Observable<Payment> {

    let headers = this.securityService.getHeaderTokenBySession();

    return this._http
      .post(environment.URLPayment + environment.endPointGetPayment, '{ "payment":"' + payment + '"}', { headers: headers })
      .pipe(
        map(((response: any) => {
          return response;
        }),
          catchError((e: Response) => throwError(e)))
      );

  }

}