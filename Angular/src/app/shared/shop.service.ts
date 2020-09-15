import { Injectable } from '@angular/core';
import { Shop } from './shop.model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

// this part is linking VS service Post to here. passing front-end data to back-end data

export class ShopService {

  formData : Shop;
  //  shop-list
  list: Shop[];
  readonly rootURL="https://localhost:44347/api"


  constructor(private http: HttpClient) { }


  //Post correspond to VS controller's post to update
  //using HTTP client class 
  // have to use return her,otherwise subscribe will be disabled 
  postShop(formData: Shop){
    return this.http.post(this.rootURL+'/Shops',formData);
  }

  refreshList(){
    this.http.get(this.rootURL+'/Shops').toPromise().then(res => this.list=res as Shop[]);

  }
  //using ID to update data 
  //corrospands to UpdataRecord function in shop.componenet.ts
  //have to be '/shops/'    / is necessary
  putShop(formData: Shop){
    return this.http.put(this.rootURL+'/Shops/'+formData.ShopID,formData);
  }
  deleteShop(id: number){
    return this.http.delete(this.rootURL+'/Shops/'+id);

  }
}
