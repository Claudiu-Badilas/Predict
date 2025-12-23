using DataAnalysis.Common.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Predict.Service.TokenService;

public class TokenService : ITokenService {
    private readonly SymmetricSecurityKey _key;

    public TokenService(IEnvironmentConfiguration envConfig) {
        _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(envConfig.GetJWTKey()));
    }

    public string CreateToken(string email) {
        var claims = new List<Claim> {
                new Claim(JwtRegisteredClaimNames.NameId, email)
            };
        var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);
        var tokenDescriptor = new SecurityTokenDescriptor {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddDays(7),
            SigningCredentials = creds
        };
        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    public string GetEmailFromClaims(string token) {
        var handler = new JwtSecurityTokenHandler();
        var jsonToken = handler.ReadToken(token.Split(" ")[1]);
        var tokenS = jsonToken as JwtSecurityToken;
        return tokenS.Claims.FirstOrDefault()?.Value;
    }
}