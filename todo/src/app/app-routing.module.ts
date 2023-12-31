import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './modules/todo/components/main/main.component';
import { TablesPageComponent } from './modules/tables/components/tables-page/tables-page.component';
import { ExpandableTableComponent } from './modules/expandable-table/components/expandable-table/expandable-table.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'todo' },
  { path: 'todo', component: MainComponent },
  { path: 'tables', component: TablesPageComponent },
  { path: 'expandable', component: ExpandableTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
