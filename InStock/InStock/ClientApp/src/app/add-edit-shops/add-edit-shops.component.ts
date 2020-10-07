import { Component, ElementRef, OnInit, ViewChild,NgZone } from '@angular/core';
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
  latitude: number;
  longitude: number;
  zoom:number;
  locationChosen = false;
 

  shopForm: FormGroup;
  title: string;
  fshopId: number;
  fname:string;
  fcontactNumber:string;
  faddress:string;
  flat:number;
  flong:number;
  errorMessage: any;
  existingShop :Shops;
  // @ViewChild('search',{ static: false })
  // public searchElementRef: ElementRef;
  onChoseLocation(event) {
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
    this.locationChosen = true;
    console.log(event);
   
    
  }
  
  
  

  private sub: any;
  constructor(private shopService: ShopsService, private _itemService: ItemsService, private avRoute: ActivatedRoute, private formBuilder: FormBuilder,private _router: Router) {
    this.title="Add";
    this.fname=" ";
    this.fcontactNumber=" "
    this.faddress=" "
    this.flong=this.longitude;
    this.flat=this.latitude;

    this.shopForm = this.formBuilder.group({  
    shopId: 0,  
    name: ['', [Validators.required]],  
    contactNumber:['', [Validators.required]],
    address:['', [Validators.required]],
    // lat:this.latitude,
    // long:this.longitude,
    latitude:this.latitude,
    longitude:this.longitude
    // lat:['', ],
    // long:['', ],
    
  })   
   }
  
  ngOnInit() {
     //load Places Autocomplete
     this.setCurrentLocation();


    this.sub = this.avRoute.params.subscribe(params => {
      this.fshopId = +params['id']; 
   })
  
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
  // current location
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
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
        // long: this.shopForm.get('long').value,
        // lat: this.shopForm.get('lat').value,
        long: this.shopForm.get('longitude').value,
        lat: this.shopForm.get('latitude').value,
        
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
    get address() { return this.shopForm.get('address'); }
    get contactNumber() { return this.shopForm.get('contactNumber'); }
    get lat() { return this.shopForm.get('lat'); }
    get long() { return this.shopForm.get('long'); }
}


