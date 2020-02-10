import { Injectable } from '@angular/core';
import {  Response,  RequestOptions } from "@angular/http";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { environment } from '../../environments/environment';
import { RequestPayload, KeyRequest } from './models/requests/key-request';
import { KeyResponse } from './models/responses/key-response';
import { User } from '../models/user';
import { RequestValidateHeader, RequestValidatePayload, ValidateKeyRequest } from './models/requests/validate-key-request.'; import { StringMapWithRename } from '@angular/compiler/src/compiler_facade_interface';
import { Email, EmailRequestPayload, EmailRequestHeader, EmailRequest } from './models/requests/email-request';
import { AuthService } from './auth.service';
import { MatDialog } from '@angular/material';
import { UserRequest } from './models/requests/user-request';

@Injectable()
export class SecurityService {

  public userSession: User;

  constructor(private _http: HttpClient,
    public authService: AuthService) {

  }

  public notificateUserEmail(cellPhone: String): Observable<String> {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'application/json',
    });


    let from: String = 'xxxxxxxxxxxx@gmail.com';
    let to: String = this.authService.userProfile.nickname + '@gmail.com';
    let subject: String = 'Compras SophosStore';
    let text: String = 'Apreciado ' + this.authService.userProfile.name
      + ' gracias por comprar en nuestro portal, su orden ha sido procesada exitosamente';

    let emailUser = new Email(from, to, subject, text);

    let emailRequestPayload = new EmailRequestPayload("57" + cellPhone, emailUser);
    let emailRequestHeader = new EmailRequestHeader(0, true);
    let emailRequest = new EmailRequest(emailRequestHeader, emailRequestPayload);

    return this._http
      .post(environment.URLNotification + environment.endPointNotification, emailRequest, { headers: headers })
      .pipe(
        map(((response: any) => {
          return JSON.parse(response._body).responsePayload.resumeMail;
        }),
          catchError((e: Response) => throwError(e)))
      );

  }

  public getHeaderBasicAutentication(user : string, pass : string){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Basic ' + btoa(environment.userOauth + ':' + environment.passOauth)
    });

    let params = {
      'grant_type': 'password',
      'username': user,
      'password': pass
    };

    let options = {
      "headers" : headers,
      "params" : params
    }

    return options;
  }

  public getOptionsNormal(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });

    let options = {
      "headers" : headers
    }

    return options;
  }

  public getTokenAuthentication(options : any) {
    return this._http.post(environment.URLSecurity + environment.endPointGenerateToken, "", options)
  }

  public createUser(userRequest : UserRequest, options : any) {
    return this._http.post(environment.URLSecurity + environment.endPointCreateUser, userRequest, options)
  }

  

  public verificateToken(): Observable<string> {

    let headers = this.getHeaderTokenBySession();

    let requestHeader = new RequestValidateHeader(headers.get("X-Session"));
    let requestValidatePayload = new RequestValidatePayload("1");
    let validateKeyRequest = new ValidateKeyRequest(requestHeader, requestValidatePayload);

    return this._http
      .post(environment.URLSecurity + environment.endPointVerifyToken, validateKeyRequest, { headers: headers })
      .pipe(
        map(((response: any) => {
          return JSON.parse(response._body).responseHeader.status.code;
        }),
          catchError((e: Response) => throwError(e)))
      );

  }

  public validateTokenBySessionUser(): boolean {
    console.log("token", localStorage.getItem('access_token_jwt'))
    if (localStorage.getItem('access_token_jwt') == null) {
      return false;
    }
    else {
      return true;
    }
  }

  public getHeaderTokenBySession(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-RqUID': localStorage.getItem('access_id_session'),
      'X-IPAddr': location.host,
      'X-Session': localStorage.getItem('access_token_jwt'),
      'X-Sesion': localStorage.getItem('access_token_jwt'),
      'X-Channel': '1',
      "Access-Control-Allow-Origin": "*"
    });

    return headers;

  }

  public isAuthenticated(): boolean {
    if (localStorage.getItem("access_user") == null) {
      return false;
    }
    return true;
  }

  public getIdSession(): String {
    return localStorage.getItem('access_id_session');
  }

  public getUserSession(): User {
    if (localStorage.getItem("access_user") != null) {
      return JSON.parse(localStorage.getItem("access_user"));
    }
  }

  private setSession(authResult): void {
    localStorage.setItem('access_token', authResult.token);
  }

  public setSessionRemove(): void {
    localStorage.removeItem('access_token');
  }

  public logInSession(userSession) {
    localStorage.setItem('access_user', JSON.stringify(userSession));
    localStorage.setItem('access_id_session', userSession.sub);
  }

  public logOutSession() {

    localStorage.removeItem('access_user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('access_id_session');
    this.userSession = null;

  }

}
