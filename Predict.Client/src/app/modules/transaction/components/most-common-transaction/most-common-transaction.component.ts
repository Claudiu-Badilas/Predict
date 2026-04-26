import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionDomain } from '../../models/transactions.model';
import { NumberFormatPipe } from 'src/app/shared/pipes/number-format.pipe';

@Component({
  selector: 'p-most-common-transaction',
  standalone: true,
  imports: [CommonModule, NumberFormatPipe],
  template: `
    <div class="card">
      <div class="header">Most Common Transactions</div>

      <div class="content">
        @for (g of groupedMultiple(); track g.provider) {
          <div class="group">
            <div class="row">
              <span class="provider">{{ g.provider }}</span>
              <span class="count-badge">{{ g.count }}</span>
              <span
                class="amount"
                [class.positive]="g.total > 0"
                [class.negative]="g.total < 0"
              >
                {{ g.total > 0 ? '+' : '' }}{{ g.total | numberFormat: '0.00' }}
              </span>
            </div>
          </div>
        }

        @if (groupedSingle().length) {
          <div class="other-section">
            <div class="other-title">Other</div>
            @for (g of groupedSingle(); track g.provider) {
              <div class="group">
                <div class="row">
                  <span class="provider">{{ g.provider }}</span>
                  <span class="count-badge single">1</span>
                  <span
                    class="amount muted"
                    [class.positive]="g.total > 0"
                    [class.negative]="g.total < 0"
                  >
                    {{ g.total > 0 ? '+' : ''
                    }}{{ g.total | numberFormat: '0.00' }}
                  </span>
                </div>
              </div>
            }
          </div>
        }

        @if (!groupedMultiple().length && !groupedSingle().length) {
          <div class="empty">No transactions</div>
        }
      </div>
    </div>
  `,
  styles: `
    .card {
      background: white;
      border-radius: 4px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      height: 320px;
      display: flex;
      flex-direction: column;
    }

    .header {
      padding: 10px;
      font-weight: 600;
      font-size: 15px;
      border-bottom: 1px solid #eee;
      background: white;
      position: sticky;
      top: 0;
    }

    .content {
      flex: 1;
      overflow-y: auto;
      padding: 8px 0;
    }

    .group {
      padding: 0 25px;
    }

    .row {
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 5px 0;
      border-bottom: 1px solid #f0f0f0;
    }

    .group:last-child .row {
      border-bottom: none;
    }

    .provider {
      font-weight: 500;
      font-size: 14px;
      flex: 1;
    }

    .count-badge {
      background: #eef2ff;
      color: #4f46e5;
      padding: 2px 8px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 600;
      white-space: nowrap;
    }

    .count-badge.single {
      background: #f3f4f6;
      color: #6b7280;
    }

    .amount {
      font-weight: 600;
      font-size: 14px;
      white-space: nowrap;
      min-width: 100px;
      text-align: right;
    }

    .amount.positive {
      color: #10b981;
    }

    .amount.negative {
      color: #ef4444;
    }

    .amount.muted {
      opacity: 0.7;
    }

    .other-section {
      margin-top: 8px;
    }

    .other-title {
      font-size: 11px;
      color: #9ca3af;
      text-transform: uppercase;
      margin: 8px 16px 0;
      padding: 8px 0 4px;
      letter-spacing: 0.5px;
      border-top: 1px dashed #e5e7eb;
    }

    .empty {
      text-align: center;
      padding: 40px 20px;
      color: #9ca3af;
      font-size: 14px;
    }
  `,
})
export class MostCommonTransactionComponent {
  transactions = input<TransactionDomain[]>([], { alias: 'transactions' });

  groupedMultiple = computed(() => {
    const transactions = this.transactions();
    if (!transactions?.length) return [];
    const grouped = this.groupTransactions(transactions);
    return grouped.filter((g) => g.count >= 2);
  });

  groupedSingle = computed(() => {
    const transactions = this.transactions();
    if (!transactions?.length) return [];
    const grouped = this.groupTransactions(transactions);
    return grouped.filter((g) => g.count === 1);
  });

  private groupTransactions(transactions: TransactionDomain[]): any[] {
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
      {} as Record<string, any>,
    );

    return Object.values(grouped).sort((a: any, b: any) => {
      if (a.count !== b.count) return b.count - a.count;
      return Math.abs(b.total) - Math.abs(a.total);
    });
  }
}
