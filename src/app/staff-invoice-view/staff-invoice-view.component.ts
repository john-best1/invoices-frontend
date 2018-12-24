import { Invoice } from './../invoice.model';
import { InvoiceService } from './../invoice.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'staff-invoice-view',
  templateUrl: './staff-invoice-view.component.html',
  styleUrls: ['./staff-invoice-view.component.css']
})
export class StaffInvoiceViewComponent implements OnInit {

  invoice: Invoice
  id: String
  orders: any[]

  constructor(private invoiceService: InvoiceService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id
      this.invoiceService.getInvoiceById(this.id).subscribe((data: Invoice) => {
        this.invoice = data
        this.orders = data.orders
      })
  })
  }
  calculateTotal(){
    var total = 0
    for(var i = 0; i < this.invoice.orders.length; i++){
      total = total + (+this.invoice.orders[i].price * +this.invoice.orders[i].quantity)
    }
    return "Total : £" + total.toFixed(2)
  }

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

  saveInvoice(){
    this.invoiceService.saveInvoice(this.id)
    this.wait(2000)
    this.router.navigate(['/invoices'])
  }

 }


