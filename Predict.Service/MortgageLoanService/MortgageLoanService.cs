using Predict.Reader.MortgageLoan.BCR;
using Predict.Service.CacheServicel;
using static Predict.Reader.MortgageLoan.BCR.Types.BCRMortgageLoanTypes;

namespace Predict.Service;

public class MortgageLoanService(ICacheService cache) : IMortgageLoanService
{
    public List<GraficRambursare> GetBcrMortgageLoans()
    {
        var mortgageLoans = cache.GetOrSet(
            "getBcrMorgages",
            BCRMortgageLoanReader.getBcrMorgages,
            TimeSpan.FromMinutes(15));

        return [.. mortgageLoans];
    }
}
