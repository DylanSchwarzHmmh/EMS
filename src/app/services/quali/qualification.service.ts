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
  Token = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ3M2ExMTFmM2U2N2VhNjFiNDY2NjQwNzVhM2I1MjhmIiwidHlwIjoiSldUIn0.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwMDAvYXBwbGljYXRpb24vby9lbXBsb3llZV9hcGkvIiwic3ViIjoiNWFlZmEwMDJjODhhMjI5ZjM3ZWE2NWEyZTU3NTkxOGRiYzFkY2M3YTUxYjdlZjdkNDNhMWU2N2ViNzkxYzM3ZSIsImF1ZCI6ImVtcGxveWVlX2FwaV9jbGllbnQiLCJleHAiOjE3Njk0Mzc0MjYsImlhdCI6MTc2OTQzNDQyNiwiYXV0aF90aW1lIjoxNzY5NDM0NDI2LCJhY3IiOiJnb2F1dGhlbnRpay5pby9wcm92aWRlcnMvb2F1dGgyL2RlZmF1bHQiLCJhenAiOiJlbXBsb3llZV9hcGlfY2xpZW50IiwidWlkIjoid3pOSzVOT00yR1hXV2J6VkViMU1YYzY4bEJwdjQ4WFdWQTdnYkhPZyJ9.1-NWpMHFzXz3lnDB6tGD4gedjkCgw8Y7wKm8B9mGbSoqX0hMhB5WW19FU9h8l2gVSJACy12wgfMo5pSGdcoJjO_-6DI2uDOOg0ZyqwJOxfrXzOdcF9ysO_b0J0p92dhwlbhz5oT-S8q5BULucAwnGB03b30O1ZCeZNIWv2_-876dIW26Ic10FHxo4jBrQ0RIJPweGmv0gnExOucZv5NEk2IzGAg-OzYK5vZzMPMudR0FhwGzhkNozj8plHiBDhdR-V3XaqdHX6mnQcGnD-FPQXeeZmIV_fP-t-DTgCKEW9CI2tb28GZP2wuzx57OrrQO1Wsi9oYhsE62LtP2Dhu4zeerkM0QcBDct-fhdO93FxuK9_9CSQ3OZq6jRxA5AFHRwDHMDxOsE_krG9wHg8xVYwEzPCCBDvDqiBiDKVtgfmViHMxNTj_QUl2KTSlnxOj_d_FEYyGLi2hHWMMK2VDV-amsZcqIHZA-mMe_glDx3_fSsCISIrIjMpKuwK5kaxwQq3IPbTR3caGQ217rRCxiYhu4wRsTQ6TxcZswz2WbMITmARzhR0bGr65KSn8B7uP5oFefsq_X7W94BAYhlHvc0ALGYG4SLmZB-NzrxCTGo6P6c6mv7mLVcLPQ_XCwpApkw7eGbVE0yTN8ziXNL1syg_cCXHH3uvGVJ5OpSUVaebk"
  private apiUrl = 'http://localhost:8089/'

  getQualifications(): Observable<Qualification[]>{

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.Token}`})

  return this.http.get<Qualification[]>(this.apiUrl + "qualifications", { headers: headers });
  }
}


