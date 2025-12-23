using DataAnalysis.Repository.UserRepo.Models;

namespace Predict.Service.AccountService;

public interface IAccountService {
    public Task RegisterUser(UserRequest userRequest);
    public Task<string> LoginUser(UserRequest userRequest);
}