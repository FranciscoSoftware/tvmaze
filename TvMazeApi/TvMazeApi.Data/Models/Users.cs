using System;
using System.Collections.Generic;

namespace TvMazeApi.Data.Models
{
    public partial class Users
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string UserPassword { get; set; }
        public bool IsActive { get; set; }
        public int? PersonId { get; set; }
        public int? RoleId { get; set; }

        public virtual Persons Person { get; set; }
        public virtual Roles Role { get; set; }
    }
}
