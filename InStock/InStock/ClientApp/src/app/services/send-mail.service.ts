import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Mail } from '../models/mail';

@Injectable({
  providedIn: 'root'
})
export class SendMailService {
  myAppUrl: string;
  myApiUrl: string;
 
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/Mail/send/';
}
sendMail(formData){
  return this.http.post<any>(this.myAppUrl + this.myApiUrl, formData)
  .pipe(
    retry(1),
    catchError(this.errorHandler)
  );
}
errorHandler(error) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
  } else {
    // Get server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  console.log(errorMessage);
  return throwError(errorMessage);
}
}
