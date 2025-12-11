import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import * as TransactionsActions from 'src/app/modules/transaction-module/actions/transactions.actions';
import { DateUtils } from 'src/app/shared/utils/date.utils';
import { TransactionDomain } from '../models/transactions.model';

export interface State {
  transactions: TransactionDomain[];
  startDate: Date;
  endDate: Date;
  selectedProvider: string;
  selectedServiceProvider: string;
}

const initialState: State = {
  transactions: [],
  startDate: DateUtils.getStartOfTheYear({ subtractYears: 10 }),
  endDate: new Date(),
  selectedProvider: 'No Selection',
  selectedServiceProvider: 'No Selection',
};

const transactionsReducer = createReducer(
  initialState,
  on(TransactionsActions.setTransactionsSuccess, (state, { transactions }) => ({
    ...state,
    transactions,
  })),
  on(TransactionsActions.dateRangeChanged, (state, { startDate, endDate }) => ({
    ...state,
    startDate,
    endDate,
  })),
  on(TransactionsActions.selectedProviderChanged, (state, { provider }) => ({
    ...state,
    selectedProvider: provider,
  })),
  on(
    TransactionsActions.selectedServiceProviderChanged,
    (state, { serviceProvider }) => ({
      ...state,
      selectedServiceProvider: serviceProvider,
    })
  )
);

export function reducer(state: State, action: Action) {
  return transactionsReducer(state, action);
}

const getTransactionsState = createFeatureSelector<State>('TransactionsState');

export const getStartDate = createSelector(
  getTransactionsState,
  (state) => state.startDate
);

export const getEndDate = createSelector(
  getTransactionsState,
  (state) => state.endDate
);

export const getTransactions = createSelector(
  getTransactionsState,
  (state) => state.transactions
);

export const getSelectedProvider = createSelector(
  getTransactionsState,
  (state) => state.selectedProvider
);

export const getSelectedServiceProvider = createSelector(
  getTransactionsState,
  (state) => state.selectedServiceProvider
);

export const getAvailableProviderTransactions = createSelector(
  getTransactions,
  getSelectedProvider,
  (transactions, selectedProvider) =>
    transactions.filter(
      (t) =>
        selectedProvider === 'No Selection' || t.provider === selectedProvider
    )
);

export const getAvailableTransactions = createSelector(
  getAvailableProviderTransactions,
  getSelectedServiceProvider,
  (transactions, selectedServiceProvider) =>
    transactions.filter(
      (t) =>
        selectedServiceProvider === 'No Selection' ||
        t.serviceProvider === selectedServiceProvider
    )
);
