import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router/';

import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';



const routes: Routes = [
    
    { path:  'register',  component: RegisterComponent},
    { path:  'login',  component: LoginComponent}, 
    { path:  '',    redirectTo: 'login', pathMatch:'full' },
  ]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
   
  ],
  providers:[],
  declarations: [LoginComponent, RegisterComponent]
})
export class AuthModule { }
