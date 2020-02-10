import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatDialogRef, MatDialog } from '@angular/material';
import { emailValidator, matchingPasswords } from '../../theme/utils/app-validators';
import { SecurityService } from '../../services/security.service';
import { User } from '../../models/user';
import { AuthService } from 'src/app/services/auth.service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { CreateUserComponent } from '../create-user/create-user.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;

  constructor(public formBuilder: FormBuilder,
    public router: Router,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<SignInComponent>,
    private securityService: SecurityService,
    private authService : AuthService,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'user': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

  }

  register() {
    setTimeout(()=>{
      const dialogRef = this.dialog.open(CreateUserComponent, {
        panelClass: 'product-dialog',
        data: { name: "Crear Usuario", color: "#FFFFFF" }
      });
  
      dialogRef.afterClosed().subscribe(res => {
        //this.color = res;
      });
    });
  }

  public onLoginFormSubmit(): void {
    if (environment.errorInyectado){
      let message, status;
      if (this.loginForm.valid) {
        this.securityService.getTokenAuthentication(
          this.securityService.getHeaderBasicAutentication(
            this.loginForm.value.user, this.loginForm.value.password)).subscribe(response => {
          console.log(response);
          let user = new User(1, 'Cristian', 'Alfonso', 'Cuadros', this.loginForm.value.email, this.loginForm.value.password);
          this.securityService.logInSession(user);
          console.log("Aqui finalizo la otra peticion viene de otro lado")
          this.authService.setSession(response);
          this.dialogRef.close();
          //this.router.navigate(['/']);
          message = 'Login Exitoso';
          status = 'success';
          this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
        }, error => {
          console.log("Que esta pasando")
          this.dialogRef.close();
          message = 'Login Exitoso';
          status = 'success';
          this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
         // this.spinner.hide();
        }       
        );
      } else {
        this.dialogRef.close();
        message = 'Login Exitoso';
          status = 'success';
          this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
      }
      
    } else {
    if (this.loginForm.valid) {
      this.securityService.getTokenAuthentication(
        this.securityService.getHeaderBasicAutentication(
          this.loginForm.value.user, this.loginForm.value.password)).subscribe(response => {
        console.log(response);
        let user = new User(1, 'Cristian', 'Alfonso', 'Cuadros', this.loginForm.value.email, this.loginForm.value.password);
        this.securityService.logInSession(user);
        console.log("Aqui finalizo la otra peticion viene de otro lado")
        this.authService.setSession(response);
        this.dialogRef.close();
        //this.router.navigate(['/']);
      }, error => {
        console.log("Que esta pasando")
       // this.spinner.hide();
      });

    }
  }
}

}
