import Highcharts from 'highcharts';
import { NumberFormatPipe } from 'src/app/shared/pipes/number-format.pipe';
import { DateUtils } from 'src/app/shared/utils/date.utils';
import { OverviewRepaymentSchedule } from '../models/overview-mortgage-loan.model';
import { JsDateUtils } from 'src/app/shared/utils/js-date.utils';

export namespace InstalmentSimulationTrendChartUtils {
  export function getChart(
    overviewRepaymentSchedule: OverviewRepaymentSchedule,
  ): Highcharts.Options {
    if (!overviewRepaymentSchedule) return null;

    const totalRows = overviewRepaymentSchedule.overviewLoanInstalments.filter(
      (r) => r.totalRow,
    );

    if (totalRows.length === 0) return null;

    const series: Highcharts.SeriesOptionsType[] = [
      {
        type: 'spline',
        name: `Rata lunara`,
        data: totalRows.map((r) => ({
          x: JsDateUtils.isValidDate(r.newPaymentDate)
            ? r.newPaymentDate.getTime()
            : r.paymentDate.getTime(),
          y: +(r.interestAmount + r.principalAmount)?.toFixed(2),
          date: DateUtils.fromJsDateToString(r.paymentDate),
        })),
      },
    ];

    return {
      title: {
        text: 'Simulare rambursare anticipata',
        align: 'left',
      },
      chart: { zooming: { type: 'x' } },
      xAxis: { type: 'datetime', title: { text: 'Date' } },
      yAxis: { title: { text: 'Amount' } },
      plotOptions: { series: { marker: { enabled: false } } },
      series,
    };
  }
}
