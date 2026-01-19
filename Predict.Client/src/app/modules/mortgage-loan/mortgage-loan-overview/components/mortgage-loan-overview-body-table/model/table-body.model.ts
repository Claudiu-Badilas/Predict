import { OverviewLoanInstalment } from '../../../models/overview-mortgage-loan.model';

export type TableColumn = {
  key: keyof OverviewLoanInstalment | 'rata' | 'anticipat';
  label: string;
  visible: boolean;
};
