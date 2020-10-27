import React, {useState,useContext} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles,Theme } from '@material-ui/core/styles';
import Copyright from './Copyrigth';
import  {Store} from '../reducers/store';
import  {IUserView} from '../interfaces/IUserView';
import  {IUser} from '../interfaces/IUser';
import  {EnumUrl}  from '../enum/EnumUrl';
import {Post} from '../services/services'
import  CustomizedDialogs from '../components/modals/dialogModal';
import {IDialogProps} from '../interfaces/IDialogProps'
import { Redirect, Route, useHistory } from 'react-router-dom'


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
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



export default function Login():JSX.Element {
  const history = useHistory()

  const closeModal = () =>{
      SetMProps({open:false,title:'',body:'',funcion:closeModal})
  }

  type form = React.FormEvent<HTMLFormElement>;
  const classes = useStyles();
  const {state,dispatch} = useContext(Store);
  const [username,SetUserName] = useState<string>('');
  const [password,SetPassword] = useState<string>('');
  const [mprops,SetMProps] = useState<IDialogProps>({open:false,title:'',body:'',funcion:closeModal});

  
  const setDataToLocalStorage=(data:IUser):void=>{
    localStorage.setItem('id',data.id.toString())
    localStorage.setItem('firstName',data.firstName?data.firstName:'')
    localStorage.setItem('middleName',data.middleName?data.middleName:'')
    localStorage.setItem('lastName',data.lastName?data.lastName:'')
    localStorage.setItem('token',data.token?data.token:'')
    localStorage.setItem('imageUrl',data.imageUrl?data.imageUrl:'')
    localStorage.setItem('roleId',data.roleId.toString())
    localStorage.setItem('roleName',data.roleName?data.roleName:'')
    localStorage.setItem('isActive',data.isActive.toString())
    localStorage.setItem('isLogged','true')
  }
  
  
    
    
  

  function fetchData(){    
    var data:IUserView = {UserName: username,UserPassword:password};
    Post(EnumUrl.Login,data,loginCallback)    
  }

  const redirect=():void=>{    
    history.push('/Home');
  }

  const loginCallback = (data:IUser)=>{
          if(!data.isActive){
        SetMProps({open:true,title:'Aviso',
        body:'El usuario no se encuentra activo. Comuniquese con el administrador',funcion:closeModal});
    }else{            
        dispatch({
            type:'LogIn',
            payload:data,
            callback:redirect
          })
          setDataToLocalStorage(data);
          
    }
  }

  const handleSubmit = (e:form):void =>{    
    e.preventDefault();    
    fetchData()
  }
  
  return (    
    <React.Fragment>
        <CustomizedDialogs {...mprops}></CustomizedDialogs>
        <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit} >
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="Username"
                label="Username"
                name="Username"              
                autoFocus
                value={username}
                onChange={(e:React.ChangeEvent<HTMLInputElement>)=>SetUserName(e.target.value)}
                />
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                autoComplete="current-password"
                onChange={(e:React.ChangeEvent<HTMLInputElement>)=>SetPassword(e.target.value)}
                />            
                <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                >
                Sign In
                </Button>
                <Box mt={5}>
                <Copyright />
                </Box>
            </form>
            </div>
        </Grid>
        </Grid>
    </React.Fragment>
  );
}
