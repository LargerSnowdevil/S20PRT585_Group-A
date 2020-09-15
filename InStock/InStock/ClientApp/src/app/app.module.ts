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
    ItemSearchComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
     { path: '', component: HomeComponent, pathMatch: 'full' },
     { path: 'get-items', component: GetItemsComponent },
     { path: 'edit/:id', component: AddEditItemsComponent },
     { path: 'add', component: AddEditItemsComponent },
     { path: 'item/:id', component: GetItemComponent },
     { path: 'item-search', component: ItemSearchComponent },
      
      
    ])
  ],
  providers: [
    ItemsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
