using DataAnalysis.Repository.UserRepo;
using DataAnalysis.Repository.UserRepo.Models;
using Predict.Service.TokenService;

namespace Predict.Service.AuthorizationService;

public class AuthService : IAuthService {

    private readonly IUserRepository _userRepo;
    private readonly ITokenService _tokenService;

    public AuthService(IUserRepository userRepo, ITokenService tokenService) {
        _userRepo = userRepo;
        _tokenService = tokenService;
    }

    public async Task<User> GetUser(string authorizationHeader) {
        var email = _tokenService.GetEmailFromClaims(authorizationHeader);

        if (email == null || !await _userRepo.IsExistingUser(email)) return null;

        var user = await _userRepo.GetUserByEmail(email);
        user.DataOwners = await _userRepo.GetDataOwnersByUserId(user.Id.Value);

        return user;
    }
}
