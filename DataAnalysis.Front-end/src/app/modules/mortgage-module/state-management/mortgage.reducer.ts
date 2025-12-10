import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import * as MortgageActions from 'src/app/modules/mortgage-module/state-management/mortgage.actions';
import {
  mapBaseRepaymentScheduleToOverview,
  OverviewRepaymentSchedule,
} from '../mortgage-overview/models/mortgage-loan-overview.model';
import { RepaymentSchedule } from './../models/mortgage.model';

interface MortgageLoanOverviewState {
  repaymentSchedules: OverviewRepaymentSchedule[];
}

export interface MortgageState {
  repaymentSchedules: RepaymentSchedule[];
  selectedRepaymentScheduleName: string;

  overview: MortgageLoanOverviewState;
}

const initialState: MortgageState = {
  repaymentSchedules: [],
  selectedRepaymentScheduleName: null,

  overview: {
    repaymentSchedules: [],
  },
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

export const getSelectedRepaymentScheduleOverview = createSelector(
  getSelectedRepaymentSchedule,
  mapBaseRepaymentScheduleToOverview
);
