import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { TodoItemInterface } from '../../models/todo-item.model';
import { TodoService } from '../../services/todo.service';

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

  private calculateDestinationXY(
    element: HTMLElement,
    targetField: HTMLElement
  ): { x: number; y: number } {
    const elemInitX = element.getClientRects()[0].x;
    const elemInitY = element.getClientRects()[0].y;

    const targetFieldCenterX = targetField.getClientRects()[0].x;
    const targetFieldCenterY =
      targetField.getClientRects()[0].y +
      targetField.getClientRects()[0].height / 2;

    const destinationX = targetFieldCenterX - elemInitX;
    const destinationY =
      targetFieldCenterY -
      elemInitY -
      element.getClientRects()[0].height +
      element.offsetTop;

    return { x: destinationX, y: destinationY };
  }

  public animateItem({
    element,
    item,
  }: {
    element: HTMLElement;
    item: TodoItemInterface;
  }): void {
    const secondList = document.getElementById(
      this.secondListId[0]
    ) as HTMLElement;
    const targetElem = element.parentElement as HTMLElement;
    let leftStart = 0;
    let topStart = targetElem.offsetTop;
    const initialY = targetElem.offsetTop;
    const { x: destinationX, y: destinationY } = this.calculateDestinationXY(
      targetElem,
      secondList
    );
    const framesCount = 30;
    const stepX = Math.abs(destinationX) / framesCount;
    const stepY = Math.abs(destinationY - initialY) / framesCount;

    const moveBox = () => {
      targetElem.style.position = 'absolute';
      targetElem.style.zIndex = '9999';
      targetElem.style.left = leftStart + 'px';
      targetElem.style.top = topStart + 'px';

      if (Math.abs(leftStart) < Math.abs(destinationX)) {
        leftStart = destinationX > 0 ? leftStart + stepX : leftStart - stepX;
      }

      if (
        (topStart < destinationY && initialY < destinationY) ||
        (topStart > destinationY && initialY > destinationY)
      ) {
        topStart =
          initialY < destinationY ? topStart + stepY : topStart - stepY;
      }

      if (
        Math.abs(leftStart) < Math.abs(destinationX) ||
        (topStart < destinationY && initialY < destinationY) ||
        (topStart > destinationY && initialY > destinationY)
      ) {
        requestAnimationFrame(moveBox);
      } else {
        this.todoservice.changeItemStatus(item);
      }
    };

    requestAnimationFrame(moveBox);
  }
}
