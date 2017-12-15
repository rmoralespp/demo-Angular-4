import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';


import { ListComponent } from './list/list.component';


const routes: Routes= [
  {path:'list', component: ListComponent},
  {path:'',    redirectTo:'list' }

]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],

  declarations: [ ListComponent ],

})
export class UserModule { }
