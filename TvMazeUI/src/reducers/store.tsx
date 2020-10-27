import React from 'react'
import {IAction} from '../interfaces/IAction'
import {IState} from '../interfaces/IState'

export var initialState: IState = {
    user:{
        id:0,
        firstName:'',
        middleName:'',
        lastName:'',
        token:'',
        imageUrl:'',
        roleId:0,
        roleName:'',
        isActive:false
    },
    isLogged:false
}

export const Store = React.createContext<IState|any>(initialState);

function reducer(state:IState,action:IAction):IState{   
    console.log(action) ;
    switch (action.type){
        case 'LogIn':
            const stateAux:IState = {
                user:action.payload,
                isLogged:true
            }
            initialState = stateAux;
            action.callback();
            return stateAux;
        default:
            return state;
    }
}

export function StoreProvider(props:any):JSX.Element{
    const [state,dispatch] = React.useReducer(reducer,initialState)
return <Store.Provider value={{state,dispatch}}>{props.children}</Store.Provider>
}
