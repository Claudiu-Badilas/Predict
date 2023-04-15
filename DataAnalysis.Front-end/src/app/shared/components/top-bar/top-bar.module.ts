import { NgModule } from '@angular/core';
import { TopBarComponent } from './top-bar.component';
import { DropdownModule } from 'primeng/dropdown';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [TopBarComponent],
  imports: [CommonModule, DropdownModule, NgbDropdownModule],
  exports: [TopBarComponent],
  providers: [],
})
export class TopBarModule {}
