namespace Predict.Reader.Invoice

open System
open System.IO
open System.Globalization
open ExcelReader
open Predict.Reader.Invoice.Types.InvoiceTypes


module InvoicesReader =

    let private reader = ExcelReaderService()

    let getLocalExcels (path: string) =
        Directory.EnumerateFiles(path, "*.xlsx")
        |> Seq.choose (fun f ->
            try
                let data = reader.ReadAllSheets(f)
                Some(Path.GetFileNameWithoutExtension(f), data)
            with _ ->
                None)
        |> Seq.toList


    let tryGetDouble (value: string option) =
        value
        |> Option.bind (fun v ->
            match Double.TryParse(v, NumberStyles.Number, CultureInfo.InvariantCulture) with
            | true, dv -> Some dv
            | _ -> None)


    let tryGetDate (value: string option) (format: string) =
        value
        |> Option.bind (fun v ->
            match DateTime.TryParseExact(v, format, CultureInfo.InvariantCulture, DateTimeStyles.None) with
            | true, dt -> Some dt

            | _ -> None)

    let tryGetDateFallback (value: string option) =
        match tryGetDate value "dd/MM/yyyy", tryGetDate value "d/M/yyyy" with
        | Some dt, _ -> Some dt
        | None, Some dt -> Some dt
        | _ -> None


    let getInvoiceDetails (fileName: string, excelData: ExcelData) : LocationInvoice =
        let invoices =
            excelData.SheetNames
            |> Seq.collect (fun sheetName ->
                let sheet = excelData.Sheets.[sheetName]

                sheet.Rows
                |> Seq.map (fun row ->
                    let col (i: int) =
                        if i < sheet.Headers.Count then
                            let header = sheet.Headers.[i]

                            match row.TryGetValue(header) with
                            | true, v when not (String.IsNullOrWhiteSpace(v)) -> Some v
                            | _ -> None
                        else
                            None

                    { InvoiceType = Some sheetName
                      Provider = col 0
                      Date = tryGetDateFallback (col 1)
                      Index = tryGetDouble (col 2)
                      Amount = tryGetDouble (col 3)
                      Type = col 4
                      Action = col 5 }))
            |> Seq.toList

        { Address = Some fileName
          Invoices = invoices }


    let getInvoices () =
        let path = @"D:\Projects\PredictFiles\Invoices"
        getLocalExcels path |> List.map getInvoiceDetails
