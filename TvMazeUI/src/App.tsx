import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import  {Store} from './reducers/store';
import Login from './components/Login';
import {Home} from './components/Home';
import { IState } from './interfaces/IState';


 function App():JSX.Element {
  const {state,dispatch} = React.useContext(Store)
  

  const getStateFromLocalStorage = ():IState =>{
    const stateFromLocal : IState = {
      user:{
        id:Number(localStorage.getItem('id')),
        firstName:localStorage.getItem('firstName')?.toString(),
        middleName:localStorage.getItem('middleName')?.toString(),
        lastName:localStorage.getItem('lastName')?.toString(),
        token:localStorage.getItem('token')?.toString(),
        imageUrl:localStorage.getItem('imageUrl')?.toString(),
        roleId:Number(localStorage.getItem('roleId')),
        roleName:localStorage.getItem('roleName')?.toString(),
        isActive:Boolean(localStorage.getItem('isActive')),

      },
      isLogged:Boolean(localStorage.getItem('isLogged'))

    }
        
    return stateFromLocal;

  }
  const stateAux:IState=getStateFromLocalStorage();
  

  /*if(state.user.id!=stateAux.user.id){
    dispatch({
                type:'LogIn',
                payload:stateAux.user
              })
  } */ 

  return (       
    <React.Fragment>     
      {state.IisLogged?<Redirect to="/Home"></Redirect>:<Redirect to="/Login"></Redirect>}
     <Route path="/Login" exact={true} component={Login} />
     <Route path="/Home" exact={true} component={Home} />
     </React.Fragment>  
  )
}

export default App;