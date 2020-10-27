using System;
using System.Collections.Generic;
using System.Text;
using TvMazeApi.Data.Models.Domain;

namespace TvMazeApi.Data.Models.Repositories.User
{
    public interface IUserRepository
    {
        UserDomainView GetUserDomain(string username, string password);
        IEnumerable<UserDomainView> GetAll();
        UserDomainView GetPerson(int id);
    }
}
