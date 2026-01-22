import { Routes } from '@angular/router';
import {EmployeeListComponent} from "./employee-list/employee-list.component";

export const routes: Routes = [
  { path: 'dashboard', component: EmployeeListComponent },
  { path: 'employee', component: EmployeeListComponent },
  { path: 'qualification', component: EmployeeListComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

