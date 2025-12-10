import { RepaymentSchedule } from '../../models/mortgage.model';

export type OverviewLoanRate = {
  nrCtr: number | null;
  dataPlatii: string | null;
  rataDobanda: number | null;
  rataCredit: number | null;
  comisionAdministrare: number | null;
  costuruAsigurare: number | null;
  comisionGestiune: number | null;
  dobadaRecalculata: number | null;
  totalRata: number | null;
  soldRestPlata: number | null;
  selected: boolean;
};

export type OverviewRepaymentSchedule = {
  name: string;
  overviewLoanRates: OverviewLoanRate[];
};

export function mapBaseRepaymentScheduleToOverview(
  base: RepaymentSchedule,
  selectedLoanRates: number[]
): OverviewRepaymentSchedule | null {
  if (!base) return null;

  const overviewLoanRates: OverviewLoanRate[] = base.rate.map(
    (r) =>
      ({
        nrCtr: r.nrCtr,
        dataPlatii: r.dataPlatii,
        rataDobanda: r.rataDobanda,
        rataCredit: r.rataCredit,
        comisionAdministrare: r.comisionAdministrare,
        costuruAsigurare: r.costuruAsigurare,
        comisionGestiune: r.comisionGestiune,
        dobadaRecalculata: r.dobadaRecalculata,
        totalRata: r.totalRata,
        soldRestPlata: r.soldRestPlata,
        selected: selectedLoanRates.some((s) => s === r.nrCtr),
      } as OverviewLoanRate)
  );

  return {
    name: base.name,
    overviewLoanRates,
  } as OverviewRepaymentSchedule;
}
