import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpandableTableComponent } from './components/expandable-table/expandable-table.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material/material.module';
import { ItemComponent } from './components/item/item.component';
import { AlbumImageComponent } from './components/album-image/album-image.component';
import { AlbumNameComponent } from './components/album-name/album-name.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ExpandableTableComponent,
    ItemComponent,
    AlbumImageComponent,
    AlbumNameComponent,
    CustomInputComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [ExpandableTableComponent],
})
export class ExpandableTableModule {}
