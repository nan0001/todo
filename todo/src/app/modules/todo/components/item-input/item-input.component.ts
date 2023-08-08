import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TodoItemInterface } from '../../models/todo-item.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-item-input',
  templateUrl: './item-input.component.html',
  styleUrls: ['./item-input.component.scss'],
})
export class ItemInputComponent {
  public itemInput = new FormControl('Feed the cat', [Validators.required]);

  constructor(private todoservice: TodoService) {}

  public onSubmit(event: Event): void {
    event.preventDefault();

    if (this.itemInput.valid) {
      const itemToAdd: TodoItemInterface = {
        task: this.itemInput.value as string,
        status: 'in progress',
      };

      this.todoservice.addItem(itemToAdd);
      this.itemInput.reset();
    } else {
      this.itemInput.markAsTouched();
    }
  }
}
