import { Component, computed, effect, inject, signal, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { EmployeeService } from './employee/employee.service';
import { Employee } from './employee/employee.model';
import { EmployeeFormComponent, EmployeeFormModel } from './employee-form.component';

import { QualificationService } from './services/quali/qualification.service';
import { Qualification } from './services/quali/qualification.model';

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
  private qualificationService = inject(QualificationService);
  private destroyRef = inject(DestroyRef);

  employee = signal<Employee | null>(null);
  saving = signal(false);
  errorMessage = signal<string | null>(null);

  qualifications = signal<Qualification[]>([]);
  selectedQualificationId = signal<number | null>(null);
  skillSaving = signal(false);
  skillError = signal<string | null>(null);

  private idParam = signal<string | null>(null);
  isEdit = computed(() => this.idParam() !== null);

  private currentSkillIds = computed(() => new Set((this.employee()?.skillSet ?? []).map(s => s.id)));

  availableQualifications = computed(() =>
    this.qualifications().filter(q => !this.currentSkillIds().has(q.id))
  );

  constructor() {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((pm) => this.idParam.set(pm.get('id')));

    // einmal Qualis laden (für Dropdown)
    this.qualificationService.getQualifications().subscribe({
      next: (qs) => this.qualifications.set(qs),
      error: () => this.skillError.set('Qualifikationen konnten nicht geladen werden.'),
    });

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
        next: (emp) => {
          this.employee.set(emp);
          this.skillError.set(null);
          this.selectedQualificationId.set(null);
        },
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

  onSelectQualification(event: Event): void {
    const target = event.target as HTMLSelectElement | null;
    const value = target?.value ?? '';
    const id = Number(value);
    this.selectedQualificationId.set(Number.isNaN(id) ? null : id);
  }

  addSelectedQualification(): void {
    const emp = this.employee();
    const qualificationId = this.selectedQualificationId();

    this.skillError.set(null);

    if (!emp) {
      this.skillError.set('Kein Mitarbeiter geladen.');
      return;
    }
    if (!qualificationId) {
      this.skillError.set('Bitte eine Qualifikation auswählen.');
      return;
    }

    this.skillSaving.set(true);

    const q = this.qualifications().find(x => x.id === qualificationId);
    const prev = emp.skillSet;

    this.employee.set({
      ...emp,
      skillSet: q ? [...prev, { id: q.id, skill: q.skill }] : prev,
    });

    this.employeeService.addQualification(emp.id, qualificationId).subscribe({
      next: (updated) => {
        this.employee.set(updated);
        this.selectedQualificationId.set(null);
        this.skillSaving.set(false);
      },
      error: () => {
        this.employee.set({ ...emp, skillSet: prev });
        this.skillSaving.set(false);
        this.skillError.set('Qualifikation konnte nicht hinzugefügt werden.');
      },
    });
  }

  removeQualification(qualificationId: number): void {
    const emp = this.employee();
    if (!emp) return;

    this.skillError.set(null);
    this.skillSaving.set(true);

    const prev = emp.skillSet;
    this.employee.set({
      ...emp,
      skillSet: prev.filter(s => s.id !== qualificationId),
    });

    this.employeeService.removeQualification(emp.id, qualificationId).subscribe({
      next: (updated) => {
        this.employee.set(updated);
        this.skillSaving.set(false);
      },
      error: () => {
        this.employee.set({ ...emp, skillSet: prev });
        this.skillSaving.set(false);
        this.skillError.set('Qualifikation konnte nicht entfernt werden.');
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
