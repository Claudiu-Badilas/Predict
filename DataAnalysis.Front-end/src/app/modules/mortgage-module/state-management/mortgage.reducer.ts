import { RepaymentSchedule } from './../models/mortgage.model';
import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import * as MortgageActions from 'src/app/modules/mortgage-module/state-management/mortgage.actions';

export interface MortgageState {
  repaymentSchedules: RepaymentSchedule[];
  selectedRepaymentScheduleName: string;
}

const initialState: MortgageState = {
  repaymentSchedules: [],
  selectedRepaymentScheduleName: null,
};

const mortgageReducer = createReducer(
  initialState,
  on(MortgageActions.setMortgagesSuccess, (state, { repaymentSchedules }) => ({
    ...state,
    repaymentSchedules,
  })),
  on(MortgageActions.selectedMortgageLoanChanged, (state, { selected }) => ({
    ...state,
    selectedRepaymentScheduleName: selected,
  }))
);

export function reducer(state: MortgageState, action: Action) {
  return mortgageReducer(state, action);
}

const getMortgageState = createFeatureSelector<MortgageState>('MortgageState');

export const getRepaymentSchedules = createSelector(
  getMortgageState,
  (state) => state.repaymentSchedules
);

export const getSelectedRepaymentScheduleName = createSelector(
  getMortgageState,
  (state) =>
    state.selectedRepaymentScheduleName ??
    state.repaymentSchedules[0]?.name ??
    null
);

export const getSelectedRepaymentSchedule = createSelector(
  getRepaymentSchedules,
  getSelectedRepaymentScheduleName,
  (repaymentSchedules, selectedRepaymentScheduleName) =>
    repaymentSchedules?.find(
      (rs) => rs.name === selectedRepaymentScheduleName
    ) ?? null
);
