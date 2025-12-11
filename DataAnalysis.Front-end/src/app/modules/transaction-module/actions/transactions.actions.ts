import { createAction, props } from '@ngrx/store';
import { TransactionDomain } from '../models/transactions.model';

export const loadTransactions = createAction(
  '[Transactions] Load Transactions'
);

export const setTransactionsSuccess = createAction(
  '[Transactions] Set Transactions Success',
  props<{ transactions: TransactionDomain[] }>()
);

export const dateRangeChanged = createAction(
  '[Transactions] Date Range Changed',
  props<{ startDate: Date; endDate: Date }>()
);
