using static Predict.Reader.MortgageLoan.BCR.Types.BCRMortgageLoanTypes;

namespace Predict.Service;

public interface IMortgageLoanService
{
    List<GraficRambursare> GetBcrMortgageLoans();

}
