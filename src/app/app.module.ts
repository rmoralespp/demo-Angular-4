import { BrowserModule } from '@angular/platform-browser';
import { NgModule  } from '@angular/core';
import { CoreModule } from './modules/core/core.module';

import { LayoutComponent } from './modules/core/layout/layout.component';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
