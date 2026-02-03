import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { CallbackComponent } from './callback/callback.component';
import { authGuard } from './auth.guard';
import { EmployeeDetailComponent } from './employee-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'employees/new', component: EmployeeDetailComponent, canActivate: [authGuard]},
  { path: 'employees/:id', component: EmployeeDetailComponent, canActivate: [authGuard]},
  { path: 'employees', component: EmployeeListComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
