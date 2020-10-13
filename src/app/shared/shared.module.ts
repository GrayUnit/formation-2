import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BtnComponent } from './components/btn/btn.component';
import { TableDarkComponent } from './components/table-dark/table-dark.component';
import { TableLightComponent } from './components/table-light/table-light.component';
import { StateDirective } from './directives/state.directive';
import { ModalComponent } from './components/modal/modal.component';
import { InvalidMessageDirective } from './directives/invalid-message.directive';
import { InvalidTypeDirective } from './directives/invalid-type.directive';



@NgModule({
  declarations: [TableLightComponent, StateDirective, BtnComponent, TableDarkComponent, ModalComponent, InvalidMessageDirective, InvalidTypeDirective],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    TableLightComponent,
    StateDirective,
    BtnComponent,
    TableDarkComponent,
    InvalidMessageDirective,
    ModalComponent,
    InvalidTypeDirective
  ]
})
export class SharedModule { }
