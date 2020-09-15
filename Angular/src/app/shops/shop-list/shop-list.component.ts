import { Component, OnInit } from '@angular/core';
import { Shop } from 'src/app/shared/shop.model';
import { ShopService } from 'src/app/shared/shop.service';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
export class ShopListComponent implements OnInit {

  constructor(private service: ShopService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }


  //click on datalist to shopform
  populateForm(shop: Shop){
    this.service.formData=Object.assign({},shop);
     
  }
  onDelete(id: number){
    this.service.deleteShop(id).subscribe(res=>{this.service.refreshList();})

  }

}
