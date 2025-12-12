import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'src/app/platform/authentication/guard/authentication.guard';
import { ReceiptsComponent } from './receipts.component';
import { ReceiptsModule } from './receipts.module';

const routes: Routes = [
  {
    path: 'receipts',
    component: ReceiptsComponent,
    canActivate: [AuthenticationGuard],
  },
];

export const ReceiptsRoutingModule: ModuleWithProviders<ReceiptsModule> =
  RouterModule.forChild(routes);
