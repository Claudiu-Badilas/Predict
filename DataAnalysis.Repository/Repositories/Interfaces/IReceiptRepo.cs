using DataAnalysis.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAnalysis.Repository.Repositories.Interfaces {
    public interface IReceiptRepo {
        Task<IEnumerable<Receipt>> GetReceiptByUserId(int userId);
        public Task<int> StoreReceipts(IEnumerable<Receipt> receipts);
        public Task<int> StorePurchasedProducts(IEnumerable<PurchasedProduct> purchasedProducts);
    }
}
