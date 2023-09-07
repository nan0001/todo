import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './modules/core/core.module';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from './modules/material/material.module';
import { TodoModule } from './modules/todo/todo.module';
import { TablesModule } from './modules/tables/tables.module';
import { ExpandableTableModule } from './modules/expandable-table/expandable-table.module';
import { AnimationsModule } from './modules/animations/animations.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    StoreModule.forRoot({}, {}),
    MaterialModule,
    TodoModule,
    TablesModule,
    ExpandableTableModule,
    AnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
