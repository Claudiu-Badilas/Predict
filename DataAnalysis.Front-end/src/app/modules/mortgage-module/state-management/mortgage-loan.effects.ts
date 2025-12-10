import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';

import * as MortgageLoanActions from 'src/app/modules/mortgage-module/state-management/mortgage-loan.actions';
import { MortgageLoanService } from '../services/overview-mortgage.service';

@Injectable()
export class MortgageLoanEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly _mortgageService: MortgageLoanService
  ) {}

  loadRepaymentSchedules$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MortgageLoanActions.loadRepaymentSchedules),
      switchMap(() => this._mortgageService.getRepaymentSchedules()),
      map((repaymentSchedules) =>
        MortgageLoanActions.setMortgagesSuccess({ repaymentSchedules })
      )
    )
  );
}
