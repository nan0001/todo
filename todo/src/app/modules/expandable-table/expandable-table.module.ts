import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpandableTableComponent } from './components/expandable-table/expandable-table.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material/material.module';
import { ItemComponent } from './components/item/item.component';
import { AlbumImageComponent } from './components/album-image/album-image.component';
import { AlbumNameComponent } from './components/album-name/album-name.component';

@NgModule({
  declarations: [ExpandableTableComponent, ItemComponent, AlbumImageComponent, AlbumNameComponent],
  imports: [CommonModule, HttpClientModule, MaterialModule],
  exports: [ExpandableTableComponent],
})
export class ExpandableTableModule {}
