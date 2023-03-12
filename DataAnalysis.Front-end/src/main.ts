import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Route } from '@angular/router';
import { AppComponent } from './app/app.component';

const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./app/transaction/transaction.component').then(
        (m) => m.TransactionComponent
      ),
  },
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(appRoutes)],
}).catch((err) => console.log(err));
