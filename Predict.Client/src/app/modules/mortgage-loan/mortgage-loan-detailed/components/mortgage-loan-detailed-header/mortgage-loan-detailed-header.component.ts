import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import * as fromMortgageLoan from 'src/app/modules/mortgage-loan/state-management/mortgage-loan.reducer';
import { JsDateUtils } from 'src/app/shared/utils/js-date.utils';

@Component({
  selector: 'app-mortgage-loan-detailed-header',
  imports: [CommonModule],
  templateUrl: './mortgage-loan-detailed-header.component.html',
  styleUrl: './mortgage-loan-detailed-header.component.scss',
})
export class MortgageLoanDetailedHeaderComponent {
  private store = inject(Store<fromMortgageLoan.MortgageLoanState>);

  readonly updatedBaseRepaymentScheduleBasedOnLatestStates = toSignal(
    this.store.select(
      fromMortgageLoan.getUpdatedBaseRepaymentScheduleBasedOnLatestStates,
    ),
    { initialValue: null },
  );

  readonly baseRepaymentSchedule = toSignal(
    this.store.select(fromMortgageLoan.getBaseRepaymentSchedule),
    { initialValue: null },
  );

  readonly firstInstalmentPaymentDate = computed(() => {
    const schedule = this.baseRepaymentSchedule();
    return schedule?.monthlyInstalments?.at(0)?.paymentDate ?? null;
  });

  readonly lastInstalmentPaymentDate = computed(() => {
    const schedule = this.updatedBaseRepaymentScheduleBasedOnLatestStates();
    return schedule?.at(-1)?.paymentDate ?? null;
  });

  readonly lastBaseInstalmentPaymentDate = computed(() => {
    const schedule = this.baseRepaymentSchedule();
    return schedule?.monthlyInstalments?.at(-1)?.paymentDate ?? null;
  });

  readonly dateDiffYMD = computed(() => {
    const d1 = this.firstInstalmentPaymentDate();
    const d2 = this.lastInstalmentPaymentDate();
    return JsDateUtils.dateDiffYMD(d1, d2);
  });

  readonly savedDateDiffYMD = computed(() => {
    const d1 = this.lastInstalmentPaymentDate();
    const d2 = this.lastBaseInstalmentPaymentDate();
    return JsDateUtils.dateDiffYMD(d1, d2);
  });
}
