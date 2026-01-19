import { Component, computed, input } from '@angular/core';
import { CalculatorUtil } from 'src/app/shared/utils/calculator.utils';
import { OverviewLoanInstalment } from '../../models/overview-mortgage-loan.model';

@Component({
  selector: 'app-mortgage-loan-overview-header',
  imports: [],
  templateUrl: './mortgage-loan-overview-header.component.html',
  styleUrl: './mortgage-loan-overview-header.component.scss',
})
export class MortgageLoanOverviewHeaderComponent {
  overviewLoanRates = input.required<OverviewLoanInstalment[]>();

  instalment = computed(() =>
    this.overviewLoanRates().find((r) => r.instalmentPayment),
  );

  earlyPayments = computed(() =>
    this.overviewLoanRates().filter((r) => r.earlyPayment),
  );

  lastEarlyPayment = computed(() => this.earlyPayments().at(-1));

  totalEarlyPayment = computed(() =>
    CalculatorUtil.sum(this.earlyPayments().map((a) => a.principalAmount)),
  );

  totalSavedInterest = computed(() =>
    CalculatorUtil.sum(
      this.earlyPayments().map((a) => a.totalInstalment - a.principalAmount),
    ),
  );

  total = computed(() =>
    CalculatorUtil.sum([
      this.instalment()?.totalInstalment,
      this.totalEarlyPayment(),
    ]),
  );
}
