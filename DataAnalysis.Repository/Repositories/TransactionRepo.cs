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
        private readonly NpgsqlDbConnection _conn;

        public TransactionRepo(NpgsqlDbConnection conn) {
            _conn = conn;
        }

        public void InsertTransactions(Transaction transactions) {
            using (var connection = _conn.Connect()) {
                connection.Open();
                var sql = @" ";
                return (await connection.ExecuteScalarAsync(sql, new { transactions }));
            };
        }
    }
}
