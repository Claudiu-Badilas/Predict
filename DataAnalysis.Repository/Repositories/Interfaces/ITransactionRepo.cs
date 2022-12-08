using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace DataAnalysis.Repository.Repositories.Interfaces {
    public interface ITransactionRepo {
        public void InsertTransactions(Transaction transactions );
    }
}
