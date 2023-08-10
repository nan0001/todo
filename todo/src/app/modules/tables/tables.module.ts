import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablesPageComponent } from './components/tables-page/tables-page.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [TablesPageComponent],
  imports: [CommonModule, MaterialModule],
  exports: [TablesPageComponent],
})
export class TablesModule {}
