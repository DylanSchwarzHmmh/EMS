import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { EmployeeService } from './employee/employee.service';
import { Employee } from './employee/employee.model';
import { EmployeeFormComponent } from './employee-form.component';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule, EmployeeFormComponent],
  template: `
    <h1>
      {{ isEdit() ? 'Mitarbeiter bearbeiten' : 'Mitarbeiter anlegen' }}
    </h1>

    <app-employee-form
      [employee]="employee()"
      (save)="onSave()"
      (cancel)="onCancel()"
    />
  `,
})
export class EmployeeDetailComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private employeeService = inject(EmployeeService);

  employee = signal<Employee | null>(null);

  private idParam = computed(() => this.route.snapshot.paramMap.get('id'));
  isEdit = computed(() => this.idParam() !== null);

  constructor() {
    effect(() => {
      const idStr = this.idParam();

      if (!idStr) {
        this.employee.set(null);
        return;
      }

      const id = Number(idStr);
      if (Number.isNaN(id)) {
        this.router.navigate(['/employees']);
        return;
      }

      this.employeeService.getById(id).subscribe({
        next: (emp) => this.employee.set(emp),
        error: () => this.router.navigate(['/employees']),
      });
    });
  }

  onSave(): void {
    console.log('save');
  }

  onCancel(): void {
    this.router.navigate(['/employees']);
  }
}
