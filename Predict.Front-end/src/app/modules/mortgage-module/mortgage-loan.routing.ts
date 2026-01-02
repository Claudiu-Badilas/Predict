import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MortgageLoanCompareComponent } from './mortgage-loan-compare/mortgage-loan-compare.component';
import { MortgageLoanDetailedComponent } from './mortgage-loan-detailed/mortgage-loan-detailed.component';
import { MortgageLoanOverviewComponent } from './mortgage-loan-overview/mortgage-loan-overview.component';
import { MortgageLoanComponent } from './mortgage-loan.component';
import { MortgageLoanModule } from './mortgage-loan.module';

const routes: Routes = [
  {
    path: 'mortgage-loan',
    component: MortgageLoanComponent,
    children: [
      {
        path: 'overview',
        component: MortgageLoanOverviewComponent,
      },
      {
        path: 'compare',
        component: MortgageLoanCompareComponent,
      },
      {
        path: 'detailed',
        component: MortgageLoanDetailedComponent,
      },
    ],
  },
];

export const MortgageLoanRoutingModule: ModuleWithProviders<MortgageLoanModule> =
  RouterModule.forChild(routes);
