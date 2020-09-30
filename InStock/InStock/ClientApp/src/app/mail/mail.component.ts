import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';  
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SendMailService } from '../services/send-mail.service';
import { Mail } from '../models/mail';
@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {
  mailForm: FormGroup;


  constructor(private _mailService: SendMailService,private formBuilder: FormBuilder,private _router: Router) {
    this.mailForm = this.formBuilder.group({  
      ToEmail:  ['', [Validators.required]],    
      Subject: [''],  
      Body: ['', [Validators.required]]
    
  });
   }

  ngOnInit() {
    
  }

sendMail(){
  if (!this.mailForm.valid) {
    return;
  }
  console.log(this.mailForm.value)
   var formData: any = new FormData();
  formData.append("ToEmail", this.mailForm.get('ToEmail').value);
  formData.append("Subject", this.mailForm.get('Subject').value);
  formData.append("Body", this.mailForm.get('Body').value);

    this._mailService.sendMail(formData)
    .subscribe((data) => {
      this._router.navigate(['']);
    });

}
get ToEmail() { return this.mailForm.get('ToEmail'); }
get Subject() { return this.mailForm.get('Subject'); }
get Body() { return this.mailForm.get('Body'); }
 
}
