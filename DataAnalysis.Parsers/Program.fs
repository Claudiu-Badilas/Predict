open System.IO
open IronXL
open DataAnalysis.Parsers
open DataAnalysis.DatabaseAccess
open Npgsql
open DataAnalysis.Common.Configuration

module ParserConsole =


    let getLocalExcels path =
        Directory.EnumerateFiles(path, "*.xlsx")
        |> Seq.toList 
        |> List.map(fun f -> Path.Combine(path, f) |> WorkBook.Load)


    [<EntryPoint>]
    let main _ =
        let userId = 1
        let raifExcels = getLocalExcels @""
        let revExcels = getLocalExcels @""
        let omExcels = getLocalExcels @""

        let raitransactions = ParserRaiffeisenExcelAccountStatement.parseExcels userId raifExcels
        let revtransactions = ParserRevolutExcelAccountStatement.parseExcels userId revExcels
        let omtransactions = ParserOrangeMoneyExcelAccountStatement.parseExcels userId omExcels

        printfn "%O %O %O" raitransactions revtransactions omtransactions

        printfn "Run succesfully"
        0