import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  getInvoices(token){
    return this.http.get(`${this.uri}/invoices/invoicesAdmin/?token=${token}`)
  }

  getInvoicesWithFilter(filter, token){
    return this.http.get(`${this.uri}/invoices/invoicesAdmin/${filter}?token=${token}`)
  }

  
  getInvoiceById(id, token){
    return this.http.get(`${this.uri}/invoices/${id}?token=${token}`)
  }

  saveInvoice(id, token){
    return this.http.post(`${this.uri}/invoices/update/${id}?token=${token}`, {})
  }
}
