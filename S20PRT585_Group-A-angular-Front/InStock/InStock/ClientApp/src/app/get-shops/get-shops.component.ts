import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ShopsService } from '../services/shops.service';
import { Shops } from '../models/shop';
import { ItemsService } from '../services/items.service';
import { Items } from '../models/items';

@Component({
  selector: 'app-get-shops',
  templateUrl: './get-shops.component.html',
  styleUrls: ['./get-shops.component.css']
})
export class GetShopsComponent implements OnInit {
  shops$: Observable<Shops[]>;
  items$: Observable<Items[]>;

  constructor(private shopService: ShopsService,private itemsService: ItemsService) {
  }
  ngOnInit() {
    this.loadShops();
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
