using DataAnalysis.Repository.UserRepo.Models;

namespace DataAnalysis.Service.TokenService {
    public interface ITokenService {
        string CreateToken(UserResponse user);
        string GetEmailFromClaims(string token);
    }
}
