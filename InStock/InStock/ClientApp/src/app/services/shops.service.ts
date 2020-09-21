import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Shops } from '../models/shop';

@Injectable({
  providedIn: 'root'
})

export class ShopsService {
  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/Shops/';
}
getShops(): Observable<Shops[]> {
  return this.http.get<Shops[]>(this.myAppUrl + this.myApiUrl)
  .pipe(
    retry(1),
    catchError(this.errorHandler)
  );
}

addShop(shop): Observable<Shops> {
return this.http.post<Shops>(this.myAppUrl + this.myApiUrl, JSON.stringify(shop), this.httpOptions)
.pipe(
  retry(1),
  catchError(this.errorHandler)
);
}

editShopById(shopId: number, shop): Observable<Shops> {
return this.http.put<Shops>(this.myAppUrl + this.myApiUrl + shopId, JSON.stringify(shop), this.httpOptions)
.pipe(
  retry(1),
  catchError(this.errorHandler)
);
}

deleteItem(shopId: number): Observable<Shops> {
return this.http.delete<Shops>(this.myAppUrl + this.myApiUrl + shopId)
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
