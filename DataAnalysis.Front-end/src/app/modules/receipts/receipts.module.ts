import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SideBarModule } from 'src/app/shared/components/side-bar/side-bar.module';
import { ReceiptsComponent } from './receipts.component';
import { ReceiptsRoutingModule } from './receipts.routing';

@NgModule({
  imports: [
    CommonModule,
    ReceiptsRoutingModule,
    NgbModule,
    SideBarModule,
    // StoreModule.forFeature('TransactionsState', fromTransactions.reducer),
    // EffectsModule.forFeature([TransactionsEffects]),
  ],
  declarations: [ReceiptsComponent],
  exports: [ReceiptsComponent],
})
export class ReceiptsModule {}
