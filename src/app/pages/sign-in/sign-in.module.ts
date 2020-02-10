import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { SignInComponent } from './sign-in.component';
import { MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule } from '@angular/material';

export const routes = [
  { path: '', component: SignInComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ]  

})
export class SignInModule { }
