import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablesPageComponent } from './components/tables-page/tables-page.component';
import { MaterialModule } from '../material/material.module';
import { EditPopupComponent } from './components/edit-popup/edit-popup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CollapseColumnsDirective } from './directives/collapse-columns.directive';

@NgModule({
  declarations: [
    TablesPageComponent,
    EditPopupComponent,
    CollapseColumnsDirective,
  ],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule],
  exports: [TablesPageComponent],
})
export class TablesModule {}
