import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  getInvoices(){
    return this.http.get(`${this.uri}/invoices`)
  }
}
