import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';  
import { Router, ActivatedRoute } from '@angular/router';
import { ShopsService } from '../services/shops.service';
import { Shops } from '../models/shop';
@Component({
  selector: 'app-add-edit-shops',
  templateUrl: './add-edit-shops.component.html',
  styleUrls: ['./add-edit-shops.component.css']
})
export class AddEditShopsComponent implements OnInit {
  shopForm: FormGroup;
  title: string;
  fshopId: number;
  fname:string;
  errorMessage: any;
  existingShop :Shops;
  private sub: any;
  constructor(private shopService: ShopsService, private avRoute: ActivatedRoute, private formBuilder: FormBuilder,private _router: Router) {
    this.title="Add";
  this.fname="name";
  this.shopForm = this.formBuilder.group({  
    shopId: 0,  
    name: ['', [Validators.required]],  
  })   
   }
  
  ngOnInit() {
    this.sub = this.avRoute.params.subscribe(params => {
      this.fshopId = +params['id']; 
   })

   if (this.fshopId > 0) {  
    this.title = "Edit";  
    this.shopService.getShopById(this.fshopId)
    .subscribe(data => (
      this.existingShop = data,
      this.shopForm.controls['name'].setValue(data.name)
    ));
} 
  }

  save() {
    if (!this.shopForm.valid) {
      return;
    }
    if (this.title == "Add") {
      let shop: Shops = {
        name: this.shopForm.get('name').value,
     
      };
      //console.log(shop)
      this.shopService.addShop(shop)
      .subscribe((data) => {
        this._router.navigate(['/get-shops']);
      });
     
}  

else if (this.title == "Edit") {  
  let shop: Shops = {
    shopId: this.existingShop.shopId,
    name: this.shopForm.get('name').value, 
  };
  console.log(shop)
  this.shopService.editShopById(shop.shopId, shop)
        .subscribe((data) => {
          this._router.navigate(['/get-shops']);
        });
}  
} 
cancel() {  
  this._router.navigate(['/get-shops']);  
}  

get name() { return this.shopForm.get('name'); }

}
