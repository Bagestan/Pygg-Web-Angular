import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';
import { UsersTableComponent } from './usersTable/usersTable.component';

const routes: Routes = [
  { path: '', component: UsersTableComponent },
  { path: 'form', component: UserFormComponent },
  { path: 'form/:user', component: UserFormComponent },
  { path: 'form/:user/:edit', component: UserFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
