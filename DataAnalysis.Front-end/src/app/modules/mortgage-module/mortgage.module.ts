import { NgModule } from '@angular/core';
import { MortgageDetailedComponent } from './mortgage-detailed/mortgage-detailed.component';
import { MortgageOverviewComponent } from './mortgage-overview/mortgage-overview.component';
import { MortgageComponent } from './mortgage.component';
import { MortgageRoutingModule } from './mortgage.routing';

@NgModule({
  imports: [
    MortgageRoutingModule,
    MortgageOverviewComponent,
    MortgageDetailedComponent,
  ],
  declarations: [MortgageComponent],
  exports: [MortgageComponent],
})
export class MortgageModule {}
