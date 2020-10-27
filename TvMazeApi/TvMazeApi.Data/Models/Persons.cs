using System;
using System.Collections.Generic;

namespace TvMazeApi.Data.Models
{
    public partial class Persons
    {
        public Persons()
        {
            Users = new HashSet<Users>();
        }

        public int Id { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public string HomeAddress { get; set; }
        public string Phone { get; set; }

        public virtual ICollection<Users> Users { get; set; }
    }
}
