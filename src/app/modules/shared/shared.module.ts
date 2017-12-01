import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 

import { MessageService } from './message.service';
import {PagerService} from './pager.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [],

  providers:[MessageService,PagerService],
  exports:[
    HttpModule,
    FormsModule,
    ReactiveFormsModule,

  ]

})
export class SharedModule { }