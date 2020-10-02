import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetEmailsComponent } from './get-emails.component';

describe('GetEmailsComponent', () => {
  let component: GetEmailsComponent;
  let fixture: ComponentFixture<GetEmailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetEmailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetEmailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
