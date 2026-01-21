import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import {EmployeeListComponent} from "./employee-list/employee-list.component";

@Component({
    selector: 'app-root',
    imports: [EmployeeListComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lf10StarterNew';
}
