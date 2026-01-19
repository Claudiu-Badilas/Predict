import { Component, Input } from '@angular/core';
import { OverviewLoanInstalment } from '../../models/overview-mortgage-loan.model';

@Component({
  selector: 'app-mortgage-loan-overview-header',
  imports: [],
  templateUrl: './mortgage-loan-overview-header.component.html',
  styleUrl: './mortgage-loan-overview-header.component.scss',
})
export class MortgageLoanOverviewHeaderComponent {
  @Input({ required: true }) overviewLoanRates: OverviewLoanInstalment[];

  get instalment() {
    return this.overviewLoanRates.find((r) => r.instalmentPayment) || null;
  }

  get advancePayment() {
    return this.overviewLoanRates.filter(
      (r) => !r.instalmentPayment && r.earlyPayment,
    );
  }

  get lastAdvancePayment() {
    return this.advancePayment.at(-1);
  }

  get totalAdvancePayment() {
    return (this.advancePayment ?? [])
      .map((a) => a.principalAmount)
      .reduce((sum, val) => sum + val, 0);
  }

  get totalSavedInterest() {
    return (this.advancePayment ?? []).reduce(
      (sum, val) => sum + (val.totalInstalment - val.principalAmount),
      0,
    );
  }

  get total() {
    return (this.instalment?.totalInstalment ?? 0) + this.totalAdvancePayment;
  }
}
