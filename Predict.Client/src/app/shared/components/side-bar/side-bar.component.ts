import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TripleClickDirective } from '../../directives/triple-click.directive';
import { HoldTriggerDirective } from '../../directives/hold-trigger.directive';

@Component({
  selector: 'p-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  imports: [CommonModule, TripleClickDirective, HoldTriggerDirective],
})
export class SideBarComponent {
  isFullSize = true;

  toggleSidebar() {
    this.isFullSize = !this.isFullSize;
  }
}
