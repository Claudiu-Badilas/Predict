import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { NumberFormatPipe } from 'src/app/shared/pipes/number-format.pipe';
import { TransactionDomain } from '../../models/transactions.model';

interface MonthlyGroup {
  month: string;
  year: number;
  monthIndex: number;
  totalIncome: number;
  totalExpense: number;
  multiple: GroupedTransaction[];
  single: GroupedTransaction[];
}

interface GroupedTransaction {
  provider: string;
  count: number;
  total: number;
  currency: string | null;
}

@Component({
  selector: 'p-monthly-most-common-transaction',
  imports: [CommonModule, NumberFormatPipe],
  templateUrl: './monthly-most-common-transaction.component.html',
  styleUrls: ['./monthly-most-common-transaction.component.scss'],
})
export class MonthlyMostCommonTransactionComponent {
  transactions = input<TransactionDomain[]>([], { alias: 'transactions' });

  totalIncomeAll = computed(() => {
    const transactions = this.transactions();
    if (!transactions?.length) return 0;
    return transactions
      .filter((tx) => (tx.amount ?? 0) > 0)
      .reduce((sum, tx) => sum + (tx.amount ?? 0), 0);
  });

  totalExpenseAll = computed(() => {
    const transactions = this.transactions();
    if (!transactions?.length) return 0;
    const total = transactions
      .filter((tx) => (tx.amount ?? 0) < 0)
      .reduce((sum, tx) => sum + (tx.amount ?? 0), 0);
    return Math.abs(total);
  });

  groupedByMonth = computed(() => {
    const transactions = this.transactions();
    if (!transactions?.length) return [];

    // Group transactions by month/year
    const transactionsByMonth = new Map<string, TransactionDomain[]>();

    transactions.forEach((tx) => {
      const date = tx.completionDate || tx.registrationDate;
      if (!date) return;

      const year = date.getFullYear();
      const month = date.getMonth();
      const key = `${year}-${month}`;

      if (!transactionsByMonth.has(key)) {
        transactionsByMonth.set(key, []);
      }
      transactionsByMonth.get(key)!.push(tx);
    });

    // Process each month
    const monthlyGroups: MonthlyGroup[] = [];

    for (const [key, monthTransactions] of transactionsByMonth.entries()) {
      const [year, monthIndex] = key.split('-').map(Number);
      const monthName = new Date(year, monthIndex).toLocaleString('default', {
        month: 'long',
      });

      // Calculate totals
      let totalIncome = 0;
      let totalExpense = 0;
      monthTransactions.forEach((tx) => {
        const amount = tx.amount ?? 0;
        if (amount > 0) {
          totalIncome += amount;
        } else if (amount < 0) {
          totalExpense += Math.abs(amount);
        }
      });

      // Group transactions within the month by provider
      const grouped = this.groupTransactions(monthTransactions);

      monthlyGroups.push({
        month: monthName,
        year: year,
        monthIndex: monthIndex,
        totalIncome: totalIncome,
        totalExpense: totalExpense,
        multiple: grouped.filter((g) => g.count >= 2),
        single: grouped.filter((g) => g.count === 1),
      });
    }

    // Sort by year (descending) and month (descending)
    return monthlyGroups.sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      return b.monthIndex - a.monthIndex;
    });
  });

  private groupTransactions(
    transactions: TransactionDomain[],
  ): GroupedTransaction[] {
    const grouped = transactions.reduce(
      (acc, tx) => {
        const key = tx.serviceProvider || 'Unknown';
        if (!acc[key]) {
          acc[key] = {
            provider: key,
            count: 0,
            total: 0,
            currency: tx.currency,
          };
        }
        acc[key].count++;
        acc[key].total += tx.amount ?? 0;
        return acc;
      },
      {} as Record<string, GroupedTransaction>,
    );

    return Object.values(grouped).sort((a, b) => {
      if (a.count !== b.count) return b.count - a.count;
      return Math.abs(b.total) - Math.abs(a.total);
    });
  }
}
