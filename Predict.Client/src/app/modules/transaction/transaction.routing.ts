import { Routes } from '@angular/router';
import { TransactionComponent } from './transaction.component';

export const transactionRoutes: Routes = [
  {
    path: '',
    component: TransactionComponent,
    children: [
      { path: 'transactions', component: TransactionComponent },
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
    ],
  },
];
