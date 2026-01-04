using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace Predict.Controllers
{
    [Route("api/v1/invoices")]
    public class InvoicesController : BaseController
    {
        [HttpGet("")]
        public async Task<ActionResult> GetReceipts(
            [FromHeader] string Authorization,
            [FromQuery, Required] string startDate,
            [FromQuery, Required] string endDate
        )
        {
            return Ok(null);
        }
    }
}
