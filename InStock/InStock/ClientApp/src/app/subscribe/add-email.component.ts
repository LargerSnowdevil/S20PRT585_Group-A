import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Email } from '../models/email';
import { EmailService } from '../services/email.service';
import { SendMailService } from '../services/send-mail.service';
@Component({
  selector: 'app-add-email',
  templateUrl: './add-email.component.html',
  styleUrls: ['./add-email.component.css']
})
export class AddEmailComponent implements OnInit {
  mailinfoForm: FormGroup;
  emailId: number;
  femailAddress:string;
  errorMessage: any;
  existingEmail :Email;
  private sub: any;
  constructor(private _emailService: EmailService,private _sendService: SendMailService, private avRoute: ActivatedRoute, private formBuilder: FormBuilder,private _router: Router) {
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
    var formData: any = new FormData();
    formData.append("emailAddress", this.mailinfoForm.get('emailAddress').value);
    formData.append("subject", "Welcome");
    formData.append("body", "Thankyou for subscribing to InStock!");
  
      this._sendService.sendMail(formData)
      .subscribe((data) => {
      });

      this._emailService.addEmail(email)
      .subscribe((data) => {
        this._router.navigate(['']);
      });
     
}

get emailAddress() { return this.mailinfoForm.get('emailAddress'); }



}
