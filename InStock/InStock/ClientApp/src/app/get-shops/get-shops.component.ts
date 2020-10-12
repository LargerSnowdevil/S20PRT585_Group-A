import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ShopsService } from '../services/shops.service';
import { Shops } from '../models/shop';
import { ItemsService } from '../services/items.service';
import { Items } from '../models/items';
import {  AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-get-shops',
  templateUrl: './get-shops.component.html',
  styleUrls: ['./get-shops.component.css']
})
export class GetShopsComponent implements OnInit {
  
  
  
  shops$: Observable<Shops[]>;
  zoom:number;  
  // markers=[]; 
  lat:number;
  long:number;




  constructor(private shopService: ShopsService) {
  }
  ngOnInit() {
    this.loadShops();
    this.lat=-6.914744;
    this.long=107.60981;
  //   this.shopService.getShops().subscribe((Shops) => {
  //     for(let data in Shops){
  //         this.markers.push({
  //             lat: parseFloat(data.lat),
  //             long: parseFloat(data.long),
              
  //         });
  //     }
  // }
  
  //   )
  }

  loadShops() {
    this.shops$ = this.shopService.getShops();
  }

  
  delete(shopId) {
    const ans = confirm('Do you want to delete this shop with id: ' + shopId);
    if (ans) {
      this.shopService.deleteItem(shopId).subscribe((data) => {
        this.loadShops();
      });
    }
  }
}
