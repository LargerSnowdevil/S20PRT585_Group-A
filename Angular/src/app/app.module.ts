import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShopsComponent } from './shops/shops.component';
import { ShopComponent } from './shops/shop/shop.component';
import { ShopListComponent } from './shops/shop-list/shop-list.component';
import { Shop } from './shared/shop.model';
import { ShopService } from './shared/shop.service';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    ShopsComponent,
    ShopComponent,
    ShopListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
    
  ],
  providers: [ShopService],
  bootstrap: [AppComponent]
})
export class AppModule { }
