import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { AsideComponent } from './layout/aside/aside.component';
import { NavComponent } from './layout/nav/nav.component';
import { SectionComponent } from './layout/section/section.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LayoutComponent, AsideComponent, NavComponent, SectionComponent],

  exports:[LayoutComponent]

})
export class CoreModule { }
