import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InvoicesService {
  constructor(private httpClient: HttpClient) {}

  getInvoices(startDate: Date, endDate: Date): Observable<any[]> {
    return this.httpClient
      .get<any[]>(
        `/server/api/v1/invoices?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
      )
      .pipe(map((res) => res));
  }
}
