using System;
using System.Collections.Generic;
using System.Text;
using TvMazeApi.Data.Models.Domain;
using Microsoft.Extensions.Configuration;
using System.Linq;

namespace TvMazeApi.Data.Models.Repositories.User
{
    public class UserRepository : IUserRepository
    {
        private TvMazeBdContext _context = null;
        
        public UserRepository()
        {   
            _context = new TvMazeBdContext();
        }
        public UserDomainView GetUserDomain(string username, string password)
        {

            UserDomainView userDomain;
            var query = from user in _context.Users
                        join person in _context.Persons on user.PersonId equals person.Id
                        join roles in _context.Roles on user.RoleId equals roles.Id
                        where user.UserName == username && user.UserPassword == password
                        select new
                        {
                            user.Id,
                            user.UserName,
                            person.FirstName,
                            person.MiddleName,
                            person.LastName,                            
                            user.RoleId,
                            roles.RoleName,
                            user.IsActive
                        };
            var obj = query.FirstOrDefault();
            if (obj==null) { return null; }
        userDomain = new UserDomainView()
        {
            Id = obj.Id,
                    FirstName = obj.FirstName,
                    UserName = obj.UserName,
                    MiddleName = obj.MiddleName != null ? obj.MiddleName : "",
                    LastName = obj.LastName,                                       
                    RoleId = obj.RoleId,
                    RoleName = obj.RoleName,
                    IsActive = obj.IsActive
                };
            
            return userDomain;
        }

        public IEnumerable<UserDomainView> GetAll()
        {

            var query = from user in _context.Users
                        join person in _context.Persons on user.PersonId equals person.Id
                        join roles in _context.Roles on user.RoleId equals roles.Id
                        select new UserDomainView
                        {
                            Id = user.Id,
                            UserName = user.UserName,
                            FirstName = person.FirstName,
                            MiddleName = person.MiddleName != null ? person.MiddleName : "",
                            LastName = person.LastName,
                            RoleId = user.RoleId,
                            RoleName = roles.RoleName,
                            IsActive = user.IsActive
                        };

            return query.ToList();
        }

        public UserDomainView GetPerson(int id)
        {
            var query = from user in _context.Users
                        join person in _context.Persons on user.PersonId equals person.Id
                        join roles in _context.Roles on user.RoleId equals roles.Id
                        where user.Id == id
                        select new UserDomainView
                        {
                            Id = user.Id,
                            UserName = user.UserName,
                            UserPassword = user.UserPassword,
                            RoleId = user.RoleId,
                            IdPerson = person.Id,
                            FirstName = person.FirstName,
                            MiddleName = person.MiddleName,
                            LastName = person.LastName,
                            Age = person.Age,
                            HomeAddress = person.HomeAddress,
                            Phone = person.Phone,
                            IsActive = user.IsActive
                        };

            return query.FirstOrDefault();
        }
    }
}
