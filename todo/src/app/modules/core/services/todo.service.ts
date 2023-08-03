import { Injectable } from '@angular/core';
import { TodoItemInterface } from '../models/todo-item.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  public todolist: TodoItemInterface[] = [
    { task: 'Buy some food', status: 'in progress' },
    { task: 'Do homework', status: 'done' },
  ];

  private todolistSrc = new BehaviorSubject<TodoItemInterface[]>(this.todolist);

  public todolist$ = this.todolistSrc.asObservable();

  public addItem(item: TodoItemInterface): void {
    this.todolist = [...this.todolist, item];
    this.todolistSrc.next(this.todolist);
  }

  public changeItemStatus(item: TodoItemInterface): void {
    item.status === 'done'
      ? (item.status = 'in progress')
      : (item.status = 'done');

    this.todolistSrc.next([...this.todolist]);
  }
}
