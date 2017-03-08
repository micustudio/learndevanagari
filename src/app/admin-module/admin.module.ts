import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ItemAddComponent } from './item-add/item-add.component';

import { adminRouting } from "./admin.routing";


@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    adminRouting
    //ItemModule
  ],
  declarations: [
    SignupComponent,
    SigninComponent,
    ItemAddComponent
  ]
})
export class AdminModule { }
