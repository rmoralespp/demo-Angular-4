import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule,Routes } from '@angular/router';

import { LayoutComponent }  from './layout/layout.component';
import { AsideComponent }   from './layout/aside/aside.component';
import { NavComponent }     from './layout/nav/nav.component';
import { SectionComponent } from './layout/section/section.component';



//Servicios que se van a proveeer
import { AuthGuard   }     from '../../guards/auth.guard';
import { AuthService }     from './services/auth.service';
import { MessageService }  from './services/message.service';

const routes:Routes = [
  { path: 'auth',  loadChildren: 'app/modules/auth/auth.module#AuthModule' },
  { path: 'home',  loadChildren: 'app/modules/home/home.module#HomeModule', canLoad:[ AuthGuard ] },
  { path: 'posts', loadChildren: 'app/modules/post/post.module#PostModule' },
  { path: '',      redirectTo:   'home', pathMatch:'full' },
  { path: '**',    redirectTo:   '' }
]


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [ LayoutComponent, AsideComponent, NavComponent, SectionComponent ],
  exports:      [ LayoutComponent ],
  providers:    [ AuthService, AuthGuard, MessageService ]

})
export class CoreModule { }
