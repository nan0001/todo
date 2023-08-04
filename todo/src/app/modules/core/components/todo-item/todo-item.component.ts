import { Component, Input, OnInit } from '@angular/core';
import { TodoItemInterface } from '../../models/todo-item.model';
import { TodoService } from '../../services/todo.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input() item!: TodoItemInterface;

  public editMode = false;
  public editForm = this.fb.group({
    task: ['', Validators.required],
  });

  constructor(
    private todoservice: TodoService,
    private fb: FormBuilder
  ) {}

  public ngOnInit(): void {
    this.editForm.controls.task.setValue(this.item?.task);
  }

  public changeItemStatus(item: TodoItemInterface): void {
    this.todoservice.changeItemStatus(item);
  }

  public removeItem(item: TodoItemInterface): void {
    this.todoservice.removeItem(item);
  }

  public enterEditMode(): void {
    this.editMode = !this.editMode;
    this.editForm.controls.task.setValue(this.item?.task);
  }

  public editItem(item: TodoItemInterface): void {
    if (this.editForm.controls.task.value) {
      this.todoservice.editItem(item, this.editForm.controls.task.value);
      this.enterEditMode();
    } else {
      this.editForm.controls.task.markAsTouched();
    }
  }
}
