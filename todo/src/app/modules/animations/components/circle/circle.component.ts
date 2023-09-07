import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fade-in', [
      transition(':enter', [
        animate(
          1000,
          keyframes([
            style({
              transform: 'translate(-100%,-100%)',
              opacity: 0,
              backgroundColor: 'red',
            }),
            style({
              transform: 'translate(0,0)',
              opacity: 1,
              backgroundColor: 'green',
            }),
          ])
        ),
      ]),
      transition(':leave', [
        animate(
          1000,
          keyframes([
            style({
              transform: 'translateY(-10%)',
              opacity: 1,
              backgroundColor: 'purple',
            }),
            style({
              transform: 'translate(-5%,30%)',
              opacity: 1,
              backgroundColor: 'yellow',
            }),
            style({
              transform: 'translate(-30%,-100%)',
              opacity: 0,
              backgroundColor: 'gray',
            }),
          ])
        ),
      ]),
    ]),
  ],
})
export class CircleComponent {
  public isShown = false;

  public toggleCircle(): void {
    this.isShown = !this.isShown;
  }
}
