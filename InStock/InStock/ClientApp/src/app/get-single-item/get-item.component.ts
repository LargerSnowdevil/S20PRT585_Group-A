import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ItemsService } from '../services/items.service';
import { Items } from '../models/items';

@Component({
  selector: 'app-get-item',
  templateUrl: './get-item.component.html',
  styleUrls: ['./get-item.component.css']
})
export class GetItemComponent implements OnInit {
  item$: Observable<Items>;
  itemId: number;
  constructor(private _itemService: ItemsService, private avRoute: ActivatedRoute) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]) {
      this.itemId = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit() {
    this.loadItem();
  }
  loadItem() {
    this.item$ = this._itemService.getItemById(this.itemId);
  }

}
