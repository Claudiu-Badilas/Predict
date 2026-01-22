import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, map } from 'rxjs';
import * as fromMortgageLoan from 'src/app/modules/mortgage-loan/state-management/mortgage-loan.reducer';
import { JsDateUtils } from 'src/app/shared/utils/js-date.utils';

@Component({
  selector: 'app-mortgage-loan-detailed-header',
  imports: [CommonModule],
  templateUrl: './mortgage-loan-detailed-header.component.html',
  styleUrl: './mortgage-loan-detailed-header.component.scss',
})
export class MortgageLoanDetailedHeaderComponent {
  updatedBaseRepaymentScheduleBasedOnLatestStates$ = this.store.select(
    fromMortgageLoan.getUpdatedBaseRepaymentScheduleBasedOnLatestStates,
  );
  baseRepaymentSchedule$ = this.store.select(
    fromMortgageLoan.getBaseRepaymentSchedule,
  );

  firstInstalmentPaymentDate$ = this.baseRepaymentSchedule$.pipe(
    map((p) => p?.monthlyInstalments?.at(0)?.paymentDate),
  );

  lastInstalmentPaymentDate$ =
    this.updatedBaseRepaymentScheduleBasedOnLatestStates$.pipe(
      map((p) => p?.at(-1)?.paymentDate),
    );

  dateDiffYMD$ = combineLatest([
    this.firstInstalmentPaymentDate$,
    this.lastInstalmentPaymentDate$,
  ]).pipe(map(([d1, d2]) => JsDateUtils.dateDiffYMD(d1, d2)));

  constructor(private store: Store<fromMortgageLoan.MortgageLoanState>) {}
}
