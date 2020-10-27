using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using TvMazeApi.Business.Common.Dto;
using TvMazeApi.Business.Dto;
using TvMazeApi.Business.Interfaces;
using TvMazeApi.Data.Models;

namespace TvMazeApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserService _ILoginService;

        public UserController(IUserService ILoginService)
        {
            _ILoginService = ILoginService;


        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        [Route("Get")]
        public ActionResult GetUsuarios()
        {
            return Ok(_ILoginService.GetUsers());
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        [Route("GetPerson")]
        public ActionResult GetPerson(int id)
        {
            return Ok(_ILoginService.GetPerson(id));
        }


        [HttpPost]
        [Authorize(Roles = "Admin")]
        [Route("Delete")]
        public ActionResult DeleteUsers([FromBody] UserDTO user)
        {
            _ILoginService.DeleteUsers(user);
            return Ok(user);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        [Route("Update")]
        public ActionResult Update([FromBody] UserEditDTO obj)
        {
            _ILoginService.UpdateUser(obj);
            return Ok(obj);
        }

        [HttpPost]        
        [Authorize(Roles = "Admin")]
        [Route("Add")]
        public ActionResult Add([FromBody] UserEditDTO obj)
        {
            _ILoginService.AddUser(obj);
            return Ok(obj);
        }
    }
}