using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TvMazeApi.Business.Dto
{
    public class UserDTO
    {
        public int? Id { get; set; }
        public string UserName { get; set; }
        public string UserPassword { get; set; }
        public bool IsActive { get; set; }
        public int? IdPerson { get; set; }
        public int? RoleId { get; set; }
        public string RoleName { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }    
        public int Age { get; set; }
        public string HomeAddress { get; set; }
        public string Phone { get; set; }
        public string Token { get; set; }
    }
}
