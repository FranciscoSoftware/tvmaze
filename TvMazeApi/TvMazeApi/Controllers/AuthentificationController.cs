using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TvMazeApi.Business.Dto;
using TvMazeApi.Business.Interfaces;

namespace TvMazeApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthentificationController : ControllerBase
    {
        private IUserService _ILoginService;

        public AuthentificationController(IUserService ILoginService)
        {
            _ILoginService = ILoginService;
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult AuthenticateUser([FromBody] UserDTO user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            return Ok(_ILoginService.GetUserLogin(user.UserName,user.UserPassword));
        }
    }
}