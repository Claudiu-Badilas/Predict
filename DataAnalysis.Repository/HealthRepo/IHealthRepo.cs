using DataAnalysis.Repository.HealthRepo.Models;
using DataAnalysis.Repository.TransactionRepo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAnalysis.Repository.HealthRepo {
    public interface IHealthRepo {
        Task<IEnumerable<HearthRate>> GetHearthRatesByDataOwnerId(int userId, int dataOwnerId, int providerId);
        Task<int> StoreHearthRates(IEnumerable<HearthRate> hearthRates);

    }
}
