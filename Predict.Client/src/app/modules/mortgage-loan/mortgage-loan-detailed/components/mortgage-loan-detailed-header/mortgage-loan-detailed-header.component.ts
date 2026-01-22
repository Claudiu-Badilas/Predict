import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromMortgageLoan from 'src/app/modules/mortgage-loan/state-management/mortgage-loan.reducer';

@Component({
  selector: 'app-mortgage-loan-detailed-header',
  imports: [CommonModule],
  templateUrl: './mortgage-loan-detailed-header.component.html',
  styleUrl: './mortgage-loan-detailed-header.component.scss',
})
export class MortgageLoanDetailedHeaderComponent {
  mortgageLoanProgressChart$ = this.store.select(
    fromMortgageLoan.getMortgageLoanProgressChart,
  );
  mortgageInterestProgressChart$ = this.store.select(
    fromMortgageLoan.getMortgageInterestProgressChart,
  );
  mortgageLoanAmountChart$ = this.store.select(
    fromMortgageLoan.getMortgageLoanAmountChart,
  );
  mortgageLoanPaymentsChart$ = this.store.select(
    fromMortgageLoan.getMortgageLoanPaymentsChart,
  );

  constructor(private store: Store<fromMortgageLoan.MortgageLoanState>) {}
}
