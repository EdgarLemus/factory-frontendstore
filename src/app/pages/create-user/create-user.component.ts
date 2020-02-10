import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SecurityService } from 'src/app/services/security.service';
import { UserRequest } from 'src/app/services/models/requests/user-request';
import { User } from 'src/app/models/user';
import { UserDTO } from 'src/app/services/models/dto/UserDTO';
import { MatDialogRef } from '@angular/material';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  loginForm: FormGroup;
  showDocument : boolean = false;
  constructor(public formBuilder: FormBuilder,
    private securityService: SecurityService,
    public dialogRef: MatDialogRef<CreateUserComponent>,
    ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'user': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'document': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'firstName': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'lastName': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });
    this.showDocument = environment.errorInyectado;
    if (this.showDocument) {
      this.loginForm = this.formBuilder.group({
        'user': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'document': ['', Validators.compose([])],
        'firstName': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'lastName': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      });
    }
  }

  public onCreateFormSubmit(): void {

        if (this.loginForm.valid) {
      let userRequest = new UserRequest("", "", "");
      let userDto = new UserDTO;
      userDto.username = this.loginForm.value.user;
      userDto.password = this.loginForm.value.password;
      userDto.typeId = this.loginForm.value.document;
      userDto.firstName = this.loginForm.value.firstName;
      userDto.lastName = this.loginForm.value.lastName;
      userRequest.userDto = userDto;

      this.securityService.createUser(userRequest, 
        this.securityService.getOptionsNormal()).subscribe(response => {
        console.log(response);
        this.dialogRef.close();
      }, error => {
        console.log(error)
       // this.spinner.hide();
      });
    }
  
  }
}
