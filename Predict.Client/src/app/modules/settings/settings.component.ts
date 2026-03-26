import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { SideBarComponent } from 'src/app/shared/components/side-bar/side-bar.component';
import { TopBarComponent } from 'src/app/shared/components/top-bar/top-bar.component';
import * as NavigationAction from 'src/app/store/actions/navigation.actions';
import * as fromAppStore from 'src/app/store/app-state.reducer';

@Component({
  selector: 'p-settings',
  imports: [RouterModule, TopBarComponent, SideBarComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  modules = [
    { name: 'Mortgage', url: 'mortgage-loan' },
    { name: 'Transactions', url: 'transactions' },
    { name: 'Invoices', url: 'invoices' },
    { name: 'Receipts', url: 'receipts' },
  ];

  store = inject(Store<fromAppStore.AppState>);

  onNavigateTo(url: string) {
    this.store.dispatch(
      NavigationAction.navigateTo({ route: `settings/${url}` }),
    );
  }
}
