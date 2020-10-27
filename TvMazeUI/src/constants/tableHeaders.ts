import {IHeader} from '../interfaces/IMaterialTable' 

export interface dataHeader{
    type:string,
    headers:Array<IHeader>  
}

export const headers=(_type:string):Array<IHeader>=>{
     const obj:Array<dataHeader>=
      [{type:"userList",
         headers :[
            {title:'Primer Nombre',field:'firstName'},
            {title:'Segundo Nombre',field:'middleName'},
            {title:'Apellidos',field:'lastName'},
            {title:'Rol',field:'roleName'},
            {title:'Activo',field:'isActive'}
         ]
        },
        {type:"showList",
          headers:[
            {title:'Nombre',field:'name'},
            {title:'Lenguaje',field:'language'},
            {title:'Genero',field:'genres'},
            {title:'Estreno',field:'premiered'},
            {title:'Raiting',field:'rating'},
            {title:'Channel',field:'network'}  
          ]
        }

    ]
    return obj.find((x:dataHeader)=>
      x.type===_type
    )?.headers!;
}


    
