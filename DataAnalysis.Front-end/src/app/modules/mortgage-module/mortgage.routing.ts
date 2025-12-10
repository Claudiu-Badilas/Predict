import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MortgageOverviewComponent } from './mortgage-overview/mortgage-overview.component';
import { MortgageComponent } from './mortgage.component';
import { MortgageModule } from './mortgage.module';

const routes: Routes = [
  {
    path: 'mortgage',
    component: MortgageComponent,
    children: [
      {
        path: 'overview',
        component: MortgageOverviewComponent,
      },
    ],
  },
];

export const MortgageRoutingModule: ModuleWithProviders<MortgageModule> =
  RouterModule.forChild(routes);
