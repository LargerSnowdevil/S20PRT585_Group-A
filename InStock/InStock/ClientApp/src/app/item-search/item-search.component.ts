import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';  
import { Observable } from 'rxjs';
import { ItemsService } from '../services/items.service';
import { Items } from '../models/items';
@Component({
  selector: 'app-item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.css']
})
export class ItemSearchComponent implements OnInit {
  items$: Observable<Items>;
  form: FormGroup;
  string:string;
  constructor(private itemsService: ItemsService,  private formBuilder: FormBuilder) {
    this.string=''
    this.form = this.formBuilder.group({  
   
      search: ['', [Validators.required]]  
     
  })  
  }


  ngOnInit() {
    
  }
  searchText() {
    this.string = this.form.get('search').value,
    this.items$ = this.itemsService.getItemBySearch(this.string);
  }
  get search() { return this.form.get('search'); }
}
