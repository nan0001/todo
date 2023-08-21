import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { TodoItemInterface } from '../models/todo-item.model';

@Directive({
  selector: '[appCross]',
})
export class CrossDirective implements OnInit {
  @Input() appCross: TodoItemInterface['status'] | '' = '';

  constructor(private elemRef: ElementRef) {}

  public ngOnInit(): void {
    this.crossTask();
  }

  private crossTask(): void {
    if (this.appCross === 'done') {
      this.elemRef.nativeElement.style.textDecoration = 'line-through';
    } else {
      this.elemRef.nativeElement.style.textDecoration = null;
    }
  }
}
