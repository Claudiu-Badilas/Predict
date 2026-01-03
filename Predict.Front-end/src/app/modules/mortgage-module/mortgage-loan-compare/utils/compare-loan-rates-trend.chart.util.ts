import Highcharts from 'highcharts';
import { DateUtils } from 'src/app/shared/utils/date.utils';
import { RepaymentSchedule } from '../../models/mortgage.model';
import { Colors } from 'src/app/shared/styles/colors';

export namespace CompareRatesTrendChartUtils {
  export function getChart(
    left: RepaymentSchedule,
    right: RepaymentSchedule
  ): Highcharts.Options {
    if (!left || !right) return null;

    const sources: Array<[RepaymentSchedule, string]> = [
      [left, Colors.TEAL_400],
      [right, Colors.BS_DANGER],
    ];

    const series: any[] = sources.flatMap(([repaymentSchedule, color]) => [
      {
        type: 'spline',
        color,
        name: `Loan ${repaymentSchedule.name}`,
        data: repaymentSchedule.rate.map((r) => ({
          x: r.dataPlatii.getTime(),
          y: Number(r.rataCredit.toFixed(2)),
          date: DateUtils.fromJsDateToString(r.dataPlatii),
        })),
      },
    ]);

    return {
      title: { text: 'Loan Rates Trend', align: 'left' },
      chart: { type: 'spline', zooming: { type: 'x' } },
      xAxis: { type: 'datetime', title: { text: 'Date' } },
      yAxis: { title: { text: 'Amount' } },
      plotOptions: { series: { marker: { enabled: false } } },
      tooltip: {
        shared: true,
        useHTML: true,
        formatter: function () {
          const points = (this as any).points;

          const date = points?.[0]?.point?.date;
          return `
            <b>Date: ${date}</b><br/>
            ${points
              .map(
                (p: any) =>
                  `<span style="color:${p.series.color}">●</span>
                  ${p.series.name}: <b>${p.y}</b><br/>`
              )
              .join('')}
          `;
        },
      },
      series,
    };
  }
}
