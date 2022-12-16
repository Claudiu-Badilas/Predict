namespace DataAnalysis.Utils

open System
open System.Globalization

module DateTimeUtils =
    
    let convertStringToUTCDate (date: string option) (pattern: string): DateTime option =
        match date with
        | Some value -> 
            try DateTime.ParseExact(value, pattern, CultureInfo.InvariantCulture).ToUniversalTime() |> Some
            with 
            | _ -> None
        | _ -> None

