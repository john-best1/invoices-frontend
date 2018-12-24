import { Invoice } from './../invoice.model';
import { InvoiceService } from './../invoice.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'customer-invoice-view',
  templateUrl: './customer-invoice-view.component.html',
  styleUrls: ['./customer-invoice-view.component.css']
})
export class CustomerInvoiceViewComponent implements OnInit {

  invoice: Invoice
  id: String

  constructor(private invoiceService: InvoiceService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id
      this.invoiceService.getInvoiceById(this.id).subscribe((data: Invoice) => {
        this.invoice = data
      })
  })
}
}

