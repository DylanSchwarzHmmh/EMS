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
  Token="eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ3M2ExMTFmM2U2N2VhNjFiNDY2NjQwNzVhM2I1MjhmIiwidHlwIjoiSldUIn0.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwMDAvYXBwbGljYXRpb24vby9lbXBsb3llZV9hcGkvIiwic3ViIjoiNWFlZmEwMDJjODhhMjI5ZjM3ZWE2NWEyZTU3NTkxOGRiYzFkY2M3YTUxYjdlZjdkNDNhMWU2N2ViNzkxYzM3ZSIsImF1ZCI6ImVtcGxveWVlX2FwaV9jbGllbnQiLCJleHAiOjE3NzAxNDE2NjUsImlhdCI6MTc3MDEzODY2NSwiYXV0aF90aW1lIjoxNzcwMTM4NjY1LCJhY3IiOiJnb2F1dGhlbnRpay5pby9wcm92aWRlcnMvb2F1dGgyL2RlZmF1bHQiLCJhenAiOiJlbXBsb3llZV9hcGlfY2xpZW50IiwidWlkIjoiSTJZNlEyUDA0eE9CR3k1REQ2WFFyYWU0TVFCM0FkcnVQdjFTWHZxMCJ9.E0K4oS2jy_4qyQRuTHL1DfiI5R4pz64Q7CVGi4o9gMCW0woGchOTYS0tLft_6OR8T_FYwsQkUDnnU1SNcZ30lwOvvZOAHzj_DWZ4F1cu1s2skOCb73bWdDpEZn9cyHF0S8q_y-JaSZ9jYmbMNRX3z9iWn4gjha-4_tpS6Ll5X-9IQYSC1IYR4YMQEuwCft0aQ6nAdzB9r6MgR0sltxqUKlShGN156dJ4eVnbEtvUinwbk_-IZyEQGRtJkICO_BMaTid2PbhGNgAXB7A-BE6mxfSCgK16-_nx7Ov1X67LXrFGDmwLirYip9My995dTDOhzadCXBsI9-IY5_do0ZNrXDdk2e8_RWLataQXh3NW7PM8akjwBAHnGLHal0WAKnjXu0eXHlppoRXkgCmfb6OvEWotrLb8PF57A2wgRVcTldqNdc6rYBwcDRrjr4f6gOn99wPYGEqwFFX6VZVuqeKVdkjdTU74TuBGyFiDF1SYC3UxepDIMNcE3Ye-5QyLT55vXBl29IFm6e50Q2MtL2zXFQuvBCRfpu2uA_29Fkois1-lFtdq-JBqloqKncaEdsd86bJtD8QKrt4bI-_Zh536VDi379BWUE8g1SRIfWTWrCpiLW3DYYm0Dp2Lm-SQzGKbxmRwiqfhfafWFWq2EvymGzwHvjCdBeruVFpmHtz1SZ8";
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


