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
  imageFile: File = null;
  itemImage: any = null;
  messages: string[] = [];
  itemForm: FormGroup;
  title: string;
  id: number;
  isImageSaved: boolean;
  errorMessage: any;
  existingItem :Items;   
  items$: Observable<Items[]>;
  private sub: any;
  // Maximum file size allowed to be uploaded = 1MB

  constructor(private _itemService: ItemsService,private shopService: ShopsService, private avRoute: ActivatedRoute, private formBuilder: FormBuilder,private _router: Router) {
    this.title="Add";

   
   
    this.itemForm = this.formBuilder.group({  
      id: 0,  
      name: ['', [Validators.required]],
      image: ['']
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
        this.itemForm.controls['name'].setValue(data.name)
      ));
} 
  }  
  

  save() {
    if (!this.itemForm.valid) {
      return;
    }
    if (this.title == "Add") {
      this.readAndUploadFile(this.itemImage);
}  

else if (this.title == "Edit") {  

  this.readAndUploadFile(this.itemImage);
  
}  
} 
removeImage() {
  this.itemImage = null;
  this.isImageSaved = false;
}
  
cancel() {  
        this._router.navigate(['/get-items']);  
    }  
  
    get name() { return this.itemForm.get('name'); }
    get image() { return this.itemForm.get('file'); }


    private readAndUploadFile(itemImage: any) {
      let item = new Items();
     
        item.name = this.itemForm.get('name').value;
      let reader = new FileReader();
      
      // Setup onload event for reader
      reader.onload = () => {
          // Store base64 encoded representation of file
          item.image = reader.result.toString();
          this.isImageSaved = true;
          // POST to server
          this._itemService.addItem(item).subscribe(resp => { 
              this.messages.push("Upload complete");
              this._router.navigate(['/get-items']); });
      }
      
      // Read the file
      reader.readAsDataURL(itemImage);
  }
  uploadFile(): void {
    this.readAndUploadFile(this.itemImage);
}
    onFileChange(event) {
     const MAX_SIZE: number = 1048576;
      this.itemImage = null;
      if (event.target.files && event.target.files.length > 0) {
          // Don't allow file sizes over 1MB
          if (event.target.files[0].size < MAX_SIZE) {
              // Set theFile property
              this.itemImage = event.target.files[0];
          }
          else {
              // Display error message
              this.messages.push("File: " + event.target.files[0].name + " is too large to upload.");
          }
      }
  }

}
