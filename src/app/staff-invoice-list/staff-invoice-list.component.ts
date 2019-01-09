import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../invoice.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { Invoice } from '../invoice.model'
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'staff-invoice-list',
  templateUrl: './staff-invoice-list.component.html',
  styleUrls: ['./staff-invoice-list.component.css']
})
export class StaffInvoiceListComponent implements OnInit {

  invoices: Invoice[]
  displayedColumns = ['transactionId', 'customerId', 'customerName', 'date', 'send']

  constructor(private invoiceService: InvoiceService, private router: Router) { }

  ngOnInit() {
    this.fetchInvoices()
  }

  fetchInvoices(){
    this.invoiceService
      .getInvoices()
      .subscribe((data: Invoice[]) => {
        this.invoices = data
      })
  }

  fetchInvoicesWithFilter(filter){
    this.invoiceService
      .getInvoicesWithFilter(filter)
      .subscribe((data: Invoice[]) => {
        this.invoices = data
      })
  }

  formatDate(date){
    return date.toString().substring(3,15)
  }
  sendInvoice(id){
      this.router.navigate([`/saveInvoice/${id}`])
  }
}
