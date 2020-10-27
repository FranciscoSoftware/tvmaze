using System;
using System.Collections.Generic;
using System.Text;
using TvMazeApi.Business.Dto;

namespace TvMazeApi.Business.Interfaces
{
    public interface IRolesServices
    {
        List<RolesDTO> GetRoles();
    }
}
