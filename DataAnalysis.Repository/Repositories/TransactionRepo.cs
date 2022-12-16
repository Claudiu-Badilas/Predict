using Dapper;
using static DataAnalysis.Common.Configuration.ConfigurationUtils;
using DataAnalysis.Repository.Repositories.Interfaces;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAnalysis.Repository.Models;

namespace DataAnalysis.Repository.Repositories {
    public class TransactionRepo : ITransactionRepo {
        public async Task<IEnumerable<string>> GetTransactionIds(int userId) {
            using (var connection = new NpgsqlConnection(NpsqlConnectionString)) {
                connection.Open();
                var sql = @"
                    SELECT Id 
                    FROM platform.transactions
                    WHERE user_id = @UserId;";

                return await connection.QueryAsync<string>(sql, new { UserId = userId });
            };
        }

        public async Task<int> StoreTransactions(IEnumerable<Transaction> transactions) {
            using (var connection = new NpgsqlConnection(NpsqlConnectionString)) {
                connection.Open();
                var sql = @"
                    INSERT INTO platform.transactions (
                        id, registration_date, completition_date, amount, fee, description, 
                        reference_id, provider_id, currency_id, status_id, transaction_type_id, 
                        user_id )
                    VALUES (
                        @Id, @RegistrationDate, @CompletionDate, @Amount, @Fee, @Description, 
                        @ReferenceId, @ProviderId, @CurrencyId, @StatusId, @TransactionTypeId,
                        @UserId );";

                return await connection.ExecuteAsync(sql, transactions);
            };
        }
    }
}
