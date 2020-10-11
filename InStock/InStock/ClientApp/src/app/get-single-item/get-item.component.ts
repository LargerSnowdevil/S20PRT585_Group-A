import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ItemsService } from '../services/items.service';
import { Items } from '../models/items';
import { DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-get-item',
  templateUrl: './get-item.component.html',
  styleUrls: ['./get-item.component.css']
})
export class GetItemComponent implements OnInit {
  item$: Observable<Items>;
  imgData: SafeResourceUrl;
  itemId: number;
  constructor(private _itemService: ItemsService, private avRoute: ActivatedRoute, private sanitizer: DomSanitizer) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]) {
      this.itemId = this.avRoute.snapshot.params[idParam];
    }

    this.imgData = '';
  }

  ngOnInit() {
    this.loadItem();
  }
  loadItem() {
   
  this.item$ = this._itemService.getItemById(this.itemId);
  
 

  
  }

}
