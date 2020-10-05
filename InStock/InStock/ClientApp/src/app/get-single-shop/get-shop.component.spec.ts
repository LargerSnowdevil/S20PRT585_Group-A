import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetShopComponent } from './get-shop.component';

describe('GetShopComponent', () => {
  let component: GetShopComponent;
  let fixture: ComponentFixture<GetShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
