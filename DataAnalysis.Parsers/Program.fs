open System.IO
open IronXL
open DataAnalysis.Parsers
open iTextSharp.text.pdf
open System
open DataAnalysis.Parsers.OMParsers
open DataAnalysis.Parsers.OMParsers.AccountStatementParser
open DataAnalysis.Parsers.AccountStatementParser

module ParserConsole =

    let getLocalExcels path =
        Directory.EnumerateFiles(path, "*.xlsx")
        |> Seq.toList 
        |> List.map(fun f -> Path.Combine(path, f) |> WorkBook.Load)


    let getLocalPdfs path =
        Directory.EnumerateFiles(path, "*.pdf")
        |> Seq.toList 
        |> List.map(fun f -> new PdfReader(Path.Combine(path, f)))


    [<EntryPoint>]
    let main _ =
        let userId = 1
        let raifExcels = getLocalExcels @"C:\Users\badicl\Desktop\My shortcuts\Raiff-Excels"
        let revExcels = getLocalExcels @"C:\Users\badicl\Desktop\My shortcuts\Revolut-Excels"
        //let omExcels = getLocalExcels @"C:\Users\Claudiu\Desktop\OM\Excels"
        let omPdfs = getLocalPdfs @"C:\Users\badicl\Desktop\My shortcuts\OM\PDFs"

        let raitransactions = ParserRaiffeisenExcelAccountStatement.parseExcels userId raifExcels
        let revtransactions = ParserRevolutExcelAccountStatement.parseExcels userId revExcels
        let omtransactions = 
            //ParserOrangeMoneyExcelAccountStatement.parseExcels userId omExcels
            ParserOrangeMoneyPdfAccountStatement.parsePdfs userId omPdfs


        printfn "%O %O %O" raitransactions revtransactions omtransactions

        printfn "Run succesfully"
        0