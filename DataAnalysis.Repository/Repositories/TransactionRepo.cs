using Dapper;
using DataAnalysis.Configuration;
using DataAnalysis.Repository.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace DataAnalysis.Repository.Repositories {
    public class TransactionRepo : ITransactionRepo {

        public TransactionRepo() { }

        }

        public void InsertTransactions(Transaction transactions) {
            using (var connection = _conn.Connect()) {
            using (var connection = new NpgsqlConnection(NpsqlConnectionString)) {
                connection.Open();
                var sql = @" ";
                return (await connection.ExecuteScalarAsync(sql, new { transactions }));
            };
        }
    }
}
