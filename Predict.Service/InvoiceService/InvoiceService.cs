using Predict.Reader.Mortgage;
using Predict.Service.CacheServicel;
using Predict.Types;

namespace Predict.Service;

public class InvoiceService(ICacheService cache) : IInvoiceService
{
    public List<InvoiceTypes.LocationInvoice> GetInvoices(DateTime from, DateTime to)
    {
        var invoices = cache.GetOrSet(
            "getInvoices",
            InvoicesMapper.getInvoices,
            TimeSpan.FromMinutes(15));

        return [.. invoices];
    }
}
