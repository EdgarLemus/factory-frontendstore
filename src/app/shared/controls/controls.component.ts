import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AppService } from '../../app.service';
import { Product } from '../../app.models';
import { CartService } from 'src/app/services/cart.services';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {
  @Input() product: Product;
  @Input() type: string;
  @Output() onOpenProductDialog: EventEmitter<any> = new EventEmitter();
  @Output() onQuantityChange: EventEmitter<any> = new EventEmitter<any>();
  public count:number = 1;
  public align = 'center center';
  constructor(public appService:AppService, public cartService:CartService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    if(this.product){
      if(this.product.cartCount > 0){
        this.count = this.product.cartCount;
      }
    }  
    this.layoutAlign(); 
  }

  public layoutAlign(){
    if(this.type == 'all'){
      this.align = 'space-between center';
    }
    else if(this.type == 'wish'){
      this.align = 'start center';
    }
    else{
      this.align = 'center center';
    }
  }



  public increment(count){
    if(this.count < this.product.availibilityCount){
      this.count++;
      let obj = {
        productId: this.product.id,
        soldQuantity: this.count,
        total: this.count * this.product.newPrice
      }
      this.changeQuantity(obj);
    }
    else{
      this.snackBar.open('No puedes elegir más artículos que los disponibles. En stock ' + this.count + ' artículos.', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    }    
  }

  public decrement(count){
    if(this.count > 1){
      this.count--;
      let obj = {
        productId: this.product.id,
        soldQuantity: this.count,
        total: this.count * this.product.newPrice
      }
      this.changeQuantity(obj);
    }
  }

  public addToCompare(product:Product){
    this.appService.addToCompare(product);
  }

  public addToWishList(product:Product){
    this.appService.addToWishList(product);
  }

  public addToCart(product:Product){
    console.log(product)
    console.log(this.cartService.Data.products)
    console.log(this.count)
    let currentProduct = this.cartService.Data.products.filter(item=>item.id == product.id)[0];
    if(currentProduct){
      console.log("Lo encontro")
      if((currentProduct.cartCount + this.count) <= this.product.availibilityCount){
       /// product.cartCount = currentProduct.cartCount + this.count;
      }
      else{
        this.snackBar.open('No puedes agregar más artículos que los disponibles. En stock ' + this.product.availibilityCount + ' elementos y ya has agregado ' + currentProduct.cartCount + ' artículo a su carrito', '×', { panelClass: 'error', verticalPosition: 'top', duration: 5000 });
        return false;
      }
    }
    else{
      console.log("No encontro")
      product.cartCount = this.count;
    }
    this.cartService.addToCart(product);
  }

  public openProductDialog(event){
    this.onOpenProductDialog.emit(event);
  }

  public changeQuantity(value){
      this.onQuantityChange.emit(value);
  }

}