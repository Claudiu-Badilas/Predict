import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RangeSelectorComponent } from 'src/app/shared/components/date-range-picker/date-range-picker.component';
import { SideBarModule } from 'src/app/shared/components/side-bar/side-bar.module';
import { TransactionComponent } from './transaction.component';
import { TransactionRoutingModule } from './transaction.routing';

@NgModule({
  imports: [
    CommonModule,
    TransactionRoutingModule,
    NgbModule,
    SideBarModule,
    RangeSelectorComponent,
  ],
  declarations: [TransactionComponent],
  exports: [TransactionComponent],
})
export class TransactionModule {}
