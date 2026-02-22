using Predict.Reader.Invoice.Types;

namespace Predict.Service;

public interface IInvoiceService
{
    List<InvoiceTypes.LocationInvoice> GetInvoices(DateTime from, DateTime to);
}
