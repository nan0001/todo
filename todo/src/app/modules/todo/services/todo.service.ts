import { Injectable } from '@angular/core';
import { TodoItemInterface } from '../../todo/models/todo-item.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todolist: TodoItemInterface[] = [
    { task: 'Buy some food', status: 'in progress' },
    { task: 'Do homework', status: 'done' },
  ];

  public todolistSrc$ = new BehaviorSubject<TodoItemInterface[]>(this.todolist);

  public addItem(item: TodoItemInterface): void {
    this.todolist = [...this.todolist, item];
    this.todolistSrc$.next(this.todolist);
  }

  public changeItemStatus(item: TodoItemInterface): void {
    item.status = item.status === 'done' ? 'in progress' : 'done';

    this.todolistSrc$.next([...this.todolist]);
  }

  public removeItem(item: TodoItemInterface): void {
    const itemIndex = this.todolist.findIndex(val => val === item);

    if (itemIndex !== -1) {
      this.todolist.splice(itemIndex, 1);
      this.todolistSrc$.next([...this.todolist]);
    }
  }

  public editItem(item: TodoItemInterface, newValue: string): void {
    item.task = newValue;
    this.todolistSrc$.next([...this.todolist]);
  }
}
