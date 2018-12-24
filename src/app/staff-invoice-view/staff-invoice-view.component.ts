import { Invoice } from './../invoice.model';
import { InvoiceService } from './../invoice.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'staff-invoice-view',
  templateUrl: './staff-invoice-view.component.html',
  styleUrls: ['./staff-invoice-view.component.css']
})
export class StaffInvoiceViewComponent implements OnInit {

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
