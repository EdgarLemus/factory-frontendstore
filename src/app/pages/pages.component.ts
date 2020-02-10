import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { Settings, AppSettings } from '../app.settings';
import { Category, Product } from '../app.models';
import { SidenavMenuService } from '../theme/components/sidenav-menu/sidenav-menu.service';
import { CartService } from '../services/cart.services';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  providers: [ SidenavMenuService ]
})
export class PagesComponent implements OnInit {
  public showBackToTop:boolean = false;
  public categories:Category[];
  public category:Category;
  public sidenavMenuItems:Array<any>;
  @ViewChild('sidenav') sidenav:any;

  public settings: Settings;
  constructor(public appSettings:AppSettings, 
              public categoryServices:CategoryService, 
              public productServices:ProductService,
              public sidenavMenuService:SidenavMenuService,
              public router:Router,
              public cartService:CartService) { 
    this.settings = this.appSettings.settings; 
  }

  ngOnInit() {
    this.getCategories();
    this.sidenavMenuItems = this.sidenavMenuService.getSidenavMenuItems();
  } 

  public getCategories(){    
    this.categoryServices.getCategoriesMock().subscribe(data => {
      this.categories = data;
      this.category = data[0];
    })
  }

  public changeCategory(event){
    if(event.target){
      this.category = this.categories.filter(category => category.name == event.target.innerText)[0];
    }
    if(window.innerWidth < 960){
      this.stopClickPropagate(event);
    } 
  }

  public remove(product) {
      const index: number = this.cartService.Data.products.indexOf(product);
      if (index !== -1) {
          this.cartService.Data.products.splice(index, 1);
          this.cartService.Data.totalPrice = this.cartService.Data.totalPrice - product.newPrice*product.cartCount;
          this.cartService.Data.totalCartCount = this.cartService.Data.totalCartCount - product.cartCount;
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
 

  public changeTheme(theme){
    this.settings.theme = theme;       
  }

  public stopClickPropagate(event: any){
    event.stopPropagation();
    event.preventDefault();
  }

  public search(){
    this.router.navigate(['/products', this.category.name.toLowerCase()]);
  }

 
  public scrollToTop(){
    var scrollDuration = 200;
    var scrollStep = -window.pageYOffset  / (scrollDuration / 20);
    var scrollInterval = setInterval(()=>{
      if(window.pageYOffset != 0){
         window.scrollBy(0, scrollStep);
      }
      else{
        clearInterval(scrollInterval); 
      }
    },10);
    if(window.innerWidth <= 768){
      setTimeout(() => { window.scrollTo(0,0) });
    }
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    ($event.target.documentElement.scrollTop > 300) ? this.showBackToTop = true : this.showBackToTop = false;  
  }

  ngAfterViewInit(){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) { 
        this.sidenav.close(); 
      }                
    });
    this.sidenavMenuService.expandActiveSubMenu(this.sidenavMenuService.getSidenavMenuItems());
  }

  public closeSubMenus(){
    if(window.innerWidth < 960){
      this.sidenavMenuService.closeAllSubMenus();
    }    
  }

}