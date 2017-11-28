
//Modulos==============================================================
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router/';
import { SharedModule } from '../shared/shared.module';

//Import Componentes===========================================================
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { NewComponent } from './new/new.component';

//Import Servicios==============================================================
import {PostService} from './post.service';



const routes: Routes = [
  
    { path:  '',     component: ListComponent},
    { path:  'new',  component: NewComponent},
    { path:  ':id',  component: DetailComponent}, 
  ]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListComponent, DetailComponent, NewComponent],
  providers: [PostService]
})
export class PostModule { }
