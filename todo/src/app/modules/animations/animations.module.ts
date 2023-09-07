import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiguresComponent } from './components/figures/figures.component';
import { SquareComponent } from './components/square/square.component';
import { CircleComponent } from './components/circle/circle.component';

@NgModule({
  declarations: [FiguresComponent, SquareComponent, CircleComponent],
  imports: [CommonModule],
})
export class AnimationsModule {}
