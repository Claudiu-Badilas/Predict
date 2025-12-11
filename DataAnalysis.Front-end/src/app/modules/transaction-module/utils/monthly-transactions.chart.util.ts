import { Colors } from 'src/app/shared/styles/colors';
import { CalculatorUtil } from 'src/app/shared/utils/calculator.utils';
import { ObjectUtil } from 'src/app/shared/utils/object.utils';
import { TransactionDomain } from '../models/transactions.model';

export namespace MonthlyTransactionChartUtils {
  export function getChart(
    startDate: Date,
    endDate: Date,
    transactions: TransactionDomain[]
  ): Highcharts.Options {
    const validTransactions = transactions.filter((t) => !t.ignored);
    const incomes = validTransactions.filter((t) => t.amount > 0);
    const expenses = validTransactions.filter((t) => t.amount < 0);

    const groupTransactionByDate = (trans: TransactionDomain[]) =>
      ObjectUtil.groupBy(trans, (t) =>
        t.registrationDate.toLocaleString('en-US', {
          month: 'short',
          year: 'numeric',
        })
      );
    const groupedIncomesByMonth = groupTransactionByDate(incomes);
    const groupedExpensesByMonth = groupTransactionByDate(expenses);

    const categories = getAvailableMonths(startDate, endDate);
    const getData = (group: Record<string, TransactionDomain[]>) =>
      categories.map((cat) =>
        CalculatorUtil.sum((group[cat] ?? []).map((t) => t.amount))
      );

    const incomesData = getData(groupedIncomesByMonth);
    const expensesData = getData(groupedExpensesByMonth).map((d) =>
      Math.abs(d)
    );

    return {
      chart: { type: 'column' },
      title: { text: 'Monthly Transactions' },
      xAxis: { categories },
      yAxis: { title: { text: 'Amount (RON)' } },
      series: [
        {
          type: 'column',
          name: 'Income',
          color: Colors.GREEN_500,
          data: incomesData,
        },
        {
          type: 'column',
          name: 'Expenses',
          color: Colors.PINK_500,
          data: expensesData,
        },
      ],
    };
  }

  function getAvailableMonths(startDate: Date, endDate: Date): string[] {
    const result: string[] = [];

    let current = new Date(Math.min(startDate.getTime(), endDate.getTime()));
    const last = new Date(Math.max(startDate.getTime(), endDate.getTime()));

    current.setDate(1);
    last.setDate(1);

    while (current <= last) {
      result.push(
        current.toLocaleString('en-US', { month: 'short', year: 'numeric' })
      );
      current = new Date(current.getFullYear(), current.getMonth() + 1, 1);
    }

    return result;
  }
}
