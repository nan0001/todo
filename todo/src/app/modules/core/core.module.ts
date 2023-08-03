import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from '../material/material.module';
import { ItemInputComponent } from './components/item-input/item-input.component';
import { MainComponent } from './components/main/main.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoListComponent } from './components/todo-list/todo-list.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ItemInputComponent,
    MainComponent,
    TodoListComponent,
  ],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  exports: [HeaderComponent, FooterComponent, MainComponent],
})
export class CoreModule {}
