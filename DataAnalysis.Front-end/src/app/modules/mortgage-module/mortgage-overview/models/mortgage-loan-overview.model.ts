import { Rata, RepaymentSchedule } from '../../models/mortgage.model';

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
  base: RepaymentSchedule
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
        selected: true,
      } as OverviewLoanRate)
  );

  console.log(
    '🚀 ~ mapBaseRepaymentScheduleToOverview ~ overviewLoanRates:',
    overviewLoanRates
  );
  return {
    name: base.name,
    overviewLoanRates,
  } as OverviewRepaymentSchedule;
}
