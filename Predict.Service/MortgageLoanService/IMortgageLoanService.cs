using Predict.Repository.UserRepo.Models;
using static Predict.Types.MortgageTypes;

namespace Predict.Service;

public interface IMortgageLoanService
{
    List<GraficRambursare> GetBcrMortgageLoans();

}
