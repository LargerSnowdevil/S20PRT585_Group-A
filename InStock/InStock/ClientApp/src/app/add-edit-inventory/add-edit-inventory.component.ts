import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';  
import { Router, ActivatedRoute } from '@angular/router';
import { ShopsService } from '../services/shops.service';
import { Shops } from '../models/shop';
import { Items } from '../models/items';
import { Observable } from 'rxjs';
import { InventoryService } from '../services/inventory.service'; 
import { ItemsService } from '../services/items.service'; 
import { SingleInventory } from '../models/Single-Inventory';

@Component({
  selector: 'app-add-edit-inventory',
  templateUrl: './add-edit-inventory.component.html',
  styleUrls: ['./add-edit-inventory.component.css']
})
export class AddEditInventoryComponent implements OnInit {
  inventoryForm: FormGroup;
  shops$: Observable<Shops[]>;
  items$: Observable<Items[]>;
  title: string;
  fsku: number;
  favailable: number;
  fquantity: number;
  fshopId: number;
  fitemId: number;
  errorMessage: any;
  existingInventory: SingleInventory;
  
  private sub: any;
  constructor(private _inventoryService: InventoryService,private _itemService: ItemsService, private _shopService: ShopsService, private avRoute: ActivatedRoute, private formBuilder: FormBuilder,private _router: Router) {
    this.title="Add";
    this.inventoryForm = this.formBuilder.group({  
    sku: 0,  
    available: ['', [Validators.required]],  
    quantity: ['', [Validators.required]], 
    shopId: ['', [Validators.required]], 
    itemId: ['', [Validators.required]], 
  })   
   }
   ngOnInit() {
    this.sub = this.avRoute.params.subscribe(params => {
      this.fsku = +params['id']; 
   })
   this.shops$ = this._shopService.getShops();
   this.items$ = this._itemService.getItems();
   if (this.fsku > 0) {  
    this.title = "Edit";  
    this._inventoryService.getInventoryById(this.fsku)
    .subscribe(data => (
      this.existingInventory = data,
      this.inventoryForm.controls['available'].setValue(data.available),
      this.inventoryForm.controls['quantity'].setValue(data.quantity),
      this.inventoryForm.controls['shopId'].setValue(data.shopId),
      this.inventoryForm.controls['itemId'].setValue(data.itemId)
    ));
} 
  }
  save() {
    if (!this.inventoryForm.valid) {
      return;
    }
    if (this.title == "Add") {
      let inventory: SingleInventory = {
        available: this.inventoryForm.get('available').value,
        quantity: this.inventoryForm.get('quantity').value,
        shopId: this.inventoryForm.get('shopId').value,
        itemId: this.inventoryForm.get('itemId').value
      };
      console.log(inventory)
      this._inventoryService.addInventory(inventory)
      .subscribe((data) => {
        this._router.navigate(['/get-inventories']);
      });
     
}  

else if (this.title == "Edit") {  
  let singleInventory: SingleInventory = {
    sku: this.existingInventory.sku,
    available: this.inventoryForm.get('available').value,
    quantity: this.inventoryForm.get('quantity').value,
    shopId: this.inventoryForm.get('shopId').value,
    itemId: this.inventoryForm.get('itemId').value
    
  };

  this._inventoryService.editInventoryById(singleInventory.sku, singleInventory)
        .subscribe((data) => {
          this._router.navigate(['/get-inventories']);
        });
}  
} 
cancel() {  
  this._router.navigate(['/get-inventories']);  
}  

    get available() { return this.inventoryForm.get('available'); }
    get quantity() { return this.inventoryForm.get('quantity'); }
    get shopId() { return this.inventoryForm.get('shopId'); }
    get itemId() { return this.inventoryForm.get('itemId'); }
  
}
