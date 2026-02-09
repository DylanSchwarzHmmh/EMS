import { Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { QualificationComponent } from './qualification/qualification.component';
import { HomeComponent } from './home/home.component';
import { CallbackComponent } from './callback/callback.component';
import { authGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { EmployeeDetailComponent } from './employee-detail.component';

export const routes: Routes = [
  { path: 'dashboard', component: HomeComponent, canActivate: [authGuard] },
  { path: 'employee', component: EmployeeListComponent, canActivate: [authGuard] },
  { path: 'employees/new', component: EmployeeDetailComponent, canActivate: [authGuard] },
  { path: 'employees/:id', component: EmployeeDetailComponent, canActivate: [authGuard] },

  { path: 'qualification', component: QualificationComponent, canActivate: [authGuard] },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'callback', component: CallbackComponent },

  { path: '**', redirectTo: '' },
];


