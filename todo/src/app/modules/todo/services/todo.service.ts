import { Injectable } from '@angular/core';
import { TodoItemInterface } from '../../todo/models/todo-item.model';
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

  public removeItem(item: TodoItemInterface): void {
    const itemIndex = this.todolist.findIndex(val => val === item);
    this.todolist.splice(itemIndex, 1);
    this.todolistSrc.next([...this.todolist]);
  }

  public editItem(item: TodoItemInterface, newValue: string): void {
    item.task = newValue;
    this.todolistSrc.next([...this.todolist]);
  }
}
