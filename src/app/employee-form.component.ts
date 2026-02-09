import { Component, effect, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormField, form, required } from '@angular/forms/signals';

import { Employee } from './employee/employee.model';

export type EmployeeFormModel = {
  firstName: string;
  lastName: string;
  street: string;
  postcode: string;
  city: string;
  phone: string;
  skillSet: number[];
};

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, FormField],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css',
})
export class EmployeeFormComponent {
  employee = input<Employee | null>(null);
  saving = input<boolean>(false);

  save = output<EmployeeFormModel>();
  cancel = output<void>();

  private model = signal<EmployeeFormModel>({
    firstName: '',
    lastName: '',
    street: '',
    postcode: '',
    city: '',
    phone: '',
    skillSet: [],
  });

  employeeForm = form(this.model, (path) => {
    required(path.firstName, { message: 'Vorname ist Pflicht.' });
    required(path.lastName, { message: 'Nachname ist Pflicht.' });
  });

  private lastLoadedId = signal<number | null>(null);

  constructor() {
    effect(() => {
      const e = this.employee();
      const currentId = e?.id ?? null;

      if (!e) {
        this.lastLoadedId.set(null);
        this.model.set({
          firstName: '',
          lastName: '',
          street: '',
          postcode: '',
          city: '',
          phone: '',
          skillSet: [],
        });
        return;
      }

      if (this.lastLoadedId() === currentId) return;
      this.lastLoadedId.set(currentId);

      this.model.set({
        firstName: e.firstName ?? '',
        lastName: e.lastName ?? '',
        street: e.street ?? '',
        postcode: e.postcode ?? '',
        city: e.city ?? '',
        phone: e.phone ?? '',
        skillSet: (e.skillSet ?? []).map((s) => s.id),
      });
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    this.employeeForm.firstName().markAsTouched();
    this.employeeForm.lastName().markAsTouched();

    if (this.employeeForm().invalid()) return;

    this.save.emit(this.model());
  }
}

