import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { Product } from '../app.models';
import { Cart } from '../models/cart.model';
import { environment } from 'src/environments/environment';
import { CartRequest } from './models/requests/cart-request';
import { RequestOptions, Headers, Http } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { CartResponse } from './models/responses/cart-response';
import { SecurityService } from './security.service';

@Injectable()
export class CartService {
  public Data = new Cart(
    [], // compareList
    [],  // wishList
    [],  // cartList
    null, //totalPrice,
    0 //totalCartCount
  )

  private cartResponse: CartResponse;

  constructor(public http: HttpClient,
    private securityService: SecurityService,
    public snackBar: MatSnackBar, private _http: HttpClient) { }

  public addToCart(product: Product) {
    let message=''; 
    let status;
    this.Data.totalPrice = null;
    this.Data.totalCartCount = null;

    if (this.Data.products.filter(item => item._id == product._id)[0]) {
      let item = this.Data.products.filter(item => item._id == product._id)[0];
      item.cartCount = product.cartCount;
    }
    else {
      this.Data.products.push(product);
    }

    if (environment.errorInyectado) {
      let cant=1;
      let cantProd=0;
      this.Data.products.forEach(product => {
        if (cant==2) {
          this.Data.totalPrice = this.Data.totalPrice + (product.cartCount * product.newPrice);
          this.Data.totalCartCount = this.Data.totalCartCount + product.cartCount;
          this.Data.totalPrice = this.Data.totalPrice + 1000;
          cant=1;
        } else {
          this.Data.totalPrice = this.Data.totalPrice + (product.cartCount * product.newPrice);
          this.Data.totalCartCount = this.Data.totalCartCount + product.cartCount;
          cant++;
        }
        cantProd++;
        if (cantProd>=environment.cantProducts) {
          message = ' Ha superado el tope de maximo permitido (' + environment.cantProducts+').' ;
          status = 'error';
          this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'bottom', duration: 6000 });
        }
      });
    } else {
      this.Data.products.forEach(product => {
        this.Data.totalPrice = this.Data.totalPrice + (product.cartCount * product.newPrice);
        this.Data.totalCartCount = this.Data.totalCartCount + product.cartCount;
      });
    }

    message = 'El producto ' + product.name + ' ha sido añadido al carrito.' + message;
    status = 'success';
    this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
    this.updateCart(this.Data).subscribe(data => {
    });
    
  }
  public resetProductCartCount(product: Product) {
    product.cartCount = 0;
    if (this.Data.compareList){
    let compareProduct = this.Data.compareList.filter(item => item._id == product._id)[0];
    if (compareProduct) {
      compareProduct.cartCount = 0;
    };
  }
  if (this.Data.wishList){
    let wishProduct = this.Data.wishList.filter(item => item._id == product._id)[0];
    if (wishProduct) {
      wishProduct.cartCount = 0;
    };
  }
  }

  public updateCart(data: Cart):Observable<string>{
    let headers = this.securityService.getHeaderTokenBySession();
    console.log(headers)
    data.compareList = null;
    data.wishList = null;
    let cartRequest = new CartRequest(headers.get("X-RqUID"), data);

    return this._http
      .post(environment.URLCard + environment.endPointUpdateCart, cartRequest, { headers: headers })
      .pipe(
        map(((response: any) => {
          return response;
        }),
          catchError((e: Response) => throwError(e)))
      );
  }

  public getCart(idSession: String) {

    let headers = this.securityService.getHeaderTokenBySession();

    let getCartRequest = { "IdSesion": idSession };

    return this._http
      .post(environment.URLCard + environment.endPointGetCart, getCartRequest, { headers: headers })
      .pipe(
        map(((response: any) => {
          this.cartResponse = response.json();
          if (this.cartResponse.cart != null) {
            this.Data = this.cartResponse.cart;
          }
          return this.Data;
        }),
          catchError((e: Response) => throwError(e)))
      );
  }
} 