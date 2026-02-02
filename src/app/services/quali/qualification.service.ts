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
  Token = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ3M2ExMTFmM2U2N2VhNjFiNDY2NjQwNzVhM2I1MjhmIiwidHlwIjoiSldUIn0.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwMDAvYXBwbGljYXRpb24vby9lbXBsb3llZV9hcGkvIiwic3ViIjoiNWFlZmEwMDJjODhhMjI5ZjM3ZWE2NWEyZTU3NTkxOGRiYzFkY2M3YTUxYjdlZjdkNDNhMWU2N2ViNzkxYzM3ZSIsImF1ZCI6ImVtcGxveWVlX2FwaV9jbGllbnQiLCJleHAiOjE3NzAwNDcwMDUsImlhdCI6MTc3MDA0NDAwNSwiYXV0aF90aW1lIjoxNzcwMDQ0MDA1LCJhY3IiOiJnb2F1dGhlbnRpay5pby9wcm92aWRlcnMvb2F1dGgyL2RlZmF1bHQiLCJhenAiOiJlbXBsb3llZV9hcGlfY2xpZW50IiwidWlkIjoiR01XRXk0RFNoamN3UFhBSXZLMnlrbE5ZNWh3N09SNW1CUlQ2ODF6ayJ9.VP3lhd6ECVTpdo_PrB9oorOdq7TXwnQbV1G18mldq-nUpVmk79XrxnMb_fumWQsPC9cE9w2-tcJQIdr9kAbdH6jpdMvwOFyqnaEfGBmPYPFnJBO70gbZRvO5GeOUWIjJkXxHSMQIh9s6bGpHrgQkCIMNDf7a7AYfl4QblYl31FHq8Fd8tzV-Nw6anyqpFVLJcUCc1nDH8wGfKwlAGzg2YL-f7oU7AOvO5NzkTPiTTCBylGSFeeL7lZzZHcsvnQ7dFcrIs8ODuWcKvM4l6JkasQGg1Ww8iTPTkV41hpW_7ZU4s7bMdV60ajm3NhmxboNrk9TpiCjzjYZfwkPs2JDEMFOTCCahS0jp2Bdnp56XVEN9DgKyX5R5hIynAhSUniab0LRgFy7lnA_a075RtQZrbczJPfkuNOU-HC-Vdzzp2yY6Hg8Smh5OZ66oVnZS4y_Jc3pKjUWpoPfHBHC4mPpexQkPb_X2x1vNaHR78k90_0HJIYQVvvVZc7GPh0BBw54hZ_wMq1qU3xHtDUuRcjmRe48DiFzYic4ANeRfZljslGVgbH6kd-dCDHAATyHT_z4uVoH4X08vfUOlT3yHANPYoSwNFrnzS03Ws9Rp2Y7Y6eN1JVqFHLkm-uiwI7OyZJo66ydJABu2Q7taX6Nvfe2JTW6TQjAfEK1KimY82a8lGC0"
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


