namespace Predict.DatabaseAccess

open Predict.Repository.HealthRepo
open Predict.Common.Configuration
open Predict.Types.HealthTypes
open Predict.Repository.HealthRepo.Models
open Predict.Repository.HealthRepo
open Predict.DatabaseAccess.StorerUtils

module StoreHearthRate =

    let filterDublicates (storedHearthRates: HearthRate list) (hearthRates: HearthRate list) =
        hearthRates
        |> List.filter(fun r -> 
            not (storedHearthRates |> List.exists(fun sr -> r.Date = sr.Date && r.Rate = sr.Rate)))

       
    let storeHearthRates dataOwnerId (parsedHearthRates: ParsedHearthRate list) =
        if not parsedHearthRates.IsEmpty then
            let healthRepo = HealthRepo(EnvironmentConfiguration())
            printfn "Total parsed hearth rates -> %i" parsedHearthRates.Length
            let hearthRates = 
                parsedHearthRates
                |> List.map(fun r ->
                    new HearthRate (
                        Date = StorerUtils.getNullableDateTimeFromOption r.Date,
                        Rate = StorerUtils.getNullableIntFromOption r.Rate,
                        IsAutomation = StorerUtils.getNullableBooleanFromOption r.IsAutomation,
                        ProviderId = StorerUtils.getProviderId r.Provider,
                        DataOwnerId = dataOwnerId
                    )
                )
            printfn "Total mapped Hearth Rates -> %i" hearthRates.Length
            let providerId = hearthRates[0].ProviderId.Value
            let storedHearthRates = 
                healthRepo.GetHearthRatesByDataOwnerId(dataOwnerId, dataOwnerId, providerId)    
                |> Async.AwaitTask
                |> Async.RunSynchronously
                |> Seq.toList
            printfn "Total Hearth Rates from db -> %i for provider -> %i" storedHearthRates.Length providerId

            let filteredHearthRates = filterDublicates storedHearthRates hearthRates
            printfn "Total Hearth Rates for storing -> %i" filteredHearthRates.Length
            if not filteredHearthRates.IsEmpty then
                healthRepo.StoreHearthRates(filteredHearthRates)
                |> Async.AwaitTask
                |> Async.RunSynchronously
            else
                printfn "No Hearth Rates for storing"
                0
        else 
            printfn "No parsed Hearth Rates"
            0
