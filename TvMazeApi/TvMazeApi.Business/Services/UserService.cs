using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using TvMazeApi.Business.Interfaces;
using TvMazeApi.Business.Dto;
using AutoMapper;
using TvMazeApi.Data.Models.Repositories;
using TvMazeApi.Data.Models;
using TvMazeApi.Data.Models.Repositories.User;
using TvMazeApi.Data.Models.Domain;
using TvMazeApi.Business.Common.Dto;
using TvMazeApi.Business.Log;

namespace TvMazeApi.Business.Service
{
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;
        private readonly IRepository<Users> _userRepository;
        private readonly IRepository<Persons> _personRepository;
        private readonly IUserRepository _userNonGenericRepository;
        private LogCrud log;

        public UserService(IRepository<Users> userRepository, IRepository<Persons> personRepository, IUserRepository userNonGenericRepository, IMapper mapper, IConfiguration config)
        {
            this._userRepository = userRepository;
            this._personRepository = personRepository;
            this._userNonGenericRepository = userNonGenericRepository;
            _mapper = mapper;
            _config = config;
            log = new LogCrud(config);
        }

        public void AddUser(UserEditDTO user)
        {
            Persons person = this._personRepository.Insert(this._mapper.Map<UserDTO, Persons>(user.person));
            Users userToInsert = this._mapper.Map<UserDTO, Users>(user.user);
            userToInsert.PersonId = person.Id;
            userToInsert.IsActive = true;
            this._userRepository.Insert(userToInsert);
            this.log.WriteLog("Create user", userToInsert.UserName);

        }

        public void DeleteUsers(UserDTO user)
        {
            Users userToDelete = this._userRepository.GetById(user.Id.Value);
            this._userRepository.Delete(user.Id.Value);
            this._personRepository.Delete(userToDelete.PersonId.Value);
            this.log.WriteLog("Delete User", user.UserName);
        }

        public string GenerateJSONWebToken(string username, string rolename)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[] {
                new Claim(JwtRegisteredClaimNames.Sub,username),
                new Claim(ClaimsIdentity.DefaultRoleClaimType, rolename),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Issuer"],
              claims,
              expires: DateTime.Now.AddMinutes(120),
              signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public UserDTO GetPerson(int id)
        {

            return this._mapper.Map<UserDomainView, UserDTO>(this._userNonGenericRepository.GetPerson(id));
        }

        public UserDTO GetUser(int id)
        {
            return this._mapper.Map<Users,UserDTO>(this._userRepository.GetById(id));

        }

        public UserDTO GetUserLogin(string username, string password)
        {
            UserDomainView userDomain = this._userNonGenericRepository.GetUserDomain(username, password);
            UserDTO user =  this._mapper.Map<UserDomainView, UserDTO>(userDomain);
            user.Token = this.GenerateJSONWebToken(user.UserName, userDomain.RoleName);
            this.log.WriteLog("Login", user.UserName);
            return user;
        }

        public IEnumerable<UserDTO> GetUsers()
        {
            IEnumerable<UserDTO> usersDTO = _mapper.Map<IEnumerable<UserDomainView>, IEnumerable<UserDTO>>(this._userNonGenericRepository.GetAll());
            return usersDTO;
        }

        public void UpdateUser(UserEditDTO user)
        {
            this._personRepository.Update(this._mapper.Map<UserDTO, Persons>(user.person));
            Users userUpdate = this._mapper.Map<UserDTO, Users>(user.user);
            userUpdate.PersonId = user.person.Id;
            this._userRepository.Update(userUpdate);
            this.log.WriteLog("Update User", userUpdate.UserName);
        }
    }
}
