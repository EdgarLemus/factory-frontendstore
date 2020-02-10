import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import { SecurityService } from '../../../services/security.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.services';
import { MatDialog } from '@angular/material';
import { SignInComponent } from 'src/app/pages/sign-in/sign-in.component';


@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html'
})
export class TopMenuComponent implements OnInit {

  public profile: any = [];
  public userSession: string = 'anonimo';
  public currencies = ['USD', 'EUR'];
  public currency: any;
  closeResult : string;

  public flags = [
    { name: 'Español', image: 'assets/images/flags/tr.svg' },
    { name: 'English', image: 'assets/images/flags/gb.svg' }
  ]
  public flag: any;

  constructor(public appService: AppService,
    public cartService: CartService,
    public authService: AuthService,
    public router: Router,
    public securityService: SecurityService,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this.currency = this.currencies[0];
    this.flag = this.flags[0];
  }

  public changeCurrency(currency) {
    this.currency = currency;
  }

  public changeLang(flag) {
    this.flag = flag;
  }

  public changeValidateUser() {
    if (this.authService.isAuthenticated()) {
      if (this.authService.userProfile) {
        this.profile = this.authService.userProfile;
      } else {
        this.authService.getProfile((err, profile) => {
          this.profile = profile;
        });
      }
    }
  }

  public login() {
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

 
  public logout() {
    this.securityService.logOutSession();
    this.authService.logout();
  }

}
