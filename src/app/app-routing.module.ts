import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserResolver } from './main/service/user.resolver';
import { UserDetailsComponent } from './main/user-details/user-details.component';
import { UsersComponent } from './main/users/users.component';

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'users/:userId',
    component: UserDetailsComponent,
    resolve: {resolvedResponse: UserResolver }
  },
  {
    path: '**',
    redirectTo: 'users'
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
