import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule,Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { LayoutComponent } from './layout/layout.component';
import { AsideComponent } from './layout/aside/aside.component';
import { NavComponent } from './layout/nav/nav.component';
import { SectionComponent } from './layout/section/section.component';


const routes:Routes=[
  { path:'home',   loadChildren: 'app/modules/home/home.module#HomeModule'},
  { path:'posts',  loadChildren: 'app/modules/post/post.module#PostModule'},
  { path: '',      redirectTo:   '/home', pathMatch: 'full' },
  
]


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [LayoutComponent, AsideComponent, NavComponent, SectionComponent],

  exports:[LayoutComponent]

})
export class CoreModule { }
