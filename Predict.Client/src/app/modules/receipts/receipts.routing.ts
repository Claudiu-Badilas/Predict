import { Routes } from '@angular/router';
import { AuthenticationGuard } from 'src/app/platform/authentication/guard/authentication.guard';
import { ReceiptsProductsComponent } from './receipts-products/receipts-products.component';
import { ReceiptsSummaryComponent } from './receipts-summary/receipts-summary.component';
import { ReceiptsComponent } from './receipts.component';

export const receiptsRoutes: Routes = [
  {
    path: 'receipts',
    component: ReceiptsComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: 'summary',
        component: ReceiptsSummaryComponent,
      },
      {
        path: 'products',
        component: ReceiptsProductsComponent,
      },
    ],
  },
];
