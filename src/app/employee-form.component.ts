import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from './employee/employee.model';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p><strong>Employee Form</strong> (Signal Forms kommen als nächstes)</p>

    @if (employee(); as e) {
      <pre>{{ e | json }}</pre>
    } @else {
      <p>Neuer Mitarbeiter</p>
    }

    <button (click)="cancel.emit()">Abbrechen</button>
    <button (click)="save.emit()">Speichern</button>
  `,
})
export class EmployeeFormComponent {
  employee = input<Employee | null>(null);

  save = output<void>();
  cancel = output<void>();
}
