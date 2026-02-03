import {Component, computed, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../employee/employee.service';
import { Employee } from '../employee/employee.model';
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent {
  employees = signal<Employee[]>([]);

  filterFirstName = signal('');
  filterLastName = signal('');
  filterCity = signal('');
  filterQualification = signal('');

  constructor(private readonly employeeService: EmployeeService) {
    this.loadEmployees();
  }

  private loadEmployees(): void {
    this.employeeService.getAll().subscribe({
      next: (data) => this.employees.set(data),
      error: (err) => console.error(err),
    });
  }

  clearFilters(): void {
    this.filterFirstName.set('');
    this.filterLastName.set('');
    this.filterCity.set('');
    this.filterQualification.set('');
  }

  filteredEmployees = computed(() => {
    const fn = this.filterFirstName().trim().toLowerCase();
    const ln = this.filterLastName().trim().toLowerCase();
    const city = this.filterCity().trim().toLowerCase();
    const qual = this.filterQualification().trim().toLowerCase();

    return this.employees().filter(e => {
      const matchesFirst = !fn || e.firstName.toLowerCase().includes(fn);
      const matchesLast = !ln || e.lastName.toLowerCase().includes(ln);
      const matchesCity = !city || e.city.toLowerCase().includes(city);

      // Swagger bestätigt: skillSet: [{ id, skill }]
      const matchesQual =
        !qual ||
        (e.skillSet ?? []).some(s =>
          (s.skill ?? '').toLowerCase().includes(qual) || String(s.id) === qual
        );

      return matchesFirst && matchesLast && matchesCity && matchesQual;
    });
  });

}
