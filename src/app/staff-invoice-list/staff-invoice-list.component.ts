import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../invoice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { Invoice } from '../invoice.model'
import { routerNgProbeToken } from '@angular/router/src/router_module';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'staff-invoice-list',
  templateUrl: './staff-invoice-list.component.html',
  styleUrls: ['./staff-invoice-list.component.css']
})
export class StaffInvoiceListComponent implements OnInit {

  invoices: Invoice[]
  displayedColumns = ['transactionId', 'customerId', 'customerName', 'date', 'send']
  token : string

  constructor(private invoiceService: InvoiceService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
      // throw out unverified users (use verified web token as parameter called token in url)
      this.route.queryParams.subscribe((params)=>{
        if(!params['token']){
          this.router.navigate([`access-denied`])
        }
        else{
          this.token = params['token']
          if(this.getDecodedAccessToken(this.token) == null){
            this.router.navigate([`access-denied`])
          }
          else{
            let adminBool = this.getDecodedAccessToken(this.token).admin
          if(!adminBool){
            this.router.navigate([`access-denied`])
          }
          else{this.fetchInvoices()}
        }}
      })
  }

  // get max 25 most recent invoices
  fetchInvoices(){
    this.invoiceService
      .getInvoices(this.token)
      .subscribe((data: Invoice[]) => {
        this.invoices = data
      })
  }

  // get max 25 most recent invoices with filter on transaction ID, customer Id and customer name
  fetchInvoicesWithFilter(filter){
    this.invoiceService
      .getInvoicesWithFilter(filter, this.token)
      .subscribe((data: Invoice[]) => {
        this.invoices = data
      })
  }

  // format date to JUN 01 2018 format
  formatDate(date){
    return date.toString().substring(3,15)
  }

  // goes to the send invoice page for the selected invoice
  sendInvoice(id){
    this.router.navigate([`/saveInvoice/${id}`], {queryParams: {token : this.token}})
  }

  // convert invoice to JSON object
  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }
}
