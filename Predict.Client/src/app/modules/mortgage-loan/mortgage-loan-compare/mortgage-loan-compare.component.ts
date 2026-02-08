import { CommonModule } from '@angular/common';
import { Component, computed, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';

import * as MortgageLoanCompareActions from 'src/app/modules/mortgage-loan/mortgage-loan-compare/actions/mortgage-loan-compare.actions';
import * as fromMortgageLoanCompare from 'src/app/modules/mortgage-loan/mortgage-loan-compare/selectors/mortgage-loan-compare.selectors';
import * as fromMortgageLoan from 'src/app/modules/mortgage-loan/reducers/mortgage-loan.reducer';
import * as NavigationAction from 'src/app/store/actions/navigation.actions';
import * as fromAppStore from 'src/app/store/app-state.reducer';

import { DropdownSelectComponent } from 'src/app/shared/components/dropdown-select/dropdown-select.component';
import { HighchartWrapperComponent } from 'src/app/shared/components/highcharts-wrapper/highcharts-wrapper.component';
import { SideBarComponent } from 'src/app/shared/components/side-bar/side-bar.component';
import { ToggleButtonComponent } from 'src/app/shared/components/toggle-button/toggle-button.component';

import { MortgageLoanCompareBodyComponent } from './components/mortgage-loan-compare-body/mortgage-loan-compare-body.component';
import { MortgageLoanCompareHeaderComponent } from './components/mortgage-loan-compare-header/mortgage-loan-compare-header.component';
import { CompareRatesTrendChartUtils } from './utils/compare-loan-rates-trend.chart.util';

@Component({
  selector: 'app-mortgage-loan-compare',
  imports: [
    CommonModule,
    SideBarComponent,
    ToggleButtonComponent,
    DropdownSelectComponent,
    HighchartWrapperComponent,
    MortgageLoanCompareHeaderComponent,
    MortgageLoanCompareBodyComponent,
  ],
  templateUrl: './mortgage-loan-compare.component.html',
  styleUrls: ['./mortgage-loan-compare.component.scss'],
})
export class MortgageLoanCompareComponent {
  repaymentSchedules = toSignal(
    this.store.select(fromMortgageLoan.getRepaymentSchedules),
    { initialValue: [] },
  );

  baseRepaymentSchedule = toSignal(
    this.store.select(fromMortgageLoan.getBaseRepaymentSchedule),
  );

  selectedLeftValue = toSignal(
    this.store.select(
      fromMortgageLoanCompare.getLeftSelectedRepaymentScheduleName,
    ),
  );

  selectedRightValue = toSignal(
    this.store.select(
      fromMortgageLoanCompare.getRightSelectedRepaymentScheduleName,
    ),
  );

  repaymentSchedulesOptions = computed(() => [
    'No Selection',
    ...this.repaymentSchedules().map((r) => r.name),
  ]);

  leftRepaymentSchedule = computed(() =>
    this.repaymentSchedules().find((r) => r.name === this.selectedLeftValue()),
  );

  rightRepaymentSchedule = computed(() =>
    this.repaymentSchedules().find((r) => r.name === this.selectedRightValue()),
  );

  compareRatesTrendChart = computed(() =>
    CompareRatesTrendChartUtils.getChart(
      this.leftRepaymentSchedule(),
      this.rightRepaymentSchedule(),
    ),
  );

  constructor(private store: Store<fromAppStore.AppState>) {
    effect(() => {
      const rs = this.repaymentSchedules();
      if (!rs.length) return;
      const [first, second] = rs.filter((r) => !r.isBasePayment);

      if (!this.selectedLeftValue()) {
        if (!second) return;

        this.store.dispatch(
          MortgageLoanCompareActions.selectedLeftMortgageLoanChanged({
            selected: second.name,
          }),
        );
      }

      if (!this.selectedRightValue()) {
        if (!first) return;

        this.store.dispatch(
          MortgageLoanCompareActions.selectedRightMortgageLoanChanged({
            selected: first.name,
          }),
        );
      }
    });
  }

  onSelectionChange(module: string) {
    this.store.dispatch(
      NavigationAction.navigateTo({
        route: `/mortgage-loan/${module.toLowerCase()}`,
      }),
    );
  }

  onLeftDropdownSelected(value: string) {
    this.store.dispatch(
      MortgageLoanCompareActions.selectedLeftMortgageLoanChanged({
        selected: value,
      }),
    );
  }

  onRightDropdownSelected(value: string) {
    this.store.dispatch(
      MortgageLoanCompareActions.selectedRightMortgageLoanChanged({
        selected: value,
      }),
    );
  }
}
