using DataAnalysis.Parsers.ReceiptParser;
using Microsoft.AspNetCore.Mvc;

namespace DataAnalysis.Controllers;

[Route("api/v1")]
public class MorgageController : BaseController {

    [HttpGet("mortgage-loan/bcr")]
    public async Task<ActionResult> GetMortgageLoanDetails() => Ok(BCRMortgageMapper.getBcrMorgages());

}
