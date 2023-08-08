import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemInputComponent } from './components/item-input/item-input.component';
import { MainComponent } from './components/main/main.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { CrossDirective } from './directives/cross.directive';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    ItemInputComponent,
    MainComponent,
    TodoListComponent,
    CrossDirective,
    TodoItemComponent,
  ],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
})
export class TodoModule {}
