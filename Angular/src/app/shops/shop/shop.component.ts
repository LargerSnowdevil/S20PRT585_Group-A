import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShopService } from 'src/app/shared/shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  constructor(private service: ShopService) { }

  ngOnInit(): void {
    this.resetForm();

  }

  //initialising data in dataform in Shopform
  resetForm(form?: NgForm){
    if(form!=null)
      form.resetForm();
    this.service.formData={
        ShopID: null,
        ShopName:"",
        Address: "",
        Contact: "",
        Product: ""


    }

  }
  //submit dataform from html to service
  //to check if there is existing ShopID, according to ID to decide to add or update
  onSubmit(form: NgForm){
    if(form.value.ShopID == null)
    this.insertRecord(form);
    else
    this.updateRecord(form);


  }
  insertRecord(form: NgForm){
    this.service.postShop(form.value).subscribe(res =>{this.resetForm(form)})
    this.resetForm(form);
    //update new list 
    this.service.refreshList();
  }
  updateRecord(form: NgForm){
    this.service.putShop(form.value).subscribe(res =>{this.resetForm(form)})
    this.resetForm(form);
    this.service.refreshList();
  
  }
}
