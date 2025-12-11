import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private httpClient: HttpClient) {}

  getTransactions(startDate: Date, endDate: Date): Observable<any[]> {
    return this.httpClient
      .get<any[]>(
        `https://localhost:8080/api/v1/free-transactions/1?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
      )
      .pipe(map((response) => response));
  }
}
