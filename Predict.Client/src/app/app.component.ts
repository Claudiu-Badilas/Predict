import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { TopBarComponent } from './shared/components/top-bar/top-bar.component';
import { ToastNotificationComponent } from './platform/toast-notifications/toast-notification.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    SpinnerComponent,
    TopBarComponent,
    ToastNotificationComponent,
  ],
  template: `
    <app-spinner />
    <app-top-bar />
    <app-toast />
    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {}
