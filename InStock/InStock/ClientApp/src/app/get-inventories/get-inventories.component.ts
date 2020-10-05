import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemsService } from '../services/items.service';
import { InventoryService } from '../services/inventory.service';
import { Shops } from '../models/shop';
import { Inventory } from '../models/inventories';
@Component({
  selector: 'app-get-inventories',
  templateUrl: './get-inventories.component.html',
  styleUrls: ['./get-inventories.component.css']
})
export class GetInventoriesComponent implements OnInit {
  inventories$: Observable<Inventory[]>;

  constructor(private _inventoryService: InventoryService) {
  }

  ngOnInit() {
    this.loadInventories();
  }

  loadInventories() {
    this.inventories$ = this._inventoryService.getInventories();
  }

  delete(inventoryId) {
    const ans = confirm('Do you want to delete blog post with id: ' + inventoryId);
    if (ans) {
      this._inventoryService.deleteInventory(inventoryId).subscribe((data) => {
        this.loadInventories();
      });
    }
  }

}
