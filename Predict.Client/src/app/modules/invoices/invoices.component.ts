import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import * as InvoicesActions from 'src/app/modules/invoices/actions/invoices.actions';
import * as fromInvoices from 'src/app/modules/invoices/reducers/invoices.reducer';

@Component({
  selector: 'app-invoices',
  imports: [RouterModule, CommonModule],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.scss',
})
export class InvoicesComponent {
  constructor(private readonly store: Store<fromInvoices.State>) {
    this.store.dispatch(InvoicesActions.loadInvoices());
  }
}
