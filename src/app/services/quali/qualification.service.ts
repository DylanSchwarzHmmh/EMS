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
  Token="eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ3M2ExMTFmM2U2N2VhNjFiNDY2NjQwNzVhM2I1MjhmIiwidHlwIjoiSldUIn0.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwMDAvYXBwbGljYXRpb24vby9lbXBsb3llZV9hcGkvIiwic3ViIjoiNWFlZmEwMDJjODhhMjI5ZjM3ZWE2NWEyZTU3NTkxOGRiYzFkY2M3YTUxYjdlZjdkNDNhMWU2N2ViNzkxYzM3ZSIsImF1ZCI6ImVtcGxveWVlX2FwaV9jbGllbnQiLCJleHAiOjE3NzAxMzg0MjIsImlhdCI6MTc3MDEzNTQyMiwiYXV0aF90aW1lIjoxNzcwMTM1NDIyLCJhY3IiOiJnb2F1dGhlbnRpay5pby9wcm92aWRlcnMvb2F1dGgyL2RlZmF1bHQiLCJhenAiOiJlbXBsb3llZV9hcGlfY2xpZW50IiwidWlkIjoiZjcyTUJOYWhEUVlMTjRuMGUyRDhmUzN5Wk5tZGVxY1FMSzhCV2VBSSJ9.lcZaoq0BC7GZdLXJflrj6XcmlslEIGft-nOrPmVexzL99l-otmDRiI7xG_l0pLqoZyM6B5uljHwFHkWlniYaM8ZIP8yECElrXaMqwaBi8nlJ6aXqBmDkCaxw9flo6uxJW4bTGcE9VzvR3_UhZJ3qfOcPLPrvl2UnMZ9yeNJ_OMRQuRs6xxW27mwsL0Ngmdk6DvpoAIc1ufb5cTfm0h2kUE_Fw5REwq3aDfh3sS_nWz_a17o4jd1C5LKScBLWLq-ioDolFLAePeyIJEuT49lcg-BseL_z8Jeg0hNdddzjFQfvaGnn9ALR_5STtWLqKVVVzXrqgac8uOOyDhIx91bDn66wE_xL1i02YvW2RgOdNfPCygmhu8IN-oGO0_HegF2LYfwYYWYroaCpMG7-viBfY-8TPE_K7bR36Sd0cMOSt0LLRqwqN8agZD8oWUL4vUQgZWt38-EtWZ5dvriykPLiJy4GZ4nqqCoGsY2OkMezGctW62z3gPF6m951OX-ctPHn8wBcY_oMpvgVXhlQChitLUBYI6SAOtHtN4JmmdyW4QlC5KXqyVTiW1mRBS5NVhU_rSJLkERxxtMOxd8MIQT2hjbio0BEQsT_7myXYdKyYU6bqMPw8y0TLpmhvGBS30WZpQ2WzIn6q1eL6MmFTXndWpnU-0YgnL5YkBqaDButLmc"
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


