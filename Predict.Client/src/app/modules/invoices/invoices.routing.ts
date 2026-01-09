import { Routes } from '@angular/router';
import { InvoicesDetailedComponent } from './invoices-detailed/invoices-detailed.component';
import { InvoicesOverviewComponent } from './invoices-overview/invoices-overview.component';
import { InvoicesComponent } from './invoices.component';

export const invoicesRoutes: Routes = [
  {
    path: '',
    component: InvoicesComponent,
    children: [
      { path: 'overview', component: InvoicesOverviewComponent },
      { path: 'detailed', component: InvoicesDetailedComponent },
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
    ],
  },
];
