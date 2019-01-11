import { Invoice } from './../invoice.model';
import { InvoiceService } from './../invoice.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material'
import { TestBed } from '@angular/core/testing';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'staff-invoice-view',
  templateUrl: './staff-invoice-view.component.html',
  styleUrls: ['./staff-invoice-view.component.css']
})
export class StaffInvoiceViewComponent implements OnInit {

  invoice: Invoice
  id: String
  orders: any[]
  token: string

  constructor(private invoiceService: InvoiceService, private router: Router, private route: ActivatedRoute,
                private snackBar: MatSnackBar) { }

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
          else{
          // get the invoice
          this.route.params.subscribe(params => {
            this.id = params.id
            this.invoiceService.getInvoiceById(this.id, this.token).subscribe((data: Invoice) => {
              this.invoice = data
              this.orders = data.orders
            })
          })
          }
        }
      }
      })


}

// total bill calculation to string
  calculateTotal(){
    var total = 0
    for(var i = 0; i < this.invoice.orders.length; i++){
      total = total + (+this.invoice.orders[i].price * +this.invoice.orders[i].quantity)
    }
    return "Total : £" + total.toFixed(2)
  }

  // simple calculation to string
  calculateCost(price, quantity){
    var total = (+price * +quantity).toFixed(2)
    return total
  }
  
  wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
  }

  // format date to JUN 01 2018 format
  formatDate(date){
    return date.toString().substring(3,15)
  }

  //TODO issue with this, invoice still displays in list on home page after being sent until home page refreshed, Fix this
  // This might be fixed, check again
  saveInvoice(){ 
    if(confirm("Are you sure you wish to confirm and send this invoice")){
      this.invoiceService.saveInvoice(this.id, this.token).subscribe(() =>{
        this.snackBar.open('Invoice Confirmed successfully', 'OK', {
          duration: 30000
        })
        this.router.navigate(['/invoices'], {queryParams: {token: this.token}})
      })
    }
  }

  // back button
  back(){
    this.router.navigate(['/invoices'], {queryParams: {token : this.token}})
  }

  //turn web token into json
  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }
 }


