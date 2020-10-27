import React ,{useContext} from 'react'
import {initialState} from '../reducers/store'
import {EnumUrl} from '../enum/EnumUrl' 



export const Get=(url:string,callback:CallableFunction)=>{
    fetch(url, {
        headers:{
            'Authorization': 'Bearer '+initialState.user.token,            
        }
        }).then(res => res.json()).then((data)=>{   
           callback(data)
        })
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));

}

export const GetCors=(url:string,callback:CallableFunction)=>{
    fetch(url).then(res => res.json()).then((data)=>{   
           callback(data)
        })
        .catch(error => {            
            console.error('Error:', error)}
            )
        .then(response => console.log('Success:', response));

}

export const GetCorsWithHeaders=(url:string,callback:CallableFunction)=>{
    fetch(url, {
        mode: "no-cors",
        headers:{            
            'Access-Control-Allow-Origin':'*'
        }
        }).then(res => res.json()).then((data)=>{   
           callback(data)
        })
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));

}


export const Post = (url:string,data:any,callback:CallableFunction)=>{
    fetch(url, {
        method: 'POST', 
        body: JSON.stringify(data), 
        headers:{
            'Content-Type': 'application/json'
        }
        }).then(res => res.json()).then((result:any)=>{        
            callback(result)
        })
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
}

export const PostToken = (url:string,data:any,callback:CallableFunction)=>{
    fetch(url, {
        method: 'POST', 
        body: JSON.stringify(data), 
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+initialState.user.token
        }
        }).then(res => res.json()).then((result:any)=>{                    
            callback(result)
        })
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
}