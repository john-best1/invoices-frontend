import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../invoice.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { Invoice } from '../invoice.model'

@Component({
  selector: 'app-staff-invoice-list',
  templateUrl: './staff-invoice-list.component.html',
  styleUrls: ['./staff-invoice-list.component.css']
})
export class StaffInvoiceListComponent implements OnInit {

  invoices: Invoice[]
  displayedColumns = ['title', 'responsible', 'severity', 'status', 'actions']

  constructor(private invoiceService: InvoiceService, private router: Router) { }

  ngOnInit() {
    this.fetchInvoices()
  }

  fetchInvoices(){
    this.invoiceService
      .getInvoices()
      .subscribe((data: Invoice[]) => {
        this.invoices = data
        console.log("Data requested...")
        console.log(this.invoices)
      })
  }
}