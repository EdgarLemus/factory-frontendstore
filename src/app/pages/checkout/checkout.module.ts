import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { CheckoutComponent } from './checkout.component';
import { MatRadioModule } from '@angular/material/radio';
import { ModalComponent } from 'src/app/theme/components/Modal';

export const routes = [
  { path: '', component: CheckoutComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
    MatRadioModule,
  ],
  declarations: [
    CheckoutComponent,
    ModalComponent
  ]
})
export class CheckoutModule { }
