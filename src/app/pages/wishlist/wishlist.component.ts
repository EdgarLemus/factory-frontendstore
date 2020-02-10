import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Data, AppService } from '../../app.service';
import { Product } from '../../app.models';
import { CartService } from 'src/app/services/cart.services';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  public quantity:number = 1;
  constructor(public appService:AppService, 
    public cartService:CartService,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.cartService.Data.products.forEach(cartProduct=>{
      this.appService.Data.wishList.forEach(product=>{
        if(cartProduct._id == product._id){
          product.cartCount = cartProduct.cartCount;
        }
      });
    });
  }

  public remove(product:Product) {
    const index: number = this.appService.Data.wishList.indexOf(product);
    if (index !== -1) {
        this.appService.Data.wishList.splice(index, 1);
    }     
  }

  public clear(){
    this.appService.Data.wishList.length = 0;
  } 

  public getQuantity(val){
    this.quantity = val.soldQuantity;
  }

  public addToCart(product:Product){
    let currentProduct = this.cartService.Data.products.filter(item=>item._id == product._id)[0];
    if(currentProduct){
      if((currentProduct.cartCount + this.quantity) <= product.availibilityCount){
        product.cartCount = currentProduct.cartCount + this.quantity;
      }
      else{
        this.snackBar.open('No puedes agregar más artículos que los disponibles. En stock ' + product.availibilityCount + ' elementos y ya has agregado ' + currentProduct.cartCount + ' artículo a su carrito', '×', { panelClass: 'error', verticalPosition: 'top', duration: 5000 });
        return false;
      }
    }
    else{
      product.cartCount = this.quantity;
    }
    this.cartService.addToCart(product);
  } 

}