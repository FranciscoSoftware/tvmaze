using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TvMazeApi.Business.Dto;
using TvMazeApi.Data.Models;
using TvMazeApi.Data.Models.Domain;

namespace TvMazeApi.Common.Mapping
{
    public class Mapping: Profile
    {
        public Mapping() {
            CreateMap<Roles, RolesDTO>();
            CreateMap<Roles, RolesDTO>();
            CreateMap<Persons, UserDTO>();
            CreateMap<UserDTO, Persons>();
            CreateMap<UserDTO, Users>().ForMember(dto => dto.PersonId, action => action.MapFrom(view => view.IdPerson));
            CreateMap<Users, UserDTO>().ForMember(dto => dto.FirstName, action => action.MapFrom(view => view.Person.FirstName))
                .ForMember(dto => dto.MiddleName, action => action.MapFrom(view => view.Person.MiddleName))
                .ForMember(dto => dto.LastName, action => action.MapFrom(view => view.Person.LastName))
                .ForMember(dto => dto.Phone, action => action.MapFrom(view => view.Person.Phone))
                .ForMember(dto => dto.HomeAddress, action => action.MapFrom(view => view.Person.HomeAddress))
                .ForMember(dto => dto.IdPerson, action => action.MapFrom(view => view.Person.Id));  
            CreateMap<UserDomainView, UserDTO>();

        }
    }
}

