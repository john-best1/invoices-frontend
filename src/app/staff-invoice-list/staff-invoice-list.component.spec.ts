import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffInvoiceListComponent } from './staff-invoice-list.component';

describe('StaffInvoiceListComponent', () => {
  let component: StaffInvoiceListComponent;
  let fixture: ComponentFixture<StaffInvoiceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffInvoiceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffInvoiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
