import { Component, OnInit, ViewChild, HostListener, SecurityContext } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatFormFieldBase } from '@angular/material';
import { ProductDialogComponent } from '../../shared/products-carousel/product-dialog/product-dialog.component';
import { Product, Category } from "../../app.models";
import { ProductService } from '../../services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { Utils } from 'src/app/services/utils/utils';
import { SecurityService } from '../../services/security.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SignInComponent } from '../sign-in/sign-in.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @ViewChild('sidenav') sidenav: any;
  public sidenavOpen: boolean = true;
  private sub: any;
  public viewType: string = 'grid';
  public viewCol: number = 25;
  public counts = [12, 24, 36];
  public count: any;
  public sortings = ['Sort by Default', 'Best match', 'Lowest first', 'Highest first'];
  public sort: any;
  public products: Array<Product> = [];
  public categories: Category[];
  public brands = [];
  public priceFrom: number = 750;
  public priceTo: number = 1599;
  public page: any;
  public isCheckedAvailability: boolean = false;
  public isCheckedNotAvailability: boolean = false;

  showSpellingMistakes : boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
    public appService: ProductService,
    public appServiceCategory: CategoryService,
    public securityService: SecurityService,
    public dialog: MatDialog,
    private router: Router,
    public utils: Utils,
    private domSanitizer:DomSanitizer) {
  }

  ngOnInit() {
    if (environment.errorInyectado) {
      this.showSpellingMistakes = true;
    }
    this.count = this.counts[0];
    this.sort = this.sortings[0];
    this.sub = this.activatedRoute.params.subscribe(params => {

      //console.log(params['name']);
      if (params['name'] !== undefined) {
        if (params['name'] == "todas las categorias") {
          this.getProducts();
        } else {
          this.getProductsByCategory(params['name']);
        }
      } else {
        this.getProducts();
      }
    });

    if (window.innerWidth < 960) {
      this.sidenavOpen = false;
    };
    if (window.innerWidth < 1280) {
      this.viewCol = 33.3;
    };
    this.categories = []
    this.getCategories();
    this.getBrands();

  }

  returnNameImage(pName: string) {
    return pName;
  }

  public getProductsByCategory(nameCategory: string) {

    let validateToken = this.securityService.validateTokenBySessionUser();
    if (validateToken) {

      this.appService.getProductsByCategory(nameCategory).subscribe(data => {
        //data = this.appService.convertImages64BitToImagesArray(data);
        this.products = data;
      });

    } else {
      setTimeout(()=>{
        const dialogRef = this.dialog.open(SignInComponent, {
          panelClass: 'product-dialog',
          data: { name: "this.name", color: "this.color" }
        });
    
        dialogRef.afterClosed().subscribe(res => {
          //this.color = res;
        });
      });
    }

  }

  public getProducts() {

    let validateToken = this.securityService.validateTokenBySessionUser();
    if (validateToken) {

      this.appService.getProducts().subscribe(data => {
        //data = this.appService.convertImages64BitToImagesArray(data);
        this.products = data;
      });

    } else {

      setTimeout(()=>{
        const dialogRef = this.dialog.open(SignInComponent, {
          panelClass: 'product-dialog',
          data: { name: "this.name", color: "this.color" }
        });
    
        dialogRef.afterClosed().subscribe(res => {
          //this.color = res;
        });
      });

    }

  }

  public getCategories() {

    this.appServiceCategory.getCategoriesMock().subscribe(data => {
      this.categories = data;
    });

  }

  public getBrands() {
    this.brands = this.utils.getBrands();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
    (window.innerWidth < 1280) ? this.viewCol = 33.3 : this.viewCol = 25;
  }

  public changeCount(count) {
    this.count = count;
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.getProductsByCategory(params['name']);
    });

  }

  public changeSorting(sort) {
    this.sort = sort;
  }

  public changeViewType(viewType, viewCol) {
    this.viewType = viewType;
    this.viewCol = viewCol;
  }

  public openProductDialog(product) {
    let dialogRef = this.dialog.open(ProductDialogComponent, {
      data: product,
      panelClass: 'product-dialog'
    });
    dialogRef.afterClosed().subscribe(product => {
      if (product) {
        this.router.navigate(['/products', product.id, product.name]);
      }
    });
  }

  public onPageChanged(event) {
    this.page = event;
    this.getProductsByCategory("");
    window.scrollTo(0, 0);
  }

  public onChangeCategory(event) {
    if (event.target) {
      this.router.navigate(['/products', event.target.innerText.toLowerCase()]);
    }
  }

  public onChangeAvailability(event) {
    if (event.checked) {
      this.isCheckedNotAvailability = false;
    }
  }

  public onChangeNotAvailability(event) {
    if (event.checked) {
      this.isCheckedAvailability = false;
    }
  }

  public searchPrice() {
    
    let validateToken = this.securityService.validateTokenBySessionUser();
    if (validateToken) {

      this.appService.getProductsByRangePrice(this.priceFrom, this.priceTo).subscribe(data => {
        //data = this.appService.convertImages64BitToImagesArray(data);
        this.products = data;
      });

    } else {

      setTimeout(()=>{
        const dialogRef = this.dialog.open(SignInComponent, {
          panelClass: 'product-dialog',
          data: { name: "this.name", color: "this.color" }
        });
    
        dialogRef.afterClosed().subscribe(res => {
          //this.color = res;
        });
      });

    }
  }

  public searchAvailability() {
    
    if (this.isCheckedAvailability) {
      let validateToken = this.securityService.validateTokenBySessionUser();
      if (validateToken) {

        this.appService.getProductsByAvailability(true).subscribe(data => {
          //data = this.appService.convertImages64BitToImagesArray(data);
          this.products = data;
        });

      } else {

        setTimeout(()=>{
          const dialogRef = this.dialog.open(SignInComponent, {
            panelClass: 'product-dialog',
            data: { name: "this.name", color: "this.color" }
          });
      
          dialogRef.afterClosed().subscribe(res => {
            //this.color = res;
          });
        });

      }
    }

    if (this.isCheckedNotAvailability) {
      let validateToken = this.securityService.validateTokenBySessionUser();
      if (validateToken) {

        this.appService.getProductsByAvailability(false).subscribe(data => {
          //data = this.appService.convertImages64BitToImagesArray(data);
          this.products = data;
        });

      } else {

        setTimeout(()=>{
          const dialogRef = this.dialog.open(SignInComponent, {
            panelClass: 'product-dialog',
            data: { name: "this.name", color: "this.color" }
          });
      
          dialogRef.afterClosed().subscribe(res => {
            //this.color = res;
          });
        });

      }
    }

  }

}
