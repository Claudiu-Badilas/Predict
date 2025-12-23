using DataAnalysis.Repository.UserRepo.Models;

namespace Predict.Service.AuthorizationService;

public interface IAuthService {
    Task<User> GetUser(string authorizationHeader);
}