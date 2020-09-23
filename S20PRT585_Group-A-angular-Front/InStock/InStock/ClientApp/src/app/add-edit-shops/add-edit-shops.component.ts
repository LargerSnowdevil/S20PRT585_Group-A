import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';  
import { Router, ActivatedRoute } from '@angular/router';
import { ShopsService } from '../services/shops.service';
import { Shops } from '../models/shop';
import { Items } from '../models/items';
import { Observable } from 'rxjs';
import { ItemsService } from '../services/items.service'; 
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
  fcontactNumber:string;
  faddress:string;
  flat:number;
  flong:number;
  fid:number;
  errorMessage: any;
  existingShop :Shops;
  items$: Observable<Items[]>;
  private sub: any;
  constructor(private shopService: ShopsService, private _itemService: ItemsService, private avRoute: ActivatedRoute, private formBuilder: FormBuilder,private _router: Router) {
    this.title="Add";
    this.fname=" ";
    this.fid=0;
    this.fcontactNumber=" "
    this.faddress=" "
    this.flat=0;
    this.flong=0;

    this.shopForm = this.formBuilder.group({  
    shopId: 0,  
    name: ['', [Validators.required]],  
    id: ['', [Validators.required]],
    contactNumber:['', [Validators.required]],
    address:['', [Validators.required]],
    lat:['', [Validators.required]],
    long:['', [Validators.required]],
    
  })   
   }
  
  ngOnInit() {
    this.sub = this.avRoute.params.subscribe(params => {
      this.fshopId = +params['id']; 
   })
   this.items$ = this._itemService.getItems();
   if (this.fshopId > 0) {  
    this.title = "Edit";  
    this.shopService.getShopById(this.fshopId)
    .subscribe(data => (
      this.existingShop = data,
      this.shopForm.controls['name'].setValue(data.name),
      this.shopForm.controls['contactNumber'].setValue(data.contactNumber),
      this.shopForm.controls['address'].setValue(data.address),
      this.shopForm.controls['long'].setValue(data.long),
      this.shopForm.controls['lat'].setValue(data.lat)

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
        contactNumber: this.shopForm.get('contactNumber').value,
        address: this.shopForm.get('address').value,
        long: this.shopForm.get('long').value,
        lat: this.shopForm.get('lat').value,
        item: {
          id: this.shopForm.get('id').value
        }
     
      };
      console.log(shop)
      this.shopService.addShop(shop)
      .subscribe((data) => {
        this._router.navigate(['/get-shops']);
      });
     
}  

else if (this.title == "Edit") {  
  let shop: Shops = {
    shopId: this.existingShop.shopId,
    name: this.shopForm.get('name').value, 
    address: this.shopForm.get('address').value,
    contactNumber: this.shopForm.get('contactNumber').value,
    lat: this.shopForm.get('lat').value,
    long: this.shopForm.get('long').value,
    item: {
      id: this.shopForm.get('id').value
    }
  };
  //console.log(shop)
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
    get id() { return this.shopForm.get('id'); }
    get address() { return this.shopForm.get('address'); }
    get contactNumber() { return this.shopForm.get('contactNumber'); }
    get lat() { return this.shopForm.get('lat'); }
    get long() { return this.shopForm.get('long'); }
}


