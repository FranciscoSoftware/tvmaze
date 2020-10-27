using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;
using TvMazeApi.Business.Dto;
using TvMazeApi.Business.Interfaces;
using TvMazeApi.Data.Models;
using TvMazeApi.Data.Models.Repositories;

namespace TvMazeApi.Business.Services
{
    public class RolesServices : IRolesServices
    {
        private readonly IMapper _mapper;
        IRepository<Roles> _repository = null;
        public RolesServices(IRepository<Roles> repository, IMapper mapper)
        {
            this._repository = repository;
            _mapper = mapper;
        }

        public List<RolesDTO> GetRoles()
        {
            List<RolesDTO> roles = _mapper.Map<IEnumerable<Roles>, List<RolesDTO>>(this._repository.GetAll());
            return roles;
        }
    }
}
