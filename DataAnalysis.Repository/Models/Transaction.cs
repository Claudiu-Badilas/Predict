using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAnalysis.Repository.Models {
    public class Transaction {
        public string Id { get; set; }
        public DateTime? RegistrationDate { get; set; }
        public DateTime? CompletionDate { get; set; }
        public double? Amount { get; set; }
        public double? Fee { get; set; }
        public int? CurrencyId { get; set; }
        public string Description { get; set; }
        public int? TransactionTypeId { get; set; }
        public int? StatusId { get; set; }
        public int? ProviderId { get; set; }
        public int? ReferenceId { get; set; }
        public int? UserId { get; set; }
    }

    public enum CurrencyType { EUR = 1, USD = 2, RON = 3 }

    public enum TransactionType {
        SPEND = 1, RECEIVED = 2, INTERNAL_TRANSFER = 3, TOP_UP = 4, TRANSFER = 5, FEE = 6, CARD_PAYMENT = 7, ATM = 8, EXCHANGE = 9, REWARD = 10, REFUND = 11
    }

    public enum TransactionStatus { COMPLETED = 1, PENDING = 2 }

    public enum Provider { RAIFFEISEN = 1, REVOLUT = 2, ORANGE_MONEY = 3 }
}
