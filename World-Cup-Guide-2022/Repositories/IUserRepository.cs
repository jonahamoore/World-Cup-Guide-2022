using System.Collections.Generic;
using World_Cup_Guide_2022.Models;

namespace World_Cup_Guide_2022.Repositories
{
    public interface IUserRepository
    {
        void Add(UserProfile userProfile);
        List<UserProfile> GetAllUsers();
        UserProfile GetByEmail(string email);
        UserProfile GetUserById(int id);
        void Delete(int userId);
        public List<UserType> GetUserTypes();
    }
}
