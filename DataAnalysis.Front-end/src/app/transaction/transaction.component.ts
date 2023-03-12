import { TransactionService } from './transaction.service';
import { Component, OnInit } from '@angular/core';
import { first, Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-transaction',
  template: `<table>
    <tr *ngFor="let tran of transactions">
      {{
        tran.id
      }}
      |{{
        tran.registrationDate
      }}
      |{{
        tran.amount
      }}
      |
      {{
        tran.provider
      }}|
      {{
        tran.currency
      }}|
      {{
        tran.description
      }}
    </tr>
  </table>`,
  styles: [],
  imports: [CommonModule, HttpClientModule],
  providers: [TransactionService],
})
export class TransactionComponent implements OnInit {
  transactions: any[] = [];

  ngOnInit(): void {}

  constructor(private _transactionService: TransactionService) {
    this._transactionService
      .getTransactions()
      //.pipe(first())
      .subscribe((a) => {
        console.log(
          '🚀 ~ file: transaction.component.ts:32 ~ TransactionComponent ~ .subscribe ~ a:',
          a
        );
        this.transactions = a;
      });
  }
}
