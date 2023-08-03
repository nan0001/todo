import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Subscription } from 'rxjs';
import { TodoItemInterface } from '../../models/todo-item.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  public todolist: TodoItemInterface[] = [];

  constructor(private todoservice: TodoService) {}

  public ngOnInit(): void {
    this.subscription = this.todoservice.todolist$.subscribe(list => {
      this.todolist = list;
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public changeItemStatus(item: TodoItemInterface): void {
    this.todoservice.changeItemStatus(item);
  }
}
