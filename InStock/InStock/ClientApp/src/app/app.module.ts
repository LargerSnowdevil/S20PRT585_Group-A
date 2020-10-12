import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { GetItemsComponent } from './get-items/get-items.component';
import { AddEditItemsComponent } from './add-edit-items/add-edit-items.component';
import { ItemsService} from './services/items.service';
import { ShopsService} from './services/shops.service';
import { SendMailService} from './services/send-mail.service';
import { InventoryService} from './services/inventory.service';
import { GetShopsComponent} from './get-shops/get-shops.component';
import { GetShopComponent} from './get-single-shop/get-shop.component';
import { AddEditShopsComponent} from './add-edit-shops/add-edit-shops.component';
import { GetItemComponent} from './get-single-item/get-item.component';
import { GetInventoriesComponent} from './get-inventories/get-inventories.component';
import { GetInventoryComponent} from './get-single-inventory/get-inventory.component';
import { AddEditInventoryComponent} from './add-edit-inventory/add-edit-inventory.component';
import { AddEmailComponent } from "./subscribe/add-email.component";
import { EmailService } from "./services/email.service";
import { SendEmailComponent } from "./send-email/send-email.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AgmCoreModule} from '@agm/core';



@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    GetItemsComponent,
    AddEditItemsComponent,
    GetItemComponent,
    GetShopsComponent,
    GetShopComponent,
    AddEditShopsComponent,
    GetInventoriesComponent,
    GetInventoryComponent,
    AddEditInventoryComponent,
    AddEmailComponent,
    SendEmailComponent,
    ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    AgmCoreModule.forRoot({apiKey:'AIzaSyCpnRBNPG4ASi7Ak4V6mAWOHAiwvW-mFm4',
    libraries: ['places']}),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
     { path: '', component: HomeComponent, pathMatch: 'full' },
     { path: 'get-items', component: GetItemsComponent },
     { path: 'edit-item/:id', component: AddEditItemsComponent },
     { path: 'add-item', component: AddEditItemsComponent },
     { path: 'item/:id', component: GetItemComponent },
     { path: 'get-shops', component: GetShopsComponent },
     { path: 'edit-shop/:id', component: AddEditShopsComponent },
     { path: 'add-shop', component: AddEditShopsComponent },
     { path: 'shop/:id', component: GetShopComponent },
     { path: 'get-inventories', component : GetInventoriesComponent},
     { path: 'get-inventory', component : GetInventoryComponent},
     { path: 'edit-inventory/:id', component : AddEditInventoryComponent},
     { path: 'add-inventory', component : AddEditInventoryComponent},
      { path: 'add-email', component : AddEmailComponent},
      { path: 'send-email', component : SendEmailComponent},
      { path: 'send-email/:id', component : SendEmailComponent},
      { path: '**', redirectTo:'/'}
    ]),
    BrowserAnimationsModule
  ],
  providers: [
    ItemsService,
    ShopsService,
    InventoryService,
    SendMailService,
    EmailService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
