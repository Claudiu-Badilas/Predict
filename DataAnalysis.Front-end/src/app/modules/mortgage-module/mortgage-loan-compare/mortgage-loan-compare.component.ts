import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { SideBarModule } from 'src/app/shared/components/side-bar/side-bar.module';
import { ToggleButtonComponent } from 'src/app/shared/components/toggle-button/toggle-button.component';
import * as fromAppStore from 'src/app/store/app-state.reducer';
import * as NavigationAction from 'src/app/store/navigation-state/navigation.actions';
import { RepaymentSchedule } from '../models/mortgage.model';
import { MortgageLoanCompareBodyComponent } from './components/mortgage-loan-compare-body/mortgage-loan-compare-body.component';
import * as fromMortgageLoan from 'src/app/modules/mortgage-module/state-management/mortgage-loan.reducer';

@Component({
  selector: 'app-mortgage-loan-compare',
  imports: [
    CommonModule,
    SideBarModule,
    ToggleButtonComponent,
    MortgageLoanCompareBodyComponent,
  ],
  templateUrl: './mortgage-loan-compare.component.html',
  styleUrl: './mortgage-loan-compare.component.scss',
})
export class MortgageLoanCompareComponent {
  repaymentSchedules$ = this.store.select(
    fromMortgageLoan.getRepaymentSchedules
  );
  constructor(private store: Store<fromAppStore.AppState>) {}

  onSelectionChange(module: string) {
    this.store.dispatch(
      NavigationAction.navigateTo({
        route: `/mortgage-loan/${module.toLowerCase()}`,
      })
    );
  }
}
