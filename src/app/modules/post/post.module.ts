import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router/';

import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { NewComponent } from './new/new.component';


const routes: Routes = [
  
    { path:  '',     component: ListComponent},
    { path:  'new',  component: NewComponent},
    { path:  ':id',  component: DetailComponent},
   
   
    
  ]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListComponent, DetailComponent, NewComponent]
})
export class PostModule { }
