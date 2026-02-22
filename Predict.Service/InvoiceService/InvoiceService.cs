using Predict.Reader.Invoice;
using Predict.Reader.Invoice.Types;
using Predict.Service.CacheServicel;

namespace Predict.Service;

public class InvoiceService(ICacheService cache) : IInvoiceService
{
    public List<InvoiceTypes.LocationInvoice> GetInvoices(DateTime from, DateTime to)
    {
        var invoices = cache.GetOrSet(
            "getInvoices",
            InvoicesReader.getInvoices,
            TimeSpan.FromMinutes(15));

        return [.. invoices];
    }
}
