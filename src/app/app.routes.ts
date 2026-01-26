import { Routes } from '@angular/router';
import {EmployeeListComponent} from "./employee-list/employee-list.component";
import {QualificationComponent} from "./qualification/qualification.component";

export const routes: Routes = [
  { path: 'dashboard', component: EmployeeListComponent },
  { path: 'employee', component: EmployeeListComponent },
  { path: 'qualification', component: QualificationComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

