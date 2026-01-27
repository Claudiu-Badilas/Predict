export type OverviewLoanInstalment = {
  instalmentId: number | null;
  paymentDate: Date | null;
  newPaymentDate: Date | null;
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
  totalRow: boolean;
};

export type OverviewRepaymentSchedule = {
  name: string;
  overviewLoanInstalments: OverviewLoanInstalment[];
};

export class MonthlyInstalmentManager {
  public compleated: boolean = false;
  public expanded: boolean = true;

  constructor(
    public instalments: OverviewLoanInstalment[],
    { compleated = false, expanded = true } = {},
  ) {
    this.compleated = compleated;
    this.expanded = expanded;
  }
}
