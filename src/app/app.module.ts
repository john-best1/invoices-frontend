import { FormBuilder } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'
import { MatToolbarModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule, MatDividerModule, MatSnackBarModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { StaffInvoiceListComponent } from './staff-invoice-list/staff-invoice-list.component';
import { CustomerInvoiceViewComponent } from './customer-invoice-view/customer-invoice-view.component';
import { StaffInvoiceViewComponent } from './staff-invoice-view/staff-invoice-view.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { InvoiceService } from './invoice.service'

const routes: Routes = [
  { path: 'invoices', component: StaffInvoiceListComponent},
  { path: 'customerInvoice', component: CustomerInvoiceViewComponent},
  { path: 'saveInvoice', component: StaffInvoiceViewComponent},
  { path: '', redirectTo: 'invoices', pathMatch: 'full'},
  { path: '**', component: NotFoundComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    StaffInvoiceListComponent,
    CustomerInvoiceViewComponent,
    StaffInvoiceViewComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatToolbarModule,
    MatInputModule, 
    MatSelectModule, 
    MatOptionModule, 
    MatIconModule, 
    MatButtonModule, 
    MatCardModule, 
    MatTableModule, 
    MatDividerModule, 
    MatSnackBarModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [InvoiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
