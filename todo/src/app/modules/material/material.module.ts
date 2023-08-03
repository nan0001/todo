import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    MatDividerModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
  ],
})
export class MaterialModule {}
