import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Product } from "../../app.models";
import { ProductService } from '../../services/product.service';
import { SecurityService } from '../../services/security.service';
import { EncripterService } from 'src/app/services/encripter.service';
import { AuthService } from 'src/app/services/auth.service';
import { SignInComponent } from '../sign-in/sign-in.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public slides = [
    { title: 'Nuevos Celulares', subtitle: 'Nuevos dispositivos', category: 'CELULARES', image: 'assets/images/carousel/banner1.jpeg' },
    { title: 'Nuevos Accesorios', subtitle: 'Nueva temporada en oferta', category: 'ACCESORIOS', image: 'assets/images/carousel/banner2.jpg' },
    { title: 'Nuevos Audios', subtitle: 'No te la pierdas', category: 'AUDIO', image: 'assets/images/carousel/banner3.jpg' }
  ];

  public brands = [];
  public banners = [];
  public products: Array<Product>;
  public featuredProducts: Array<Product>;
  public onSaleProducts: Array<Product>;
  public topRatedProducts: Array<Product>;
  public newArrivalsProducts: Array<Product>;


  constructor(public appService: AppService,
    public encripterService: EncripterService,
    public authService: AuthService,
    public securityService: SecurityService,
    public productService: ProductService,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.securityService.setSessionRemove();
    this.validateUserAuthenticared();
    this.getBanners();
    this.getProductsByCategory("celulares");
    this.getBrands();
  }

  public validateUserAuthenticared() {

    if (this.authService.isAuthenticated()) {
      if (this.authService.userProfile === undefined) {
        this.authService.getProfile((err, profile) => {
          this.securityService.logInSession(this.authService.userProfile);
        });
      }
    }
  }

  public onLinkClick(e) {
    this.getProductsByCategory(e.tab.textLabel.toLowerCase());
  }

  public getProductsByCategory(nameCategory: string) {

    let validateToken = this.securityService.validateTokenBySessionUser();
    if (validateToken) {
      this.productService.getProductsByCategory(nameCategory).subscribe(data => {
       // data = this.productService.convertImages64BitToImagesArray(data);
        console.log("catalogo de imagenes transformado", data);
        this.products = data;
      }, (error: any) => {
        this.products = [];
        console.log("Respuesta de error de consulta del catalogo: ", error)
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

  public getBanners() {
    this.appService.getBanners().subscribe(data => {
      this.banners = data;
    })
  }

  public getBrands() {
    this.brands = this.appService.getBrands();
  }

}
