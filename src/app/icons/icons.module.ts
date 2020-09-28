import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconMenuComponent } from './components/icon-menu/icon-menu.component';



@NgModule({
  declarations: [IconMenuComponent],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    IconMenuComponent
  ]
})
export class IconsModule { }
