import React,{useEffect,useState, Fragment} from 'react'
import {GetCors,Get,GetCorsWithHeaders} from '../services/services';
import {EnumUrl}  from '../enum/EnumUrl';
import { Grid, Typography, Button, TextField } from '@material-ui/core';

export default function ShowInfo(props:any) {
    const [show,setShow] = useState<any>()
    const [cast,setCast] = useState<any>()
    const [seasons,setSeasons] = useState<any>()
    const [episodes,setEpisodes] = useState<any>()
    const [date,setDate] = useState<any>()

    const getShowInfoCallback = (data:any)=>{
        setShow(data);
    }

    const getShowInfoCastCallback = (data:any)=>{
        setCast(data);
    }

    const getShowSeasonsCallback = (data:any)=>{
        setSeasons(data);
    }

    const getShowEpisodesCallback = (data:any)=>{        
        if(data.length!==undefined){
            setEpisodes(data);
        }else{
            alert("status "+data.status+" "+ data.name)
        }
    }
    

    async function fetchData() {          
        if(show===undefined&& cast===undefined && seasons===undefined){        
            GetCors(EnumUrl.GetShowInfo+""+props.id,getShowInfoCallback)
            GetCors(EnumUrl.GetShowInfo+""+props.id+"/cast",getShowInfoCastCallback)
            GetCors(EnumUrl.GetShowInfo+""+props.id+"/seasons",getShowSeasonsCallback)
        }
    }

    useEffect(() => {        
        fetchData();
    });

    const handleCancel = (e:any):void =>{    
        e.preventDefault();  
        props.callback();
        
    }

    const handleSeasonClick = (id:number):void =>{    
        GetCors(EnumUrl.GetSeasonEpisodes+""+id+"/episodes",getShowEpisodesCallback)
    }

    const handleFilter = (inputDate:any):void =>{
        GetCors(EnumUrl.GetShowInfo+""+props.id+"/episodesbydate?date="+inputDate,getShowEpisodesCallback)
    }

    const body= ():JSX.Element =>{
        if(show!==undefined && cast!==undefined && seasons!==undefined){
            return(
                <Fragment>
                    <Grid container component="main">
                    <Typography component="h1" variant="h5">
                        {show.name}
                    </Typography>
                    <Grid container direction="row">
                        <Grid item xs={5} sm={5} md={5} >
                            <img src={show.image.medium} alt="imagen"></img>
                        </Grid>
                        <Grid item xs={7} sm={7} md={7} >
                        <div dangerouslySetInnerHTML={{ __html: show.summary }} /> 
                        <ul>
                        {
                        cast.map(function(item:any, i:number){                            
                            return <li key={i}>{item.person.name}</li>
                            })
                        }
                        </ul>
                        <Grid container direction="row">
                        <TextField
                            id="date"
                            label="Filter"
                            type="date"                                
                            InputLabelProps={{
                            shrink: true,
                            }}
                            value={date}
                            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>handleFilter(e.target.value)}
                        />
                        
                        </Grid>
                        <Grid container direction="row">
                        <Grid item xs={6} sm={6} md={6}>
                        <ul>
                        {
                            seasons.map(function(item:any, i:number){                            
                            return <li key={i}>                                
                                <Button onClick={()=>{handleSeasonClick(item.id)}} color="primary">seasons {item.number} - Date: {item.premiereDate}</Button>
                                </li>
                            })
                        }
                        </ul>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6}>
                            {episodes!==undefined?<Fragment>
                                <ul>
                               { episodes.map(function(item:any, i:number){                            
                                return <li key={i}>{item.name}</li>
                            })}
                            </ul>
                            </Fragment>:<div></div>}
                        </Grid>
                        </Grid>
                        </Grid>
                    </Grid>
                    <Grid container direction="row">
                    <Grid item xs={false} sm={8} md={7} ></Grid>    
                    <Grid item xs={6} sm={2} md={3} >
                        <Button onClick={handleCancel} fullWidth variant="contained" color="primary">Return</Button>
                    </Grid>
                </Grid>  
                    </Grid>
                </Fragment>
            )
        }else{
            return(<div>loading...</div>)
        }
    }

    return (
        <Fragment>
            {body()}
        </Fragment>
    )
}
