import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Email } from '../models/email';
import { EmailService } from '../services/email.service';

@Component({
  selector: 'app-get-emails',
  templateUrl: './get-emails.component.html',
  styleUrls: ['./get-emails.component.css']
})
export class GetEmailsComponent implements OnInit {

  emails$: Observable<Email[]>;


  constructor(private emailService: EmailService) {
  }
  ngOnInit() {
    this.loadEmails();
  }

  loadEmails() {
    this.emails$ = this.emailService.getEmailinfor();
  }

  // delete(shopId) {
  //   const ans = confirm('Do you want to delete this shop with id: ' + shopId);
  //   if (ans) {
  //     this.shopService.deleteItem(shopId).subscribe((data) => {
  //       this.loadShops();
  //     });
  //   }
  // }

}
