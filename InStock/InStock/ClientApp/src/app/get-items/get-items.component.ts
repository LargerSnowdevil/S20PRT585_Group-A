import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemsService } from '../services/items.service';
import { Items } from '../models/items';
import { ShopsService } from '../services/shops.service';
import { Shops } from '../models/shop';

@Component({
  selector: 'app-get-items',
  templateUrl: './get-items.component.html',
  styleUrls: ['./get-items.component.css']
})
export class GetItemsComponent implements OnInit {
  items$: Observable<Items[]>;
  shops$: Observable<Shops[]>;
  constructor(private itemsService: ItemsService, private shopService: ShopsService) {
  }


  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    
    this.items$ = this.itemsService.getItems();
   
  }

  delete(itemId) {
    const ans = confirm('Do you want to delete blog post with id: ' + itemId);
    if (ans) {
      this.itemsService.deleteItem(itemId).subscribe((data) => {
        this.loadItems();
      });
    }
  }

}
