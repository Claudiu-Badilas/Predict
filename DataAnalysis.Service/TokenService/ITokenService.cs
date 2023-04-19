using DataAnalysis.Repository.UserRepo.Models;

namespace DataAnalysis.Service.TokenService {
    public interface ITokenService {
        string CreateToken(string email);
        string GetEmailFromClaims(string token);
    }
}
