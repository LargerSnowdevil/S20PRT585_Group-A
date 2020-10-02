import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Email } from '../models/Email';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  constructor(private http: HttpClient) {
      this.myAppUrl = environment.appUrl;
      this.myApiUrl = 'api/Email/';
      
  }
  getEmailinfor(): Observable<Email[]> {
    return this.http.get<Email[]>(this.myAppUrl + this.myApiUrl)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }
  getEmailinforbyId(emailId: number): Observable<Email> {
    return this.http.get<Email>(this.myAppUrl + this.myApiUrl + emailId)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
}
  
// getItemBySearch(itemName: string): Observable<Items> {
//   return this.http.get<Items>(this.myAppUrl + this.myApiUrl + "search/" + itemName)
//   .pipe(
//     retry(1),
//     catchError(this.errorHandler)
//   );
// }

addEmail(email): Observable<Email> {
  return this.http.post<Email>(this.myAppUrl + this.myApiUrl, JSON.stringify(email), this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.errorHandler)
  );
}

// editItemById(itemId: number, item): Observable<Items> {
//   return this.http.put<Items>(this.myAppUrl + this.myApiUrl + itemId, JSON.stringify(item), this.httpOptions)
//   .pipe(
//     retry(1),
//     catchError(this.errorHandler)
//   );
// }
  
// deleteItem(itemId: number): Observable<Items> {
//   return this.http.delete<Items>(this.myAppUrl + this.myApiUrl + itemId)
//   .pipe(
//     retry(1),
//     catchError(this.errorHandler)
//   );
// }
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
