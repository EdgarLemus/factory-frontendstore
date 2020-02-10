import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.services';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  total = [];
  grandTotal = 0;
  cartItemCount = [];
  cartItemCountTotal = 0;
  
  constructor(public cartService:CartService) { }

  ngOnInit() {
      console.log(this.cartService.Data.products)
      if (environment.errorInyectado) {
        let cant=1;
        let cantProd=0;
        this.cartService.Data.products.forEach(product=>{
          if (cant==2) {
            this.total[product._id] = product.cartCount*product.newPrice;
          this.grandTotal += product.cartCount*product.newPrice;
          this.cartItemCount[product._id] = product.cartCount;
          this.cartItemCountTotal += product.cartCount;
          this.grandTotal=this.grandTotal+1000;
            cant=1;
          }else {
            this.total[product._id] = product.cartCount*product.newPrice;
          this.grandTotal += product.cartCount*product.newPrice;
          this.cartItemCount[product._id] = product.cartCount;
          this.cartItemCountTotal += product.cartCount;
          cant++;
          }
      })
    } else {
        this.cartService.Data.products.forEach(product=>{
          this.total[product._id] = product.cartCount*product.newPrice;
          this.grandTotal += product.cartCount*product.newPrice;
          this.cartItemCount[product._id] = product.cartCount;
          this.cartItemCountTotal += product.cartCount;
        })
      }
  }

  public updateCart(value){
    if(value){
      this.total[value.productId] = value.total;
      this.cartItemCount[value.productId] = value.soldQuantity;
      this.grandTotal = 0;
      this.total.forEach(price=>{
        this.grandTotal += price;
      });
      this.cartItemCountTotal = 0;
      this.cartItemCount.forEach(count=>{
        this.cartItemCountTotal +=count;
      });
     
      this.cartService.Data.totalPrice = this.grandTotal;
      this.cartService.Data.totalCartCount = this.cartItemCountTotal;

      this.cartService.Data.products.forEach(product=>{
        this.cartItemCount.forEach((count,index)=>{
          if(product.id == index){
            product.cartCount = count;
          }
        });
      });
      
    }
    
  }

  public remove(product) {
    console.log("tam remove = ", this.cartService.Data.products .length)
    const index: number = this.cartService.Data.products.indexOf(product);
    if (index !== -1) {
      if (!(environment.errorInyectado && this.cartService.Data.products .length > 6)) {
        this.grandTotal = this.grandTotal - this.total[product._id]; 
      }
      this.cartService.Data.products.splice(index, 1); 
      this.cartService.Data.totalPrice = this.grandTotal;       
      this.total.forEach(val => {
        if(val == this.total[product._id]){
          this.total[product._id] = 0;
        }
      });

      this.cartItemCountTotal = this.cartItemCountTotal - this.cartItemCount[product._id]; 
      this.cartService.Data.totalCartCount = this.cartItemCountTotal;
      this.cartItemCount.forEach(val=>{
        if(val == this.cartItemCount[product._id]){
          this.cartItemCount[product._id] = 0;
        }
      });
      this.cartService.resetProductCartCount(product);
    }     
  }

  public clear(){
    this.cartService.Data.products.forEach(product=>{
      this.cartService.resetProductCartCount(product);
    });
    this.cartService.Data.products.length = 0;
    this.cartService.Data.totalPrice = 0;
    this.cartService.Data.totalCartCount = 0;
  } 

}
