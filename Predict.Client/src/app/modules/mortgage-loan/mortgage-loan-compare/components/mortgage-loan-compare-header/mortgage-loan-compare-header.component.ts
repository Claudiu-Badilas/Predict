import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import * as fromMortgageLoanCompare from 'src/app/modules/mortgage-loan/mortgage-loan-compare/selectors/mortgage-loan-compare.selectors';
import * as fromMortgageLoan from 'src/app/modules/mortgage-loan/reducers/mortgage-loan.reducer';
import { NumberFormatPipe } from 'src/app/shared/pipes/number-format.pipe';

@Component({
  selector: 'app-mortgage-loan-compare-header',
  imports: [CommonModule, NumberFormatPipe],
  templateUrl: './mortgage-loan-compare-header.component.html',
  styleUrl: './mortgage-loan-compare-header.component.scss',
})
export class MortgageLoanCompareHeaderComponent {
  private readonly store = inject(Store<fromMortgageLoan.MortgageLoanState>);

  baseHistocialInstalmentPaymentBatchesManager = toSignal(
    this.store.select(
      fromMortgageLoanCompare.getBaseHistocialInstalmentPaymentBatchesManager,
    ),
  );
  leftHistocialInstalmentPaymentBatchesManager = toSignal(
    this.store.select(
      fromMortgageLoanCompare.getLeftHistocialInstalmentPaymentBatchesManager,
    ),
  );
  rightHistocialInstalmentPaymentBatchesManager = toSignal(
    this.store.select(
      fromMortgageLoanCompare.getRightHistocialInstalmentPaymentBatchesManager,
    ),
  );
}
