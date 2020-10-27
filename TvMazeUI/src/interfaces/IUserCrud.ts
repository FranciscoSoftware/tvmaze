export interface IUserCrud{
    Id:number,
    UserName:string,
    UserPassword:string,
    RoleId:number,
    isActive:boolean
}

export interface IPerson{
    Id:number,
    FirstName:string,
    MiddleName:string,    
    LastName:string,
    Age:number,
    HomeAddress:string,
    Phone:string,
    ImageUrl:string
}

export interface IRoles{    
    id:number,
    roleName:string
}

export interface ISpecialization{
    id:number,
    specializationName:string
}