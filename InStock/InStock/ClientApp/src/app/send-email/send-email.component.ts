import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Email } from '../models/email';
import { EmailService } from '../services/email.service';
import { SendMailService } from '../services/send-mail.service';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {
  mailForm: FormGroup;
  emailId:0;
  femailAddress:string;
  //toEmail:string;
  fsubject:string;
  fbody:string;
  // email:{
  //   emailId:number;
  //   emailAddress:string;
  // }
  errorMessage: any;
  existingEmail: Email;
  form: any;

  constructor(private _emailService: EmailService,private _sendService: SendMailService, private formBuilder: FormBuilder,private _router: Router,private avRoute: ActivatedRoute) { 
    const idParam = 'id';
    this.femailAddress = 'emailAddress';
    this.fbody='body';
    this.fsubject='subject';
    // this.subject = 'subject';
    // this.body = 'body';
    //this.email.emailAddress='emailAddress';
    if (this.avRoute.snapshot.params[idParam]) {
      this.emailId = this.avRoute.snapshot.params[idParam];
    }
    this.mailForm = this.formBuilder.group(
      {
        emailId:0,
        emailAddress:['', ],
        body:['', ],
        subject:['', ],
        
      
      }
    )


  }

  ngOnInit() {

      this._emailService. getEmailinforbyId(this.emailId)
        .subscribe(data => (
          this.existingEmail = data,
          this.mailForm.controls[this.femailAddress].setValue(data.emailAddress)
       ));

  }
  sendEmail(){

    if (!this.mailForm.valid) {
      return;
    }
    console.log(this.mailForm.value)
    var formData: any = new FormData();
    formData.append("emailAddress", this.mailForm.get('emailAddress').value);
    formData.append("subject", this.mailForm.get('subject').value);
    formData.append("body", this.mailForm.get('body').value);
  
      this._sendService.sendMail(formData)
      .subscribe((data) => {
        this._router.navigate(['']);
      });
  
  }
  get emailAddress() { return this.mailForm.get('emailAddress'); }
  get subject() { return this.mailForm.get('Subject'); }
  get body() { return this.mailForm.get('Body'); }
   
    
  }


