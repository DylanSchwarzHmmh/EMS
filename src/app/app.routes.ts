import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { CallbackComponent } from './callback/callback.component';
import { authGuard } from './auth.guard';
import {LoginComponent} from "./login/login.component";

export const routes: Routes = [
  { path: 'dashboard', component: HomeComponent, canActivate: [authGuard] },
  { path: 'employee', component: EmployeeListComponent, canActivate: [authGuard] },
  { path: 'qualification', component: EmployeeListComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'callback', component: CallbackComponent },
  { path: '**', redirectTo: '' }
];


