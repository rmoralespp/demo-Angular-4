import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes, CanActivate} from '@angular/router/';

import { HomeComponent } from './home.component';
import { AuthGuard }     from '../../guards/auth.guard';

const routes:Routes=[
  { path:'',   component:HomeComponent, canActivate:[AuthGuard] },
  
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
