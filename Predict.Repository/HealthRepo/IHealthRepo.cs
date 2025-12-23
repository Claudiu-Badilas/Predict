using Predict.Repository.HealthRepo.Models;

namespace Predict.Repository.HealthRepo;

public interface IHealthRepo {
    Task<IEnumerable<HearthRate>> GetHearthRatesByDataOwnerId(int userId, int dataOwnerId, int providerId);
    Task<int> StoreHearthRates(IEnumerable<HearthRate> hearthRates);

}