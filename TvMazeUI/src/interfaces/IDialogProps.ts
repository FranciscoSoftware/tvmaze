import React from 'react'
export interface IDialogProps{
    open:boolean,
    title:string,
    body:string,    
    funcion: CallableFunction
    
}

export interface IFormDialogProps{
    open:boolean,
    title:string,
    body:string,    
    funcion: CallableFunction,
    form:JSX.Element
}



