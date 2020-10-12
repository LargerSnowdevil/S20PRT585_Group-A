import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';  
import { Router, ActivatedRoute } from '@angular/router';
import { ItemsService } from '../services/items.service';  
import { Items } from '../models/items';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
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
  fname:string;
  isImageSaved: boolean;
  errorMessage: any;
  imageError:string;
  existingItem :Items;   
  items$: Observable<Items[]>;
  private sub: any;
  // Maximum file size allowed to be uploaded = 1MB

  constructor(private _itemService: ItemsService,private avRoute: ActivatedRoute, private formBuilder: FormBuilder,private _router: Router) {
    this.title="Add";
    this.fname="";
   
   
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
      this.readAndUploadFile();
}  

else if (this.title == "Edit") {  

  this.readAndEditFile();
  
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



    private readAndUploadFile() {
      let item = new Items();
     
        item.name = this.itemForm.get('name').value;
        item.image= this.itemImage;
    
          // POST to server
          this._itemService.addItem(item).subscribe(resp => { 
          
              this._router.navigate(['/get-items']); });
  }

  private readAndEditFile() {
    let item = new Items();
     item.id = this.existingItem.id;
      item.name = this.itemForm.get('name').value;
      item.image= this.itemImage;

        this._itemService.editItemById(this.id, item).subscribe(resp => { 
        
            this._router.navigate(['/get-items']); });
    
        }
    

  onFileChange(fileInput: any) {
    this.imageError = null;
    this.itemImage = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 20971520;
        const allowed_types = ['image/png', 'image/jpeg'];
        const max_height = 15200;
        const max_width = 25600;

        if (fileInput.target.files[0].size > max_size) {
            this.imageError =
                'Maximum size allowed is ' + max_size / 1000 + 'Mb';

            return false;
        }

        if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
            this.imageError = 'Only Images are allowed ( JPG | PNG )';
            return false;
        }
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            
            image.onload = rs => {
                const img_height = rs.currentTarget['height'];
                const img_width = rs.currentTarget['width'];
                if (img_height > max_height && img_width > max_width) {
                    this.imageError =
                        'Maximum dimentions allowed ' +
                        max_height +
                        '*' +
                        max_width +
                        'px';
                    return false;
                } else {
                    const imgBase64Path = e.target.result;
                    this.itemImage = imgBase64Path;
                   // console.log(this.itemImage)
                    this.isImageSaved = true;
           
                }
            };
        };
        if(fileInput.target.files[0]){
        reader.readAsDataURL(fileInput.target.files[0]);
        }
    }
}
 }
