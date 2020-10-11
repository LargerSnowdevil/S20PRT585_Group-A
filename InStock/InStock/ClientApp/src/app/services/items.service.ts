import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Items } from '../models/items';
import { Item } from '../models/items';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  constructor(private http: HttpClient) {
      this.myAppUrl = environment.appUrl;
      this.myApiUrl = 'api/Items/';
      
  }
  getItems(): Observable<Items[]> {
    return this.http.get<Items[]>(this.myAppUrl + this.myApiUrl)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }
  getItemById(itemId: number): Observable<Item> {
    return this.http.get<Item>(this.myAppUrl + this.myApiUrl + itemId)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
}


addItem(item) : Observable<Items> {
  return this.http.post<Items>(this.myAppUrl + this.myApiUrl, JSON.stringify(item), this.httpOptions);
}

editItemById(itemId: number, formdata) {
  return this.http.put<any>(this.myAppUrl + this.myApiUrl + itemId, formdata)
  .pipe(
    retry(1),
    catchError(this.errorHandler)
  );
}
  
deleteItem(itemId: number): Observable<Items> {
  return this.http.delete<Items>(this.myAppUrl + this.myApiUrl + itemId)
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
