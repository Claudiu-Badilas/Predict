using Dapper;
using Npgsql;
using DataAnalysis.Common.Configuration;
using DataAnalysis.Repository.TransactionRepo.Models;
using DataAnalysis.Repository.ReceiptRepo.Models;

namespace DataAnalysis.Repository.TransactionRepo {
    public class TransactionRepo : ITransactionRepo {

        private string _npsqlConnectionString;

        public TransactionRepo(IEnvironmentConfiguration envConfig) {
            _npsqlConnectionString = envConfig.GetNpsqlConnectionString();
        }

        public async Task<IEnumerable<TransactionResponse>> GetTransactionByUserIdAndOwnerId(int userId, int ownerId, DateTime startDate, DateTime endDate) {
            using (var connection = new NpgsqlConnection(_npsqlConnectionString)) {
                connection.Open();
                var sql = @"
                    SELECT 
                        t.id as Id, 
                        t.registration_date as RegistrationDate, 
                        t.completition_date as CompletitionDate, 
                        t.amount as Amount, 
                        t.fee as Fee, 
                        t.description as Description, 
                        t.reference_id as ReferenceId, 
                        p.""name""  as Provider, 
                        c.""type""  as Currency, 
                        tt.""type""  as TransactionType, 
                        do2.id as DataOwnerId
                    FROM public.""transaction"" t
                    JOIN public.data_owner do2 on do2.id = t.data_owner_id
                    JOIN public.""user"" u on u.id = do2.user_id
                    JOIN public.currency c ON c.id = t.currency_id
                    JOIN public.provider p ON p.id = t.provider_id 
                    JOIN public.transaction_type tt ON tt.id = t.transaction_type_id  
                    WHERE u.id = @userId 
                        AND do2.id = @ownerId
                        AND t.completition_date >= @startDate
                        AND t.completition_date <= @endDate;";

                return await connection.QueryAsync<TransactionResponse>(sql, new {
                    userId,
                    ownerId,
                    startDate,
                    endDate
                });
            };
        }

        public async Task<IEnumerable<string>> GetTransactionIds(int dataOwnerId, int providerId) {
            using (var connection = new NpgsqlConnection(_npsqlConnectionString)) {
                connection.Open();
                var sql = @"
                    SELECT identifier 
                    FROM public.""transaction"" t
                    WHERE t.data_owner_id = @dataOwnerId
                        AND t.provider_id = @providerId;";

                return await connection.QueryAsync<string>(sql, new { dataOwnerId, providerId });
            };
        }

        public async Task<int> StoreTransactions(IEnumerable<Transaction> transactions) {
            using (var connection = new NpgsqlConnection(_npsqlConnectionString)) {
                connection.Open();
                var sql = @"
                    INSERT INTO public.""transaction"" (
                        identifier, registration_date, completition_date, amount, fee, description, 
                        reference_id, provider_id, currency_id, transaction_type_id, data_owner_id )
                    VALUES (
                        unnest(@identifiers),
                        unnest(@registrationDates),
                        unnest(@completionDates),
                        unnest(@amounts),
                        unnest(@fees),
                        unnest(@descriptions),
                        unnest(@reference_ids),
                        unnest(@provider_ids),
                        unnest(@currency_ids),
                        unnest(@transaction_type_ids),
                        unnest(@data_owner_ids)
                    );";

                return await connection.ExecuteAsync(sql, transactions.Select(t => new {
                    identifiers = transactions.Select(x => x.Identifier).ToList(),
                    registrationDates = transactions.Select(x => x.RegistrationDate).ToList(),
                    completionDates = transactions.Select(x => x.CompletionDate).ToList(),
                    amounts = transactions.Select(x => x.Amount).ToList(),
                    fees = transactions.Select(x => x.Fee).ToList(),
                    descriptions = transactions.Select(x => x.Description).ToList(),
                    reference_ids = transactions.Select(x => x.ReferenceId).ToList(),
                    provider_ids = transactions.Select(x => x.ProviderId).ToList(),
                    currency_ids = transactions.Select(x => x.CurrencyId).ToList(),
                    transaction_type_ids = transactions.Select(x => x.TransactionTypeId).ToList(),
                    data_owner_ids = transactions.Select(x => x.DataOwnerId).ToList()
                }));
            };
        }
    }
}
