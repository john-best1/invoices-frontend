import { Invoice } from './../invoice.model';
import { InvoiceService } from './../invoice.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'customer-invoice-view',
  templateUrl: './customer-invoice-view.component.html',
  styleUrls: ['./customer-invoice-view.component.css']
})
export class CustomerInvoiceViewComponent implements OnInit {

  invoice: Invoice
  id: String
  orders: any[]
  token: string
  customerId
  invoiceCustomerId

  constructor(private invoiceService: InvoiceService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
      // throw out unverified users (use verified web token as parameter called token in url)
      this.route.queryParams.subscribe((params)=>{
        if(!params['token']){
          console.log("Got here too")
          this.router.navigate([`access-denied`])
        }
        else{
          this.token = params['token']
          //this.customerId = this.getDecodedAccessToken(this.token).customerId
        }
      })
    // get the invoice
    this.route.params.subscribe(params => {
      this.id = params.id
      this.invoiceService.getInvoiceById(this.id, this.token).subscribe((data: Invoice) => {
        this.invoice = data
        this.orders = data.orders
        //this.invoiceCustomerId = data.customerId
      })
  })
  //
  //  TODO fix this to kick user to access denied if not their invoice
  //  Note think this is a timing issue to do with subscribe
  //  
  //  if (this.invoiceCustomerId != this.customerId){
  //    this.router.navigate([`access-denied`])
  //  }
  }

// get total bill as string
calculateTotal(){
  var total = 0
  for(var i = 0; i < this.invoice.orders.length; i++){
    total = total + (+this.invoice.orders[i].price * +this.invoice.orders[i].quantity)
  }
  return "Total : £" + total.toFixed(2)
}

// simple calculation as string
calculateCost(price, quantity){
  var total = (+price * +quantity).toFixed(2)
  return total
}

// format date to JUN 01 2018 format
formatDate(date){
  return date.toString().substring(3,15)
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

