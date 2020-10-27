using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TvMazeApi.Business.Interfaces;

namespace TvMazeApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private IRolesServices _rolesServices;

        public RoleController(IRolesServices rolesServices)
        {
            _rolesServices = rolesServices;
        }

        [HttpGet]
        //[Authorize(Roles = "Admin")]
        public ActionResult Get()
        {
            return Ok(_rolesServices.GetRoles());
        }
    }
}