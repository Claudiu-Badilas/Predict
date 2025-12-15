import { createAction, props } from '@ngrx/store';
import { ReceiptDomain } from '../models/receipts-domain.model';

export const loadReceipts = createAction('[Receipts] Load Receipts');

export const setReceiptsSuccess = createAction(
  '[Receipts] Set Receipts Success',
  props<{ receipts: ReceiptDomain[] }>()
);

export const dateRangeChanged = createAction(
  '[Receipts] Date Range Changed',
  props<{ startDate: Date; endDate: Date }>()
);
