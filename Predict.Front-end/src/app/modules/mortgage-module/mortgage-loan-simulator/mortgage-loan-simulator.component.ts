import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromMortgageLoan from 'src/app/modules/mortgage-module/state-management/mortgage-loan.reducer';
import { SideBarModule } from 'src/app/shared/components/side-bar/side-bar.module';
import { ToggleButtonComponent } from 'src/app/shared/components/toggle-button/toggle-button.component';
import * as NavigationAction from 'src/app/store/actions/navigation.actions';

@Component({
  selector: 'app-mortgage-loan-simulator',
  imports: [CommonModule, SideBarModule, ToggleButtonComponent],
  templateUrl: './mortgage-loan-simulator.component.html',
  styleUrl: './mortgage-loan-simulator.component.scss',
})
export class MortgageLoanSimulatorComponent {
  constructor(private store: Store<fromMortgageLoan.MortgageLoanState>) {}

  onSelectionChange(module: string) {
    this.store.dispatch(
      NavigationAction.navigateTo({
        route: `/mortgage-loan/${module.toLowerCase()}`,
      })
    );
  }
}
