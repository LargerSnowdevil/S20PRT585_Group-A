import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Inventory } from '../models/inventories';
import { SingleInventory } from '../models/Single-Inventory';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  constructor(private http: HttpClient) {
      this.myAppUrl = environment.appUrl;
      this.myApiUrl = 'api/Inventories/';
      
  }

  getInventories(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.myAppUrl + this.myApiUrl)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }
  getInventoryById(inventoryId: number): Observable<Inventory> {
    return this.http.get<Inventory>(this.myAppUrl + this.myApiUrl + inventoryId)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
}


addInventory(inventory): Observable<SingleInventory> {
  return this.http.post<SingleInventory>(this.myAppUrl + this.myApiUrl, JSON.stringify(inventory), this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.errorHandler)
  );
}

editInventoryById(inventoryId: number, inventory): Observable<SingleInventory> {
  return this.http.put<SingleInventory>(this.myAppUrl + this.myApiUrl + inventoryId, JSON.stringify(inventory), this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.errorHandler)
  );
}
  
deleteInventory(inventoryId: number): Observable<Inventory> {
  return this.http.delete<Inventory>(this.myAppUrl + this.myApiUrl + inventoryId)
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
