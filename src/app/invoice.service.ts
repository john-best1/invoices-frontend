import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var env = process.env.NODE_ENV || 'dev'


@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

uri

  constructor(private http: HttpClient) { 
    if(env == 'production'){this.uri = 'https://invoices-frontend.herokuapp.com'}
    else{this.uri = 'http://localhost:4000'}
  }


  // get all uncompleted invoices
  getInvoices(token){
    return this.http.get(`${this.uri}/invoices/invoicesAdmin/?token=${token}`)
  }

  // get all uncompleted invoices with filter on customer Id, transaction Id and customer name
  getInvoicesWithFilter(filter, token){
    return this.http.get(`${this.uri}/invoices/invoicesAdmin/${filter}?token=${token}`)
  }

  // get invoice by _id
  getInvoiceById(id, token){
    return this.http.get(`${this.uri}/invoices/${id}?token=${token}`)
  }

    // get invoice by _id
    getCustomerInvoiceById(id, token){
      return this.http.get(`${this.uri}/invoices/customerInvoice/${id}?token=${token}`)
    }

  // update invoice to be completed
  saveInvoice(id, token){
    return this.http.post(`${this.uri}/invoices/update/${id}?token=${token}`, {})
  }
}
