import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Subscription } from 'rxjs';
import { TodoItemInterface } from '../../models/todo-item.model';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit, OnDestroy {
  @Input() isActiveList = false;

  private subscription!: Subscription;
  public todolist: TodoItemInterface[] = [];
  public listId = '';
  public secondListId: string[] = [];
  public isSortingActive = false;
  public sortOrder: 'asc' | 'desc' = 'asc';

  constructor(private todoservice: TodoService) {}

  public ngOnInit(): void {
    this.subscription = this.todoservice.todolist$.subscribe(list => {
      this.todolist = list.filter(val =>
        this.isActiveList ? val.status === 'in progress' : val.status === 'done'
      );
      this.sortItemsArray();
    });
    this.listId = this.isActiveList ? 'todoList' : 'doneList';
    this.secondListId = this.isActiveList ? ['doneList'] : ['todoList'];
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public drop(event: CdkDragDrop<TodoItemInterface[]>) {
    this.isSortingActive = false;
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.todoservice.changeItemStatus(
        event.container.data[event.currentIndex]
      );
    }
  }

  public sortItemsArray(): void {
    if (this.isSortingActive) {
      this.todolist.sort((a, b) => {
        if (this.sortOrder === 'asc') {
          return a.task.localeCompare(b.task);
        }
        return b.task.localeCompare(a.task);
      });
    }
  }

  public changeSort(): void {
    if (!this.isSortingActive) {
      this.isSortingActive = !this.isSortingActive;
      this.sortOrder = 'asc';
    } else {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    }

    this.sortItemsArray();
  }
}
