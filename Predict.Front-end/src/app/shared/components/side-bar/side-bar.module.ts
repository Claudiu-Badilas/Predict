import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { SideBarComponent } from 'src/app/shared/components/side-bar/side-bar.component';
import { TripleClickDirective } from '../../directives/triple-click.directive';

@NgModule({
  declarations: [SideBarComponent],
  imports: [CommonModule, TripleClickDirective],
  exports: [SideBarComponent],
})
export class SideBarModule {}
