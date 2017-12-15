import { BrowserModule } from '@angular/platform-browser';
import { NgModule  } from '@angular/core';
import { CoreModule } from './modules/core/core.module';

import { LayoutComponent } from './modules/core/layout/layout.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { LoginComponent } from './modules/auth/login/login.component';




@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    CoreModule
  ],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
