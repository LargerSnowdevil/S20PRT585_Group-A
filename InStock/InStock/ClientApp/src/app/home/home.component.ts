import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';  
import { Observable } from 'rxjs';
import { InventoryService } from '../services/inventory.service';
import { Inventory } from '../models/inventories';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  inventories$: Observable<Inventory>;
  form: FormGroup;
  string:string;
  constructor(private _inventoryService: InventoryService,  private formBuilder: FormBuilder) {
    this.string=''
    this.form = this.formBuilder.group({  
      search: ['', [Validators.required]]  
     
  })  
  }

  ngOnInit() {
    
  }

  searchText() {
    this.string = this.form.get('search').value,
    this.inventories$ = this._inventoryService.getInventoryBySearch(this.string);
  }
}
