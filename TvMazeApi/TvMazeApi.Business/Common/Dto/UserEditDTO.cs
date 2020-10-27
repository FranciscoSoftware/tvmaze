using System;
using System.Collections.Generic;
using System.Text;
using TvMazeApi.Business.Dto;

namespace TvMazeApi.Business.Common.Dto
{
    public class UserEditDTO
    {
        public UserDTO person { get; set; }
        public UserDTO user { get; set; }
    }
}
