import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemsService } from '../services/items.service';
import { Items } from '../models/items';
@Component({
  selector: 'app-get-items',
  templateUrl: './get-items.component.html',
  styleUrls: ['./get-items.component.css']
})
export class GetItemsComponent implements OnInit {
  items$: Observable<Items[]>;
  constructor(private itemsService: ItemsService) {
  }


  ngOnInit() {
    this.loadItemsService();
  }

  loadItemsService() {
    this.items$ = this.itemsService.getItems();
  }

}
