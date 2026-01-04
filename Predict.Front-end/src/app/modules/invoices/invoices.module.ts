import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InvoicesComponent } from './invoices.component';
import { InvoicesRoutingModule } from './invoices.routing';

@NgModule({
  imports: [CommonModule, InvoicesRoutingModule],
  declarations: [InvoicesComponent],
  exports: [InvoicesComponent],
})
export class InvoicesModule {}
