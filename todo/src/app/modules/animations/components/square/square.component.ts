import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('rotate', [
      state(
        'straight',
        style({
          transform: 'rotate(0)',
          backgroundColor: 'blue',
        })
      ),
      state(
        'rotated',
        style({
          transform: 'rotate(360deg)',
          backgroundColor: 'orange',
        })
      ),
      transition('straight <=> rotated', [animate(1000)]),
    ]),
  ],
})
export class SquareComponent {
  public isMoving = false;

  public toggleAnimation(): void {
    this.isMoving = !this.isMoving;
  }
}
