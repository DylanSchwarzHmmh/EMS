import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee, CreateEmployee, UpdateEmployee } from './employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private readonly baseUrl = 'https://employee-api.szut.dev';

  private readonly endpoint = '/employees';

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}${this.endpoint}`);
  }

  getById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}${this.endpoint}/${id}`);
  }

  create(payload: CreateEmployee): Observable<Employee> {
    return this.http.post<Employee>(`${this.baseUrl}${this.endpoint}`, payload);
  }

  update(id: number, payload: UpdateEmployee): Observable<Employee> {
    return this.http.patch<Employee>(`${this.baseUrl}${this.endpoint}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${this.endpoint}/${id}`);
  }

  addQualification(employeeId: number, qualificationId: number): Observable<Employee> {
    return this.http.post<Employee>(
      `${this.baseUrl}${this.endpoint}/${employeeId}/qualifications`,
      { qualificationId }
    );
  }

  removeQualification(employeeId: number, qualificationId: number): Observable<Employee> {
    return this.http.delete<Employee>(
      `${this.baseUrl}${this.endpoint}/${employeeId}/qualifications/${qualificationId}`
    );
  }
}
