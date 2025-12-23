namespace Predict.Repository.HealthRepo.Models;

public class HearthRate {
    public int? Id { get; set; }
    public DateTime? Date { get; set; }
    public int? Rate { get; set; }
    public bool? IsAutomation { get; set; }
    public int? ProviderId { get; set; }
    public int DataOwnerId { get; set; }
}