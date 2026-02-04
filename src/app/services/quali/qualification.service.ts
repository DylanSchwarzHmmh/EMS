import {inject, Injectable} from '@angular/core';
import {Qualification} from "./qualification.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class QualificationService {
  constructor() { }

  private qualifications: Qualification[] = [];
  private http= inject(HttpClient);
  private Token = environment.apiToken;
  private apiUrl = environment.apiUrl;

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


