import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { TopBarComponent } from './shared/components/top-bar/top-bar.component';
import { ToastNotificationComponent } from './platform/toast-notifications/toast-notification.component';

@Component({
  selector: 'p-root',
  imports: [
    RouterModule,
    SpinnerComponent,
    TopBarComponent,
    ToastNotificationComponent,
  ],
  template: `
    <p-spinner />
    <p-top-bar />
    <p-toast />
    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {}
