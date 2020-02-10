import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from "@angular/http";
import { NgxSpinnerModule } from 'ngx-spinner';
import { AgmCoreModule } from '@agm/core';

import { OverlayContainer, Overlay } from '@angular/cdk/overlay';
import { MAT_MENU_SCROLL_STRATEGY, MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule } from '@angular/material';
import { CustomOverlayContainer } from './theme/utils/custom-overlay-container';
import { menuScrollStrategy } from './theme/utils/scroll-strategy';

import { SharedModule } from './shared/shared.module';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { TopMenuComponent } from './theme/components/top-menu/top-menu.component';
import { MenuComponent } from './theme/components/menu/menu.component';
import { SidenavMenuComponent } from './theme/components/sidenav-menu/sidenav-menu.component';
import { BreadcrumbComponent } from './theme/components/breadcrumb/breadcrumb.component';

import { AppSettings } from './app.settings';
import { AppService } from './app.service';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { OrderService } from './services/order.service';
import { SecurityService } from './services/security.service';
import { PaymentService } from './services/payment.service';
import { AppInterceptor } from './theme/utils/app-interceptor';
import { OptionsComponent } from './theme/components/options/options.component';
import { FooterComponent } from './theme/components/footer/footer.component';
import { CartService } from './services/cart.services';
import { Utils } from './services/utils/utils';
import { ModalService } from './services/modal.service'
import { EncripterService } from './services/encripter.service';
import { AuthService } from './services/auth.service';
import { CallbackComponent } from './pages/callback/callback.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateUserComponent } from './pages/create-user/create-user.component';



@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    NgxSpinnerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAAYi6itRZ0rPgI76O3I83BhhzZHIgMwPg'
    }),
    SharedModule,
    routing,
    MatDialogModule,
    MatFormFieldModule, 
    MatButtonModule, 
    MatInputModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    PagesComponent,
    NotFoundComponent,
    TopMenuComponent,
    MenuComponent,
    SidenavMenuComponent,
    BreadcrumbComponent,
    OptionsComponent,
    CallbackComponent,
    FooterComponent,
    CreateUserComponent,
    SignInComponent
  ],
  providers: [
    AppSettings,
    CategoryService,
    ProductService,
    OrderService,
    PaymentService,
    CartService,
    SecurityService,
    EncripterService,
    AuthService,
    AppService,
    Utils,
    ModalService,
    { provide: OverlayContainer, useClass: CustomOverlayContainer },
    { provide: MAT_MENU_SCROLL_STRATEGY, useFactory: menuScrollStrategy, deps: [Overlay] },
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true }
  ],
  entryComponents: [SignInComponent, CreateUserComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule],
  bootstrap: [AppComponent]
})
export class AppModule { }