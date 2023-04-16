namespace DataAnalysis.Parsers.HealthParser

open System.IO
open DataAnalysis.Types.HealthTypes
open DataAnalysis.Utils
open DataAnalysis.Types.CommonTypes
open DataAnalysis.DatabaseAccess

module ParserZeppLifeHeartRate =
    
    let getHeartRate dataOwnerId (csv: StreamReader): ParsedHearthRate list =
        ExcelUtils.getCsvValues csv
        |> List.toArray
        |> Array.Parallel.choose(fun row ->
            match row.Length with
            | 2 -> 
                Some {
                    Date = DateTimeUtils.convertStringToUTCDate (row[0] |> Some) "yyyy-MM-dd HH:mm:ss+0000"
                    Rate = row[1] |> Some |> ParserUtils.tryGetInt
                    Provider = Provider.ZEPP_LIFE |> Some
                    IsAutomation = false |> Some
                    DataOwnerId = dataOwnerId |> Some
                }
            | 3 ->
                let dateTime = sprintf "%s %s" row[0]  row[1] |> Some
                Some {
                    Date = DateTimeUtils.convertStringToUTCDate dateTime "yyyy-MM-dd HH:mm"
                    Rate = row[2] |> Some |> ParserUtils.tryGetInt
                    Provider = Provider.ZEPP_LIFE |> Some
                    IsAutomation = true |> Some
                    DataOwnerId = dataOwnerId |> Some
                }
            | _ -> None
        )
        |> Array.toList

    let parseCsvs dataOwnerId (excels: StreamReader list) =
        let parsedHeartRates =
            excels 
            |> List.map(fun csv -> getHeartRate dataOwnerId csv)
            |> List.concat
            |> List.distinctBy(fun p -> p.Date, p.Rate, p.IsAutomation)
        
        StoreHearthRate.storeHearthRates dataOwnerId parsedHeartRates