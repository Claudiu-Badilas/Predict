import { TransactionComponent } from './transaction.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'src/app/platform/authentication/guard/authentication.guard';

export const transactionRoutes: Routes = [
  {
    path: 'transactions',
    component: TransactionComponent,
    canActivate: [AuthenticationGuard],
  },
];
