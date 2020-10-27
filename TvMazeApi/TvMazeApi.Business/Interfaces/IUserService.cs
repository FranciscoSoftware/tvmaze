using System;
using System.Collections.Generic;
using System.Text;
using TvMazeApi.Business.Common.Dto;
using TvMazeApi.Business.Dto;

namespace TvMazeApi.Business.Interfaces
{
    public interface IUserService
    {
        UserDTO GetUser(int id);

        UserDTO GetUserLogin(string username,string passwork);
        IEnumerable<UserDTO> GetUsers();
        void DeleteUsers(UserDTO user);
        UserDTO GetPerson(int id);
        void UpdateUser(UserEditDTO user);
        void AddUser(UserEditDTO user);
    }
}
