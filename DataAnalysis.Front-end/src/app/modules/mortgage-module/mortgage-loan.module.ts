import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import * as fromMortgageLoan from 'src/app/modules/mortgage-module/state-management/mortgage-loan.reducer';
import { DetailedMortgageLoanComponent } from './detailed-mortgage-loan/detailed-mortgage-loan.component';
import { MortgageLoanComponent } from './mortgage-loan.component';
import { MortgageLoanRoutingModule } from './mortgage-loan.routing';
import { OverviewMortgageLoanComponent } from './overview-mortgage-loan/overview-mortgage-loan.component';
import { MortgageLoanEffects } from './state-management/mortgage-loan.effects';

@NgModule({
  imports: [
    MortgageLoanRoutingModule,
    OverviewMortgageLoanComponent,
    DetailedMortgageLoanComponent,
    StoreModule.forFeature('MortgageLoanState', fromMortgageLoan.reducer),
    EffectsModule.forFeature([MortgageLoanEffects]),
  ],
  declarations: [MortgageLoanComponent],
  exports: [MortgageLoanComponent],
})
export class MortgageLoanModule {}
