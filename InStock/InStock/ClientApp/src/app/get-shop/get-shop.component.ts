import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ShopsService } from '../services/shops.service';
import { Shops } from '../models/shop';
@Component({
  selector: 'app-get-shop',
  templateUrl: './get-shop.component.html',
  styleUrls: ['./get-shop.component.css']
})
export class GetShopComponent implements OnInit {
  shop$: Observable<Shops>;
  shopId: number;
  constructor(private shopService: ShopsService, private avRoute: ActivatedRoute) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]) {
      this.shopId = this.avRoute.snapshot.params[idParam];
    }
  }
  ngOnInit() {
    this.loadShop();
  }
  loadShop() {
    this.shop$ = this.shopService.getShopById(this.shopId);
  }

}
