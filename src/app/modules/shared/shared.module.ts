import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { MessageService } from './message.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule
  ],
  declarations: [],

  providers:[MessageService],
  exports:[
    HttpModule,
    FormsModule
  ]

})
export class SharedModule { }