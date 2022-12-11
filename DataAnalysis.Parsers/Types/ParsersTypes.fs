namespace DataAnalysis.Types

open System

module ParsersTypes =

    type CurrencyType = EUR | USD | RON

    type TransactionType = SPEND | RECEIVED | INTERNAL_TRANSFER | TOP_UP | TRANSFER | FEE | CARD_PAYMENT | ATM | EXCHANGE | REWARD | REFUND 
    
    type TransactionStatus = COMPLETED | PENDING
    
    type Provider = RAIFFEISEN | REVOLUT | ORANGE_MONEY
    
    type RawParsedTransaction = 
        {
            RegistrationDate: DateTime option
            CompletionDate: DateTime option
            Amount: double option
            Fee: double option
            Currency: CurrencyType option
            Description: string option
            TransactionType: TransactionType option
            Status: TransactionStatus option
            ReferenceId: int option
        }

        
    type ParsedTransaction = 
        {
            Id: Guid option
            RegistrationDate: DateTime option
            CompletionDate: DateTime option
            Amount: double option
            Fee: double option
            Currency: CurrencyType option
            Description: string option
            TransactionType: TransactionType option
            Status: TransactionStatus option
            Provider: Provider option
            ReferenceId: int option
        }
