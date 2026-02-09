import { Component, computed, effect, inject, signal, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { EmployeeService } from './employee/employee.service';
import { Employee } from './employee/employee.model';
import { EmployeeFormComponent, EmployeeFormModel } from './employee-form.component';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule, EmployeeFormComponent],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.css',
})
export class EmployeeDetailComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private employeeService = inject(EmployeeService);
  private destroyRef = inject(DestroyRef);

  employee = signal<Employee | null>(null);
  saving = signal(false);
  errorMessage = signal<string | null>(null);

  private idParam = signal<string | null>(null);
  isEdit = computed(() => this.idParam() !== null);

  constructor() {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((pm) => this.idParam.set(pm.get('id')));

    effect(() => {
      this.errorMessage.set(null);

      const idStr = this.idParam();

      if (!idStr) {
        this.employee.set(null);
        return;
      }

      const id = Number(idStr);
      if (Number.isNaN(id)) {
        this.errorMessage.set('Ungültige Mitarbeiter-ID.');
        this.employee.set(null);
        return;
      }

      this.employeeService.getById(id).subscribe({
        next: (emp) => this.employee.set(emp),
        error: () => {
          this.employee.set(null);
          this.errorMessage.set('Mitarbeiter konnte nicht geladen werden.');
        },
      });
    });
  }

  onSave(data: EmployeeFormModel): void {
    this.errorMessage.set(null);
    this.saving.set(true);

    const current = this.employee();

    if (!current) {
      this.employeeService.create({ ...data }).subscribe({
        next: () => this.router.navigate(['/employees']),
        error: () => {
          this.saving.set(false);
          this.errorMessage.set('Anlegen fehlgeschlagen. Bitte erneut versuchen.');
        },
      });
      return;
    }

    this.employeeService.update(current.id, { ...data }).subscribe({
      next: () => this.router.navigate(['/employees']),
      error: () => {
        this.saving.set(false);
        this.errorMessage.set('Speichern fehlgeschlagen. Bitte erneut versuchen.');
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['/employees']);
  }

  onBackToList(): void {
    this.router.navigate(['/employees']);
  }
}
