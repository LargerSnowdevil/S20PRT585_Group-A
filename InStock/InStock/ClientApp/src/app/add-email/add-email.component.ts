import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Email } from '../models/email';
import { EmailService } from '../services/email.service';

@Component({
  selector: 'app-add-email',
  templateUrl: './add-email.component.html',
  styleUrls: ['./add-email.component.css']
})
export class AddEmailComponent implements OnInit {

  mailinfoForm: FormGroup;
  //title: string;
  emailId: number;
  femailAddress:string;
  errorMessage: any;
  existingEmail :Email;
  private sub: any;
  constructor(private _emailService: EmailService, private avRoute: ActivatedRoute, private formBuilder: FormBuilder,private _router: Router) {
    //this.title="Add";
    this.femailAddress="emailAddress";
   
   
    this.mailinfoForm = this.formBuilder.group({  
      emailId: 0,  
      emailAddress: ['', ],  
    
  })   
    }

  ngOnInit() {
    this.sub = this.avRoute.params.subscribe(params => {
      this.emailId = +params['id']; 
  
   });
  }  
  
  save() {
    if (!this.mailinfoForm.valid) {
      return;
    }
    let email: Email = {
    emailAddress: this.mailinfoForm.get('emailAddress').value,
    };
       
      console.log(email)
     // console.log(item)
      this._emailService.addEmail(email)
      .subscribe((data) => {
        this._router.navigate(['/get-email']);
      });
     
}

get emailAddress() { return this.mailinfoForm.get('emailAddress'); }



}
