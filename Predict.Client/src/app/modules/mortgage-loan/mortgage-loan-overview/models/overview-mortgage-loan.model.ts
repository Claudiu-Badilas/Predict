import { Colors } from 'src/app/shared/styles/colors';
import { JsDateUtils } from 'src/app/shared/utils/js-date.utils';
import { RepaymentSchedule } from '../../models/mortgage.model';

export type OverviewLoanInstalment = {
  instalmentId: number | null;
  paymentDate: Date | null;
  interestAmount: number | null;
  principalAmount: number | null;
  administrationFee: number | null;
  insuranceCost: number | null;
  managementFee: number | null;
  recalculatedInterest: number | null;
  totalInstalment: number | null;
  remainingBalance: number | null;
  instalmentPayment: boolean;
  earlyPayment: boolean;
  disabled: boolean;
  color: string;
};

export type OverviewRepaymentSchedule = {
  name: string;
  overviewLoanRates: OverviewLoanInstalment[];
};

export function mapBaseRepaymentScheduleToOverview(
  base: RepaymentSchedule,
  startDate: Date,
  selectedLoanRates: number[],
): OverviewRepaymentSchedule | null {
  if (!base) return null;

  const overviewLoanRates: OverviewLoanInstalment[] =
    base.monthlyInstalments.map((r) => {
      const disabled = JsDateUtils.isBefore(r.paymentDate, startDate);

      const earlyPayment = selectedLoanRates.some((s) => s === r.instalmentId);
      return {
        instalmentId: r.instalmentId,
        paymentDate: r.paymentDate,
        interestAmount: r.interestAmount,
        principalAmount: r.principalAmount,
        administrationFee: r.administrationFee,
        insuranceCost: r.insuranceCost,
        managementFee: r.managementFee,
        recalculatedInterest: r.recalculatedInterest,
        totalInstalment: r.totalInstalment,
        remainingBalance: r.remainingBalance,
        instalmentPayment: false,
        earlyPayment: !disabled && earlyPayment,
        disabled: disabled,
        color: getColor(disabled, false, earlyPayment),
      } as OverviewLoanInstalment;
    });

  return {
    name: base.name,
    overviewLoanRates,
  } as OverviewRepaymentSchedule;
}
function getColor(
  disabled: boolean,
  instalmentPayment: boolean,
  earlyPayment: boolean,
): string {
  if (disabled) return Colors.GRAY_200;
  if (instalmentPayment) return Colors.BLUE_200;
  if (earlyPayment) return Colors.GREEN_200;
  return 'white';
}
