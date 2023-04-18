using DataAnalysis.Repository.UserRepo.Models;

namespace DataAnalysis.Service.AccountService {
    public interface IAccountService {
        public Task RegisterUser(UserRequest userRequest);
        public Task<UserResponse> LoginUser(UserRequest userRequest);
    }
}
