import { createAction, props } from '@ngrx/store';
import { RepaymentSchedule } from './../models/mortgage.model';

export const loadRepaymentSchedules = createAction(
  '[Mortgage] Load Repayment Schedule'
);

export const setMortgagesSuccess = createAction(
  '[Mortgage] Set Mortgages Success',
  props<{ repaymentSchedules: RepaymentSchedule[] }>()
);

export const selectedMortgageLoanChanged = createAction(
  '[Mortgage] Selected Mortgages Loan Changed',
  props<{ selected: string }>()
);
