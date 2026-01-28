import {inject, Injectable} from '@angular/core';
import {Qualification} from "./qualification.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QualificationService {
  constructor() { }

  private qualifications: Qualification[] = [];
  private http= inject(HttpClient);
  Token = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ3M2ExMTFmM2U2N2VhNjFiNDY2NjQwNzVhM2I1MjhmIiwidHlwIjoiSldUIn0.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwMDAvYXBwbGljYXRpb24vby9lbXBsb3llZV9hcGkvIiwic3ViIjoiNWFlZmEwMDJjODhhMjI5ZjM3ZWE2NWEyZTU3NTkxOGRiYzFkY2M3YTUxYjdlZjdkNDNhMWU2N2ViNzkxYzM3ZSIsImF1ZCI6ImVtcGxveWVlX2FwaV9jbGllbnQiLCJleHAiOjE3Njk1OTQ3NDcsImlhdCI6MTc2OTU5MTc0NywiYXV0aF90aW1lIjoxNzY5NTkxNzQ3LCJhY3IiOiJnb2F1dGhlbnRpay5pby9wcm92aWRlcnMvb2F1dGgyL2RlZmF1bHQiLCJhenAiOiJlbXBsb3llZV9hcGlfY2xpZW50IiwidWlkIjoibDRWWHhYNEpLMkwzcnYyeE92N3RabTgzSTRXN2oyWGNzUHlEbU5QZCJ9.zVWfrhtQt7H5Y6bql26qFDsCih0EFRQJFGGTFHW4nps6ol4bEvvi6cOptzfY7qGys22AJUhFpwazHR-zu78HJP9jthYjNlLhVYR23AdlST5uXbURh6SAa6DmG16kxZlzOJAg1APHZ3NgQ525Dhm5O9ok-iFC0_aAta5aZhM2-SG8BV8xNAYdOX4HboBnK9revv0OmK0PsBpKggHNzK_NJwBOoM7CmGrmzio9O3Ss4hE1jgKUXSImVd4lHHEXMR2_2ULG1gex_AM_OXNBIqRovr7STYVAxc9NGpOVYgN7GmlAIkCX8sHRDkpK3EGApFAC0GnLF9aE_aLUes5uK4IBnsO9mhnTQq1YGJ5UsFldYTE-B1bkQQptIwKMCWI9WsbL_Z_lqGO4y19OgmmpPv0Ldo9ORuqk_dV-7chpmyLFtheH0XCalke00onVFneTPCjEYEnRwzHd7Sc4jKyJZ2I2yAMw5OFnuweN3P0e8POltknAp42RWNtwXOykNxnZaLG_PYLm15fT4d-j7ZPQ-m53gV8EiCm1zs0cos8AZ9-eCbub1n8TysEE88UvAhxM-fSgX5TTWaCq8ldJ_kA_-818H5w4ih-THMV7_vqEEpC-VWvxIVgZoZVLKsGqU0KgFrdS3z4upElT0ILPTUoqoA6BtTqL615zr2112-Gd12MeL6o"
  private apiUrl = 'http://localhost:8089/'

  getQualifications(): Observable<Qualification[]>{

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.Token}`})

  return this.http.get<Qualification[]>(this.apiUrl + "qualifications", { headers: headers });
  }

  postQualifications(name:string){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.Token}`})

    return this.http.post(this.apiUrl + "qualifications",{skill: name},{ headers: headers })
  }

  deleteQualifications(id: number){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.Token}`})

    return this.http.delete(this.apiUrl + "qualifications/" + id ,{ headers: headers })
  }

  putQualifications(id: number, name: string){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.Token}`})

    return this.http.put(this.apiUrl + "qualifications/"+ id,{skill: name},{ headers: headers })
  }
}


