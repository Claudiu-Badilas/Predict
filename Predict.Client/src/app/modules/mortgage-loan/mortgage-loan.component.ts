import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import * as MortgageLoanActions from 'src/app/modules/mortgage-loan/state-management/mortgage-loan.actions';
import * as fromMortgageLoan from 'src/app/modules/mortgage-loan/state-management/mortgage-loan.reducer';

@Component({
  selector: 'app-mortgage-loan',
  imports: [CommonModule, RouterModule],
  templateUrl: './mortgage-loan.component.html',
  styleUrls: ['./mortgage-loan.component.scss'],
})
export class MortgageLoanComponent {
  constructor(
    private readonly store: Store<fromMortgageLoan.MortgageLoanState>
  ) {
    this.store.dispatch(MortgageLoanActions.loadRepaymentSchedules());
  }
}
