import {Component, inject} from '@angular/core';

import { RouterOutlet } from '@angular/router';
import {EmployeeListComponent} from "./employee-list/employee-list.component";
import {NavComponent} from "./nav/nav.component";
import {CommonModule} from "@angular/common";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, EmployeeListComponent, NavComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lf10StarterNew';

  private authService = inject(AuthService);

  isAuthenticated = this.authService.isAuthenticated;
}
