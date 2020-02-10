import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { SwiperConfigInterface, SwiperDirective } from 'ngx-swiper-wrapper';
import { ProductService } from '../../../services/product.service';
import { Product, Category } from "../../../app.models";
import { emailValidator } from '../../../theme/utils/app-validators';
import { ProductZoomComponent } from './product-zoom/product-zoom.component';
import { DomSanitizer } from '@angular/platform-browser';
import { CategoryService } from 'src/app/services/category.service';
import { SecurityService } from '../../../services/security.service';
import { SignInComponent } from '../../sign-in/sign-in.component';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @ViewChild('zoomViewer') zoomViewer;
  @ViewChild(SwiperDirective) directiveRef: SwiperDirective;
  public config: SwiperConfigInterface = {};
  public product: Product;
  public image: any;
  public zoomImage: any;
  private sub: any;
  public form: FormGroup;
  public relatedProducts: Array<Product>;

  constructor(public appService: ProductService,
    public appServiceCategory: CategoryService,
    public securityService: SecurityService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    public formBuilder: FormBuilder,
    private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      console.log(params['_id'])
      this.getProductById(params['_id']);
    });
    this.form = this.formBuilder.group({
      'review': [null, Validators.required],
      'name': [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': [null, Validators.compose([Validators.required, emailValidator])]
    });
   // this.getRelatedProducts();
  }

  ngAfterViewInit() {
    this.config = {
      observer: false,
      slidesPerView: 4,
      spaceBetween: 10,
      keyboard: true,
      navigation: true,
      pagination: false,
      loop: false,
      preloadImages: false,
      lazy: true,
      breakpoints: {
        480: {
          slidesPerView: 2
        },
        600: {
          slidesPerView: 3,
        }
      }
    }
  }

  public getProductById(id) {

    this.appService.getProductById(id).subscribe(data => {

      //this.product = this.appService.convertImages64BitToImages(data)
      //this.product = this.appService.convertNumberToStringRating(data, true)
      this.product = data;
      this.image = this.product.images[0].small;
      this.zoomImage = this.product.images[0].small;
      setTimeout(() => {
        this.config.observer = true;
        // this.directiveRef.setIndex(0);
      });
    })
  }

  public getRelatedProducts() {

    let validateToken = this.securityService.validateTokenBySessionUser();
    if (validateToken) {

      this.appService.getProductsByTopProduct(5).subscribe(data => {
        //data = this.appService.convertImages64BitToImagesArray(data);
        this.relatedProducts = data;
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

  public selectImage(image) {
    this.image = image.medium;
    this.zoomImage = image.big
  }

  /*makeTrustedImage(item) {
    const imageString = JSON.stringify(item.changingThisBreaksApplicationSecurity).replace(/\\n/g, '');
    const style = 'url(' + imageString + ')';
    return this._sanitizer.bypassSecurityTrustStyle(style);
  }*/

  makeTrustedImage(item) {
    const imageString = JSON.stringify(item.changingThisBreaksApplicationSecurity);
    const style = 'url(' + imageString + ')';
    return this._sanitizer.bypassSecurityTrustStyle(style);
  }

  public onMouseMove(e) {
    if (window.innerWidth >= 1280) {
      var image, offsetX, offsetY, x, y, zoomer;
      image = e.currentTarget;
      offsetX = e.offsetX;
      offsetY = e.offsetY;
      x = offsetX / image.offsetWidth * 100;
      y = offsetY / image.offsetHeight * 100;
      zoomer = this.zoomViewer.nativeElement.children[0];
      if (zoomer) {
        zoomer.style.backgroundPosition = x + '% ' + y + '%';
        zoomer.style.display = "block";
        zoomer.style.height = image.height + 'px';
        zoomer.style.width = image.width + 'px';
      }
    }
  }

  public onMouseLeave(event) {
    this.zoomViewer.nativeElement.children[0].style.display = "none";
  }

  public openZoomViewer() {
    this.dialog.open(ProductZoomComponent, {
      data: this.zoomImage,
      panelClass: 'zoom-dialog'
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public onSubmit(values: Object): void {
    if (this.form.valid) {
      //email sent
    }
  }
}