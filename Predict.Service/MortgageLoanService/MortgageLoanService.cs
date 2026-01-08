using Predict.Reader.Mortgage;
using Predict.Service.CacheServicel;
using Predict.Types;

namespace Predict.Service;

public class MortgageLoanService(ICacheService cache) : IMortgageLoanService
{
    public List<MortgageTypes.GraficRambursare> GetBcrMortgageLoans()
    {
        var mortgageLoans = cache.GetOrSet(
            "getBcrMorgages",
            BCRMortgageMapper.getBcrMorgages,
            TimeSpan.FromMinutes(15));

        return [.. mortgageLoans];
    }
}
