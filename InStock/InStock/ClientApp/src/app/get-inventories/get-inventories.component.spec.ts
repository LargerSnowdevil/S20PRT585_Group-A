import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetInventoriesComponent } from './get-inventories.component';

describe('GetInventoriesComponent', () => {
  let component: GetInventoriesComponent;
  let fixture: ComponentFixture<GetInventoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetInventoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetInventoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
