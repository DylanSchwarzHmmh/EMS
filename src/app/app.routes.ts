import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employee-detail.component';
import { QualificationComponent } from './qualification/qualification.component';
//import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CallbackComponent } from './callback/callback.component';
import { authGuard } from './auth.guard';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'employee', component: EmployeeListComponent, canActivate: [authGuard] },
  { path: 'employees/new', component: EmployeeDetailComponent, canActivate: [authGuard] },
  { path: 'employees/:id', component: EmployeeDetailComponent, canActivate: [authGuard] },
  { path: 'qualification', component: QualificationComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' },
];


