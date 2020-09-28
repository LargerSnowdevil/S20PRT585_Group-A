import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';  
import { Router, ActivatedRoute } from '@angular/router';
import { ItemsService } from '../services/items.service';  
import { Items } from '../models/items';
import { ShopsService } from '../services/shops.service';
import { Shops } from '../models/shop';
import { Observable } from 'rxjs';
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
  errorMessage: any;
  existingItem :Items;
  shops$: Observable<Shops[]>;
  private sub: any;
  constructor(private _itemService: ItemsService,private shopService: ShopsService, private avRoute: ActivatedRoute, private formBuilder: FormBuilder,private _router: Router) {
    this.title="Add";
    this.fname="name";
   
   
    this.itemForm = this.formBuilder.group({  
      id: 0,  
      name: ['', [Validators.required]],  
    
  })   
    }

  ngOnInit() {
    this.sub = this.avRoute.params.subscribe(params => {
      this.id = +params['id']; 
  
   });
   this.shops$ = this.shopService.getShops();
    if (this.id > 0) {  
      this.title = "Edit";  
      this._itemService.getItemById(this.id)
      .subscribe(data => (
        this.existingItem = data,
        this.itemForm.controls['name'].setValue(data.name)
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
       
      };
      console.log(item)
     // console.log(item)
      this._itemService.addItem(item)
      .subscribe((data) => {
        this._router.navigate(['/get-items']);
      });
     
}  

else if (this.title == "Edit") {  
  let item: Items = {
    id: this.existingItem.id,
    name: this.itemForm.get('name').value
    
  };
 // console.log(item)
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
   
}
