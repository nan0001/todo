import { Directive, HostBinding, Input, OnChanges } from '@angular/core';
import { TodoItemInterface } from '../models/todo-item.model';

@Directive({
  selector: '[appCross]',
})
export class CrossDirective implements OnChanges {
  @Input() appCross: TodoItemInterface['status'] | '' = '';

  @HostBinding('style.textDecoration') textDecoration: string | null = null;

  public ngOnChanges(): void {
    this.crossTask();
  }

  private crossTask(): void {
    if (this.appCross === 'done') {
      this.textDecoration = 'line-through';
    } else {
      this.textDecoration = null;
    }
  }
}
