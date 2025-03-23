import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './pages/user/user.component';
import { NewUserComponent } from './pages/new-user/new-user.component';
import { UpdateUserComponent } from './pages/update-user/update-user.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'user/:idUser', component: UserComponent },
  { path: 'newuser', component: NewUserComponent },
  { path: 'updateuser/:idUser', component: UpdateUserComponent },
  { path: '**', redirectTo: 'home' },
];
