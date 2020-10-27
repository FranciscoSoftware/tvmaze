import React,{useContext} from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { INavProps } from "../../interfaces/INavProps";
import {EnumRoles } from '../../enum/EnumRoles';
import  UserAdmin from '../UserAdmin';
import  ShowList from '../ShowList';
import {Store} from '../../reducers/store'

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: window.innerHeight,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs():JSX.Element {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const {state,dispatch} = useContext(Store);
  
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  
  
  const getDisplayTabs = (role:number) :JSX.Element[] =>{
    switch(role){
        case EnumRoles.Admin:
            return(
                [
                    <Tab key="0" label="Administrar Usuarios" {...a11yProps(0)} />
                ]
            )
        case EnumRoles.Profile:
            return(
                [
                    <Tab key="0" label="Ver Shows" {...a11yProps(0)} />,
                    
                ]
            )
        default:
        return(
            [
            <Tab key="0" label="Error" {...a11yProps(0)} />
            ]
        )
    }
  }
  
  const getDisplayPanels = (role:number) :JSX.Element[] =>{    
    switch(role){
        case EnumRoles.Admin:
            return(
                [
                    <TabPanel key="0" value={value} index={0}>
                      <UserAdmin></UserAdmin>  
                    </TabPanel>
                ]
            )
        case EnumRoles.Profile:
            return(
                [
                    <TabPanel key="0"  value={value} index={0}>
                        <ShowList></ShowList>
                    </TabPanel>
                ]   
            )        
        default:        
            return(
                [
                    <TabPanel key="0" value={value} index={0}>
                        Error
                    </TabPanel>                    
                ]
            )
        
    }
  }  
 

  
 
  return (
      <React.Fragment>
    
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        
      {getDisplayTabs(state.user.roleId)}
      </Tabs>
      {getDisplayPanels(state.user.roleId)}
    </div>
    </React.Fragment>
  );
}
