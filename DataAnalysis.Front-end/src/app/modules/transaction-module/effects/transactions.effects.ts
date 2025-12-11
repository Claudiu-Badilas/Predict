import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import * as TransactionsActions from 'src/app/modules/transaction-module/actions/transactions.actions';
import { TransactionService } from '../services/transaction.service';
import * as fromTransactions from 'src/app/modules/transaction-module/reducers/transactions.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class TransactionsEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<fromTransactions.State>,
    private readonly _transactionService: TransactionService
  ) {}

  loadTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsActions.loadTransactions),
      withLatestFrom(
        this.store.select(fromTransactions.getStartDate),
        this.store.select(fromTransactions.getEndDate)
      ),
      switchMap(([, startDate, endDate]) =>
        this._transactionService.getTransactions(startDate, endDate)
      ),
      map((transactions) =>
        TransactionsActions.setTransactionsSuccess({ transactions })
      )
    )
  );
}
