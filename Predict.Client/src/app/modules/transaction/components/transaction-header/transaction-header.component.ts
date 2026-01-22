import { Component, computed, input, Signal } from '@angular/core';
import { HeaderCardComponent } from 'src/app/shared/components/header-card/header-card.component';
import {
  CardSection,
  HeaderCardInput,
} from 'src/app/shared/components/header-card/models/header-card-input.model';
import { TransactionDomain } from '../../models/transactions.model';
import { Calculator } from 'src/app/shared/utils/calculator.utils';

@Component({
  selector: 'app-transaction-header',
  imports: [HeaderCardComponent],
  templateUrl: './transaction-header.component.html',
  styleUrls: ['./transaction-header.component.scss'],
})
export class TransactionHeaderComponent {
  readonly transactions = input.required<TransactionDomain[]>();

  readonly incomes = computed(() =>
    this.transactions()
      .filter((t) => !t.ignored)
      .filter((t) => t.amount > 0),
  );

  readonly totalIncome = computed(() =>
    Calculator.sum(this.incomes().map((a) => a.amount)),
  );

  readonly payments = computed(() =>
    this.transactions()
      .filter((t) => !t.ignored)
      .filter((t) => t.amount < 0),
  );

  readonly totalPayment = computed(() =>
    Calculator.sum(this.payments().map((a) => a.amount)),
  );

  readonly headerCardInputs: Signal<HeaderCardInput[]> = computed(() => [
    {
      sections: [
        {
          label: 'Total Incomes',
          value: this.totalIncome(),
          default: '0.00',
          color: 'green',
        } as CardSection,
        {
          label: 'Total Expenses',
          value: this.totalPayment(),
          default: '0.00',
          color: 'red',
        } as CardSection,
      ],
    } as HeaderCardInput,
  ]);
}
