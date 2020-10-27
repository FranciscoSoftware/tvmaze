import React,{useState,useEffect} from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select'
import Typography from '@material-ui/core/Typography';
import {IFormState} from '../interfaces/IFormState';
import {IDialogProps} from '../interfaces/IDialogProps';
import { makeStyles,Theme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import {IPerson,IUserCrud,IRoles,ISpecialization} from '../interfaces/IUserCrud';
import {EnumUrl} from '../enum/EnumUrl';
import {EnumRoles} from '../enum/EnumRoles';
import { stringify } from 'querystring';
import { Get,PostToken } from '../services/services';

const useStyles = makeStyles((theme:Theme) => ({
    root: {
      height: '100vh',
    },
    image: {
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    inputLeft:{        
        
    },
    inputRigth:{
        
    }   
  }));

export default function PersonForm(props:IFormState):JSX.Element {
    type form = React.FormEvent<HTMLFormElement>;
    const closeModal = () =>{
        SetMProps({open:false,title:'',body:'',funcion:closeModal})
    }
    var specializationID: number = 0;
    const [user,SetUser] = useState<IUserCrud>({Id:0,UserName:'',UserPassword:'',RoleId:1,isActive:false}); 
    const [person,SetPerson] = useState<IPerson>({Id:0,FirstName:'',MiddleName:'',LastName:'',Age:0,HomeAddress:'',Phone:'',ImageUrl:''});
    const [roles,SetRoles] = useState<IRoles[]>([]); 
     

    const [mprops,SetMProps] = useState<IDialogProps>({open:false,title:'',body:'',funcion:closeModal});
    const classes = useStyles();

    const PostTokenCallBakc = (data:any)=>{        
        props.callback();
    }

    const handleSubmit = (e:form):void =>{    
        e.preventDefault();
        if(props.action==="Edit"){    
            PostToken(EnumUrl.UpdateUser,{user:user,person:person,id:specializationID},PostTokenCallBakc)        
        }else{  
            PostToken(EnumUrl.AddUser,{user:user,person:person,id:specializationID},PostTokenCallBakc)        
        }
    }


    

    const handleCancel = (e:any):void =>{    
        e.preventDefault();  
        props.callback();
        
    }

    const getRoleCallback = (roles:IRoles[])=>{
        SetRoles(roles)
    }

    const getPersonCallBack= (person:any)=>{
        SetUser({Id:person.id,UserName:person.userName,UserPassword:person.userPassword,RoleId:person.roleId,isActive:person.isActive})
        SetPerson(
            {
                Id:person.idPerson,
                FirstName:person.firstName,
                MiddleName:person.middleName,    
                LastName:person.lastName,
                Age:person.age,
                HomeAddress:person.homeAddress,
                Phone:person.phone,
                ImageUrl:person.imageUrl
            }
        )        
    }



    async function fetchData() {
        if(roles?.length==0 && props.admin){            
            Get(EnumUrl.GetRole,getRoleCallback)
        }
        if(props.id!=0&&user.Id==0){
            var url = EnumUrl.GetPerson+'?id='+props.id
            Get(url,getPersonCallBack)
        }
    }

    useEffect(() => {        
        fetchData();
    });

    const roleList = ():JSX.Element[]=>{
        var options = new Array<JSX.Element>();
        roles.map((rol:IRoles)=>{
            options.push(<option key={rol.id} value={rol.id}>{rol.roleName}</option>);
        })              
        return options;
    }
   
    const adminRole = ():JSX.Element=>{
        return props.admin?(
            <Grid container direction="row">
                <Grid item xs={5} sm={5} md={5} >
                        <Select
                        native
                        value={user.RoleId}     
                        onChange={(e:React.ChangeEvent<{ name?: string; value: unknown }>)=>SetUser({...user,RoleId:Number(e.target.value)})}
                        name="age"
                        >                        
                        {roleList()}
                        </Select>
                    </Grid>
                    <Grid item xs={7} sm={7} md={7} ></Grid> 
                    
                </Grid>
        ):(
            <Grid item xs={12} sm={12} md={12} >
                <p> </p>
            </Grid> 
        )
    }



    return (
    <div>
        <Grid container component="main">
            <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
            <form className={classes.form} onSubmit={handleSubmit} >
                <Grid container direction="row">
                    <Grid item xs={5} sm={5} md={5} >
                        <TextField 
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="Username"
                        label="Username"
                        name="Username"              
                        autoFocus
                        value={user.UserName}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>SetUser({...user,UserName:e.target.value})}
                        
                        />
                    </Grid>
                    <Grid item xs={2} sm={2} md={2} ></Grid>
                    <Grid item xs={5} sm={5} md={5} >
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={user.UserPassword}
                        autoComplete="current-password"
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>SetUser({...user,UserPassword:e.target.value})}                        
                        />
                    </Grid>
                </Grid>
                {adminRole()}
                <Grid container direction="row">
                    <Grid item xs={5} sm={5} md={5} >
                        <TextField 
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="FirstName"
                        label="FirstName"
                        name="FirstName"              
                        autoFocus
                        value={person.FirstName}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>SetPerson({...person,FirstName:e.target.value})}
                        
                        />
                    </Grid>
                    <Grid item xs={2} sm={2} md={2} ></Grid>
                    <Grid item xs={5} sm={5} md={5} >
                    <TextField
                        variant="outlined"
                        margin="normal"                        
                        fullWidth
                        name="MiddleName"
                        label="MiddleName"                        
                        id="MiddleName"
                        value={person.MiddleName}                        
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>SetPerson({...person,MiddleName:e.target.value})}                        
                        />
                    </Grid>
                </Grid>
                <Grid container direction="row">
                    <Grid item xs={5} sm={5} md={5} >
                        <TextField 
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="LastName"
                        label="LastName"
                        name="LastName"              
                        autoFocus
                        value={person.LastName}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>SetPerson({...person,LastName:e.target.value})}
                        
                        />
                    </Grid>
                    <Grid item xs={2} sm={2} md={2} ></Grid>
                    <Grid item xs={5} sm={5} md={5} >
                    <TextField
                        variant="outlined"
                        margin="normal"                        
                        fullWidth
                        name="Age"
                        label="Age"
                        type="Number"
                        id="Age"
                        value={person.Age}                        
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>SetPerson({...person,Age:person.Age})}                        
                        />
                    </Grid>
                </Grid>
                <Grid container direction="row">
                    <Grid item xs={5} sm={5} md={5} >
                        <TextField 
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="HomeAddress"
                        label="HomeAddress"
                        name="HomeAddress"              
                        autoFocus
                        value={person.HomeAddress}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>SetPerson({...person,HomeAddress:e.target.value})}
                        
                        />
                    </Grid>
                    <Grid item xs={2} sm={2} md={2} ></Grid>
                    <Grid item xs={5} sm={5} md={5} >
                    <TextField
                        variant="outlined"
                        margin="normal"                        
                        fullWidth
                        name="Phone"
                        label="Phone"                        
                        id="Phone"
                        value={person.Phone}                         
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>SetPerson({...person,Phone:e.target.value})}                        
                        />
                    </Grid>
                </Grid>                
                <Grid container direction="row">
                    <Grid item xs={false} sm={8} md={7} ></Grid>                    
                    <Grid item xs={6} sm={2} md={3} >
                        <Button type="submit" fullWidth variant="contained" color="primary">{props.action}</Button>
                    </Grid>
                    <Grid item xs={6} sm={2} md={3} >
                        <Button onClick={handleCancel} fullWidth variant="contained" color="primary">Cancel</Button>
                    </Grid>
                </Grid>           
            </form>
        </Grid>
    </div>
    )
}

