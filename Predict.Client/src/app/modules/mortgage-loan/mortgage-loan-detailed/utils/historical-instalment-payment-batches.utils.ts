import {
  HistoricalInstalmentPayment,
  HistoricalInstalmentPaymentBatch,
} from '../models/base-loan-rate.model';

export namespace HistoricalInstalmentPaymentBatchesUtils {
  export function getHistoricalInstalmentPaymentBatches(
    overviewBaseLoanInstalments: HistoricalInstalmentPayment[],
  ): HistoricalInstalmentPaymentBatch[] {
    if (!overviewBaseLoanInstalments?.length) return [];

    const batches: HistoricalInstalmentPaymentBatch[] = [];
    let tempBatch: HistoricalInstalmentPayment[] = [];

    overviewBaseLoanInstalments.forEach((current, index, array) => {
      const next = array[index + 1];

      tempBatch.push(current);

      if (current.instalmentPayment || current.earlyPayment) {
        if (next && !next.earlyPayment) {
          batches.push(new HistoricalInstalmentPaymentBatch(tempBatch));
          tempBatch = [];
        }
      }
      if ((!current.instalmentPayment && !current.earlyPayment) || !next) {
        batches.push(new HistoricalInstalmentPaymentBatch(tempBatch));
        tempBatch = [];
      }
    });

    return batches;
  }
}
