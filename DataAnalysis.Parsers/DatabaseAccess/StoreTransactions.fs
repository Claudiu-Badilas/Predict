namespace DataAnalysis.DatabaseAccess

open DataAnalysis.Repository.Repositories
open DataAnalysis.Repository.Models
open DataAnalysis.Types.ParsersTypes
open System
open DataAnalysis.DatabaseAccess.StorerUtils


module StoreTransactions =
    
    let filterDublicates (storedTransactionIds: string list) (transactions: Transaction list) =
        transactions
        |> List.filter(fun t -> not (storedTransactionIds |> List.exists(fun st -> t.Id = st)))
        
    
    
    let storeTransaction userId (parsedTransactions: ParsedTransaction list) =
        let transactionRepo = new TransactionRepo()
        let transactions = 
            parsedTransactions
            |> List.map(fun t ->
                new Transaction (
                    Id = t.Id.Value,
                    RegistrationDate = StorerUtils.getNullableDateTimeFromOption t.RegistrationDate,
                    CompletionDate = StorerUtils.getNullableDateTimeFromOption t.CompletionDate,
                    ReferenceId = StorerUtils.getNullableIntFromOption t.ReferenceId,
                    Amount = StorerUtils.getNullableFloatFromOption t.Amount,
                    Fee = StorerUtils.getNullableFloatFromOption t.Fee,
                    Description = t.Description.Value,
                    StatusId = StorerUtils.getStatusId t.Status,
                    CurrencyId = StorerUtils.getCurrencyTypeId t.Currency,
                    TransactionTypeId = StorerUtils.getTransactionTypeId t.TransactionType,
                    ProviderId = StorerUtils.getProviderId t.Provider,
                    UserId = Nullable userId
                )
            )
        let storedTransactionIds = 
            transactionRepo.GetTransactionIds(userId).Result
            |> Seq.toList

        let filteredTransactions = filterDublicates storedTransactionIds transactions
        let storingResp = transactionRepo.StoreTransactions(filteredTransactions)
        storingResp.Result

        

