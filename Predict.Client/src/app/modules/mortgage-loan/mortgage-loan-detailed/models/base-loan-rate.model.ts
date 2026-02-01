export type HistocialInstalmentPayment = {
  index: number;
  paymentDate: Date;
  principalAmount: number;
  interestAmount: number;
  remainingBalance: number;
  instalmentPayment: boolean;
  earlyPayment: boolean;
};
