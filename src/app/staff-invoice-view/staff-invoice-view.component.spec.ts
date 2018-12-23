import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffInvoiceViewComponent } from './staff-invoice-view.component';

describe('StaffInvoiceViewComponent', () => {
  let component: StaffInvoiceViewComponent;
  let fixture: ComponentFixture<StaffInvoiceViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffInvoiceViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffInvoiceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
