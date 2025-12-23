namespace Predict.Service.TokenService;

public interface ITokenService {
    string CreateToken(string email);
    string GetEmailFromClaims(string token);
}