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
import { GetShopsComponent} from './get-shops/get-shops.component';
import { GetShopComponent} from './get-shop/get-shop.component';
import { AddEditShopsComponent} from './add-edit-shops/add-edit-shops.component';
import { ItemSearchComponent } from './item-search/item-search.component';
import { GetItemComponent} from './get-item/get-item.component';
import { FilterPipe } from './filter.pipe'; 
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    GetItemsComponent,
    AddEditItemsComponent,
    GetItemComponent,
    FilterPipe,
    ItemSearchComponent,
    GetShopsComponent,
    GetShopComponent,
    AddEditShopsComponent
    ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
     { path: '', component: HomeComponent, pathMatch: 'full' },
     { path: 'get-items', component: GetItemsComponent },
     { path: 'item/edit/:id', component: AddEditItemsComponent },
     { path: 'item/add', component: AddEditItemsComponent },
     { path: 'item/:id', component: GetItemComponent },
     { path: 'get-shops', component: GetShopsComponent },
     { path: 'shop/edit/:id', component: AddEditShopsComponent },
     { path: 'shop/add', component: AddEditShopsComponent },
     { path: 'shop/:id', component: GetShopComponent },

      
      
    ])
  ],
  providers: [
    ItemsService,
    ShopsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
