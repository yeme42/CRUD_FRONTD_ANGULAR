import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import { TableUsersComponent } from './table-users/table-users.component';

const routes: Routes = [
  { path: '', component: LayoutComponent },
  { path: 'table', component: TableUsersComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
