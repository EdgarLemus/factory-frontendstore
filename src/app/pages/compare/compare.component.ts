import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Data, AppService } from '../../app.service';
import { Product } from '../../app.models';
import { CartService } from 'src/app/services/cart.services';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit {
  
  constructor(public appService:AppService, 
    public cartService:CartService,
    public snackBar: MatSnackBar) { }

  ngOnInit() { 
    this.cartService.Data.products.forEach(cartProduct=>{
      this.appService.Data.compareList.forEach(product=>{
        if(cartProduct._id == product._id){
          product.cartCount = cartProduct.cartCount;
        }
      });
    });
  }

  public remove(product:Product) {
      const index: number = this.appService.Data.compareList.indexOf(product);
      if (index !== -1) {
          this.appService.Data.compareList.splice(index, 1);
      }        
  }

  public clear(){
    this.appService.Data.compareList.length = 0;
  }

  public addToCart(product:Product){
    product.cartCount = product.cartCount + 1;
    if(product.cartCount <= product.availibilityCount){
      this.cartService.addToCart(product);
    }
    else{
      product.cartCount = product.availibilityCount;
      this.snackBar.open('No puedes agregar más artículos que los disponibles. En stock ' + product.availibilityCount + ' elementos y ya has agregado ' + product.cartCount + ' artículo a su carrito', '×', { panelClass: 'error', verticalPosition: 'top', duration: 5000 });
    }
  }

}
