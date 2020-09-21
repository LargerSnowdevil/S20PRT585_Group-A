import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';  
import { Router, ActivatedRoute } from '@angular/router';
import { ItemsService } from '../services/items.service';  
import { Items } from '../models/items';
@Component({
  selector: 'app-add-edit-items',
  templateUrl: './add-edit-items.component.html',
  styleUrls: ['./add-edit-items.component.css']
})
export class AddEditItemsComponent implements OnInit {
  itemForm: FormGroup;
  title: string;
  id: number;
  fname:string;
  fsku:number;
  fprice:number;
  finStock:string;
  fquantity:number;
  errorMessage: any;
  existingItem :Items;
  
  private sub: any;
  constructor(private _itemService: ItemsService, private avRoute: ActivatedRoute, private formBuilder: FormBuilder,private _router: Router) {
    this.title="Add";
    this.fname="name";
    this.fsku=0;
    this.fprice=0;
    this.finStock='false';
    this.fquantity=0;
   
    this.itemForm = this.formBuilder.group({  
      id: 0,  
      name: ['', [Validators.required]],  
      sku: ['', [Validators.required]],  
      price: ['', [Validators.required]],  
      inStock: ['', [Validators.required]],  
      quantity: ['', [Validators.required]]  
  })   
    }

  ngOnInit() {
    this.sub = this.avRoute.params.subscribe(params => {
      this.id = +params['id']; 
   });

    if (this.id > 0) {  
      this.title = "Edit";  
      this._itemService.getItemById(this.id)
      .subscribe(data => (
        this.existingItem = data,
        this.itemForm.controls['name'].setValue(data.name),
        this.itemForm.controls['sku'].setValue(data.sku),
        this.itemForm.controls['price'].setValue(data.price),
         this.itemForm.controls['inStock'].setValue(data.inStock),
        this.itemForm.controls['quantity'].setValue(data.quantity)
      ));
} 
  }  
  

  save() {
    if (!this.itemForm.valid) {
      return;
    }
    if (this.title == "Add") {
      let item: Items = {
        name: this.itemForm.get('name').value,
        sku: this.itemForm.get('sku').value,
        price: this.itemForm.get('price').value,
        inStock: this.itemForm.get('inStock').value,
        quantity: this.itemForm.get('quantity').value,
      };
      console.log(item)
      this._itemService.addItem(item)
      .subscribe((data) => {
        this._router.navigate(['/get-items']);
      });
     
}  

else if (this.title == "Edit") {  
  let item: Items = {
    id: this.existingItem.id,
    name: this.itemForm.get('name').value,
    sku: this.itemForm.get('sku').value,
    price: this.itemForm.get('price').value,
    inStock: this.itemForm.get('inStock').value,
    quantity: this.itemForm.get('quantity').value,
  };
  console.log(item)
  this._itemService.editItemById(item.id, item)
        .subscribe((data) => {
          this._router.navigate(['/get-items']);
        });
}  
} 

  
cancel() {  
        this._router.navigate(['/get-items']);  
    }  
  
    get name() { return this.itemForm.get('name'); }
    get sku() { return this.itemForm.get('sku'); }
    get price() { return this.itemForm.get('price'); }
    get inStock() { return this.itemForm.get('inStock'); }
    get quantity() { return this.itemForm.get('quantity'); }
}
