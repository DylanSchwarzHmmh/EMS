import { Routes } from '@angular/router';
import {EmployeeListComponent} from "./employee-list/employee-list.component";
import {QualificationComponent} from "./qualification/qualification.component";
import { HomeComponent } from './home/home.component';
import { CallbackComponent } from './callback/callback.component';
import { authGuard } from './auth.guard';
import {DashboardComponent} from "./dashboard/dashboard.component";

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'employee', component: EmployeeListComponent },
  { path: 'qualification', component: QualificationComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'employees', component: EmployeeListComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
