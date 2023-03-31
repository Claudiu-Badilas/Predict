import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionRoutingModule } from './transaction.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [CommonModule, TransactionRoutingModule, NgbModule],
  declarations: [TransactionComponent],
  exports: [TransactionComponent],
})
export class TransactionModule {}
