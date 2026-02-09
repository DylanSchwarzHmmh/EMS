import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Employee } from "../Employee";
import { AuthService } from "../services/auth.service";

@Component({
    selector: 'app-employee-list',
    imports: [CommonModule],
    templateUrl: './employee-list.component.html',
    styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  bearer = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjNiNGNmZDM2MjMwZGM3ZTE1YjQ4Yzg3YjRkOTQ4ZmEwIiwidHlwIjoiSldUIn0.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwMDAvYXBwbGljYXRpb24vby9lbXBsb3llZV9hcGkvIiwic3ViIjoiZTgyNjBkZGY1NjY3MzZmY2FhNTE1Nzg3ZmFhYWRiNTAxZWMxOGRiYWFjMjZhNzQ4MjZiMjFmMzlmNjBkNWExZSIsImF1ZCI6ImVtcGxveWVlX2FwaV9jbGllbnQiLCJleHAiOjE3Njk2MDE3ODAsImlhdCI6MTc2OTU5ODc4MCwiYXV0aF90aW1lIjoxNzY5NTk4NzgwLCJhY3IiOiJnb2F1dGhlbnRpay5pby9wcm92aWRlcnMvb2F1dGgyL2RlZmF1bHQiLCJhenAiOiJlbXBsb3llZV9hcGlfY2xpZW50IiwidWlkIjoidW5xQ3ZVSlFyQThyVHZiMTdneGt2RTdOQWVzd20weXNDcDlLaGpoVyJ9.QepT2rOwzi6P5Dp9nkpIUEDEBsMK6JGqXXIyJ_w3hW_S6Q2o_UhP2hUsljj4OXovr9GWBR4mFM9w-EcqBNjNeWN3N44qSJwsKnOKtbQuF41Agrg55DIUS_kdQ07U6VcU7lkV60ZrNHX64_THN3W5dboRxAzo00R9cEUcR0jnlRoX6x--wFfNu8L9IrqdOECYVhaZRxSo9MyEwRBMXmlUC9yxNYyGPnDbVh07ba3PLyMyDPa-e2pIHJFbyNr0mX495Ng9NqJiLJtlgi98Zh3buaVDSdp1xSgreKkwKLbYQQfSOJ6R9PRb_c-2MJEscYZYw9Qz79wrbL_se7fB5EZx8InuG9_cRjN1fLetu0MZnmFmS8jFPh_ndVEYzQsnLLhU8DGt5gXCNVcUdYrVt-42riRjMrvcHbtVf-B_ZSUKL7R6fh5fYFdVjB5hR6gB__0uQUiaJkrLKNZp0fGqfLjMc9YJIOMW_j2wZ3EB4Wzrm1HENrWU3s_NjKqc3EM8cbWcaURp-tyg0zPIvIZ9FatiVcMlNmhIQlK79LAUkAga90nT-gnG9EdtFqh5tfaf-mjbv6xpaun77twPPLOch2s5eyLamhs_D-YkqJd-SHkFLGBgkqjBO8GrwqgJUMdF3MlcwgMIEgtFWxE0GwSvqF0j5M3SxcAlTqzml0cugJkp_l8';
  employees$: Observable<Employee[]>;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.employees$ = of([]);
    this.fetchData();
  }

  fetchData() {
    const token = this.authService.getAccessToken();
    this.employees$ = this.http.get<Employee[]>('http://localhost:8089/employees', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
    });
  }
}
