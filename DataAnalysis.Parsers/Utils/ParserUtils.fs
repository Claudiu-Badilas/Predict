namespace DataAnalysis.Utils

open DataAnalysis.Types.ParsersTypes
open System
open System.Globalization

module ParserUtils =

    let tryGetInt (value: string option) =
        match value with
        | Some value -> 
            let isValid, intValue = Int32.TryParse(value, NumberStyles.Any, CultureInfo.InvariantCulture)
            match isValid with
            | true -> intValue |> Some
            | _ -> None
        | _ -> None


    let tryGetDouble (value: string option) =
        match value with
        | Some value -> 
            let isValid, doubleValue = Double.TryParse(value, NumberStyles.Any, CultureInfo.InvariantCulture)
            match isValid with
            | true -> doubleValue |> Some
            | _ -> None
        | _ -> None

    
    let getCurrency value =
        match value with
        | "RON" -> CurrencyType.RON |> Some
        | "EUR" -> CurrencyType.EUR |> Some
        | "USD" -> CurrencyType.USD |> Some
        | _ -> None
        

    let getProvider provider =
        match provider with
        | Some Provider.RAIFFEISEN -> "RAIFFEISEN"
        | Some Provider.REVOLUT -> "REVOLUT"
        | Some Provider.ORANGE_MONEY -> "ORANGE_MONEY"
        | _ -> ""


    let generateUniqueId (userId: int) (registrationDate: DateTime option) (completitonDate: DateTime option) (amount: double option) (index: int) (provider: Provider option) (referenceId: int option) =
        let userIdentifier = "[" + string userId + "]-"
        let registrationIdentifier = if registrationDate.IsSome then "[" + registrationDate.Value.ToString("dd/MM/yyyy") + "]-" else ""
        let completitonIdentifier = if completitonDate.IsSome then "[" + completitonDate.Value.ToString("dd/MM/yyyy") + "]-" else ""
        let amountIdentifier = if amount.IsSome then "[" + string amount.Value + "]-" else ""
        let indexIdentifier = "[" + string (index + 1) + "]-"
        let referenceIdentifier = if referenceId.IsSome then "[" + string referenceId.Value + "]-" else ""
        let providerIdentifier = if provider.IsSome then "[" + getProvider provider  + "]"  else ""

        userIdentifier + registrationIdentifier + completitonIdentifier + amountIdentifier + 
        indexIdentifier + referenceIdentifier + providerIdentifier 
        |> Some


    let mapTransactions (transaction: ParsedTransaction list) userId: ParsedTransaction list =
        transaction
        |> List.indexed
        |> List.map(fun (i, rpt)-> 
            {   
                Id = generateUniqueId userId rpt.RegistrationDate rpt.CompletionDate rpt.Amount i rpt.Provider rpt.ReferenceId
                RegistrationDate = rpt.RegistrationDate
                CompletionDate = rpt.CompletionDate
                Amount = rpt.Amount
                Fee = rpt.Fee
                Description = rpt.Description
                TransactionType = rpt.TransactionType
                Currency = rpt.Currency
                Status = rpt.Status
                Provider = rpt.Provider
                ReferenceId = rpt.ReferenceId
            }
        )

