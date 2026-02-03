import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../employee/employee.service';
import { Employee } from '../employee/employee.model';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent {

  employees = signal<Employee[]>([]);

  constructor(private readonly employeeService: EmployeeService) {
    this.loadEmployees();
  }

  private loadEmployees(): void {
    this.employeeService.getAll().subscribe({
      next: (data) => this.employees.set(data),
      error: (err) => console.error(err)
    });
  }
}
