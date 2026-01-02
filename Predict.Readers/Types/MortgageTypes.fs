namespace Predict.Types

open System
open CommonTypes

module MortgageTypes =    
            
    type Rata = 
        {
            NrCtr: int option
            DataPlatii: DateTime option
            RataCredit: double option
            RataDobanda: double option
            ComisionAdministrare: double option
            CosturuAsigurare: double option
            ComisionGestiune: double option
            DobadaRecalculata: double option
            TotalRata: double option
            SoldRestPlata: double option
        }

    type GraficRambursare =
        {   
            Name: string
            Rate: Rata list
            Date: DateTime
            IsBasePayment: bool
            IsNormalPayment: bool
            IsExtraPayment: bool
        }

    let defaultGraficRambursare = 
        {
            Name = null
            Rate = []
            Date = DateTime.UtcNow
            IsBasePayment = false
            IsNormalPayment = false
            IsExtraPayment = false
        }
