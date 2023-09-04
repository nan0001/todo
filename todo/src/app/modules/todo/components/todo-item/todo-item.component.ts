import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Host,
  ElementRef,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TodoItemInterface } from '../../models/todo-item.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input() item!: TodoItemInterface;
  @Output() checkboxChecked = new EventEmitter<{
    element: HTMLElement;
    item: TodoItemInterface;
  }>();

  public editMode = false;
  public editForm = this.fb.group({
    task: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(15)],
    ],
  });

  constructor(
    private todoservice: TodoService,
    private fb: FormBuilder,
    @Host() private elementRef: ElementRef<HTMLElement>
  ) {}

  public ngOnInit(): void {
    this.editForm.controls.task.setValue(this.item?.task);
  }

  public changeItemStatus(item: TodoItemInterface): void {
    const eventDescription = {
      element: this.elementRef.nativeElement, //еще работает через template variable на ng-container
      item,
    };
    this.checkboxChecked.emit(eventDescription);
  }

  public removeItem(item: TodoItemInterface): void {
    this.todoservice.removeItem(item);
  }

  public enterEditMode(): void {
    this.editMode = !this.editMode;
    this.editForm.controls.task.setValue(this.item?.task);
  }

  public editItem(item: TodoItemInterface): void {
    if (this.editForm.controls.task.valid) {
      const newValue = this.editForm.controls.task.value || '';
      this.todoservice.editItem(item, newValue);
      this.enterEditMode();
    } else {
      this.editForm.controls.task.markAsTouched();
    }
  }
}
