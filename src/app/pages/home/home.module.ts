import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormPersonComponent } from './component/form-question/form-person.component';
import {HomeComponent} from "./home.component";
import {MaterialModule} from "../../shared/module/material.module";
import {HomeRouting} from "./home-routes";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    FormPersonComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HomeRouting,
    ReactiveFormsModule
  ],
  exports: [],
})
export class HomeModule { }
