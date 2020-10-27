import React, {useState,useEffect,useContext, Fragment} from 'react'
import {IUserList} from '../interfaces/IUserList'
import {IMaterialize,IHeader} from '../interfaces/IMaterialTable'
import {EnumUrl}  from '../enum/EnumUrl';
import {Get} from '../services/services';
import {headers} from '../constants/tableHeaders';
import MaterialTableGeneric from './material-table/material-table'
import ConfirmDialogs from '../components/modals/confirmDialog'
import { PostToken } from '../services/services';
import {IDialogProps} from '../interfaces/IDialogProps'
import {IFormState} from '../interfaces/IFormState'
import PersonForm from './PersonForm';




export default function UserAdmin():JSX.Element {
    var row:IUserList;

    const actioncallback = ()=>{
        console.log("dasdsa");
        Get(EnumUrl.GetUsers,getUserCallback)
    }
    const deleteModalResult =(result:boolean)=>{
        SetMProps({open:false,title:'',body:'',funcion:deleteModalResult})
        if(result){
            row.isActive=!row.isActive;
            PostToken(EnumUrl.DeleteUser,row, actioncallback)
        }
    }
    const[userList,setUserList] = useState<IUserList[]>([]);
    const[tableProps,setTableProps] = useState<IMaterialize<IUserList>>();
    const [mprops,SetMProps] = useState<IDialogProps>({open:false,title:'',body:'',funcion:deleteModalResult});
    const [state, setState ] = useState<IFormState>({id:0,admin:true,action:'',callback:()=>{}})
    const [isOnForm,setIsOnForm] = useState<boolean>(false)

    async function fetchData() {
        if(userList?.length==0){            
            Get(EnumUrl.GetUsers,getUserCallback)
        }
    }



    useEffect(() => {        
        fetchData();
    });



    const deletecallback = (rowData:IUserList) =>{
        row = rowData;
        SetMProps({open:true,title:'Aviso',
        body:'Desea cambiar el estado del usuario',funcion:deleteModalResult});
    }

    const editFormCallBack= ():void=>{   
        fetchData();    
        setIsOnForm(false);
    }

    const editcallback = (rowData:IUserList) =>{
        setIsOnForm(true);
        setState({id:rowData.id,admin:true,action:'Edit',callback:editFormCallBack})

    }

    const addcallback = (rowData:IUserList) =>{
        setIsOnForm(true);
        setState({id:0,admin:true,action:'Add',callback:editFormCallBack})
    }

    const getUserCallback = (data:IUserList[])=>{         
        setUserList(data);
        var header = headers('userList')
        const props: IMaterialize<IUserList> = {
            data:data,
            headers:header,
            deletecallback:deletecallback,
            editcallback:editcallback,
            addcallback:addcallback,
            onRowClick:setIsOnForm,
            iconDelete : 'Delete',
            type:'users'
        }        
        setTableProps(props)

    }
    
    const body= ():JSX.Element =>{
        if(!isOnForm){
            return(
                <MaterialTableGeneric {...tableProps!}></MaterialTableGeneric>
            )
        }else{
            return(
                <PersonForm {...state}></PersonForm>
            )
        }
        
    }
    
    

    return (
        <Fragment>
            <ConfirmDialogs {...mprops}></ConfirmDialogs>
            {body()}
        </Fragment>
        
    )
}
