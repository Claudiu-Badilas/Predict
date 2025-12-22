import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import * as fromMortgageLoan from 'src/app/modules/mortgage-module/state-management/mortgage-loan.reducer';
import { DropdownSelectComponent } from 'src/app/shared/components/dropdown-select/dropdown-select.component';
import { SideBarModule } from 'src/app/shared/components/side-bar/side-bar.module';
import { ToggleButtonComponent } from 'src/app/shared/components/toggle-button/toggle-button.component';
import * as fromAppStore from 'src/app/store/app-state.reducer';
import * as NavigationAction from 'src/app/store/navigation-state/navigation.actions';

import { MortgageLoanCompareBodyComponent } from './components/mortgage-loan-compare-body/mortgage-loan-compare-body.component';

@Component({
  selector: 'app-mortgage-loan-compare',
  imports: [
    CommonModule,
    SideBarModule,
    ToggleButtonComponent,
    MortgageLoanCompareBodyComponent,
    DropdownSelectComponent,
  ],
  templateUrl: './mortgage-loan-compare.component.html',
  styleUrls: ['./mortgage-loan-compare.component.scss'],
})
export class MortgageLoanCompareComponent {
  repaymentSchedules$ = this.store.select(
    fromMortgageLoan.getRepaymentSchedules
  );

  repaymentSchedulesOptions$ = this.repaymentSchedules$.pipe(
    map((rs) => rs.map((r) => r.name))
  );

  selectedLeftValue$ = new BehaviorSubject<string>('No Selection');
  selectedRightValue$ = new BehaviorSubject<string>('No Selection');

  leftRepaymentSchedules$ = combineLatest([
    this.repaymentSchedules$,
    this.selectedLeftValue$,
  ]).pipe(map(([rs, selected]) => rs.find((r) => r.name === selected)));

  rightRepaymentSchedules$ = combineLatest([
    this.repaymentSchedules$,
    this.selectedRightValue$,
  ]).pipe(map(([rs, selected]) => rs.find((r) => r.name === selected)));

  constructor(private store: Store<fromAppStore.AppState>) {}

  onSelectionChange(module: string) {
    this.store.dispatch(
      NavigationAction.navigateTo({
        route: `/mortgage-loan/${module.toLowerCase()}`,
      })
    );
  }

  onLeftDropdownSelected(event: string) {
    this.selectedLeftValue$.next(event);
  }

  onRightDropdownSelected(event: string) {
    this.selectedRightValue$.next(event);
  }
}
