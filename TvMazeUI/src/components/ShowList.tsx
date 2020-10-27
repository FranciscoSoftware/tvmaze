import React, { Fragment, useState, useEffect } from 'react'
import MaterialTableGeneric from './material-table/material-table'
import {IMaterialize} from '../interfaces/IMaterialTable'
import {IShow} from '../interfaces/IShow'
import {EnumUrl}  from '../enum/EnumUrl';
import {headers} from '../constants/tableHeaders';
import {GetCors} from '../services/services';
import {IFormState} from '../interfaces/IFormState'
import ShowInfo from './ShowInfo';
import Select from '@material-ui/core/Select';
import { Grid, TextField, Button } from '@material-ui/core';

export default function ShowList():JSX.Element {
    const [showId,setSetShowID] = useState<IFormState>({id:0,admin:true,action:'',callback:()=>{}})
    const [filter,setFilter] = useState<any>("Keywords")
    const [filterValue,setFilterValue] = useState<any>()
    const [isOnForm,setIsOnForm] = useState<boolean>(false)
    const[tableProps,setTableProps] = useState<IMaterialize<IShow>>();
    const[showList,setShowList] = useState<IShow[]>([]);
    const[auxShowList,setAuxShowList] = useState<IShow[]>([]);

    async function fetchData() {
        if(showList?.length===0){            
            GetCors(EnumUrl.GetShows,getShowCallback)
        }
    }

    const onReturnClickCallBack = ()=>{
        setIsOnForm(false);
        setSetShowID({id:0,admin:true,action:'',callback:onReturnClickCallBack});
    }

    const onRowClickCallBack = (rowData:IShow)=>{
        setIsOnForm(true);
        setSetShowID({id:rowData.id,admin:true,action:'',callback:onReturnClickCallBack});
    }

    const getShowCallback = (data:IShow[])=>{       
        
        setShowList(data);
        setAuxShowList([...showList]);
        const dataArray = new Array<any>();
         data.forEach(x=>{            
            
            let object = {
                id:x.id,
                name: x.name,
                language:x.language,
                genres:x.genres.join(','),
                premiered:x.premiered,
                rating: x.rating.average,
                network: x.network?x.network.name:''                
            }
            dataArray.push(object);
        })
        var header = headers('showList')
        const props: IMaterialize<IShow> = {
            data:dataArray,
            headers:header,
            addcallback:setIsOnForm,
            deletecallback:setIsOnForm,
            editcallback:setIsOnForm,
            onRowClick:onRowClickCallBack,
            iconDelete:'Delete',
            type:'shows'
        }        
        setTableProps(props)
    }

    

    useEffect(() => {        
        fetchData();
    });

    const filterFunction = ():IShow[]  =>{        
        switch (filter){            
            case "Keywords":
                return showList.filter(x=> x.name.toUpperCase().includes(filterValue.toUpperCase()))
            case "Language":
                return showList.filter(x=> x.language.toUpperCase().includes(filterValue.toUpperCase()))
            case "Genre":
                return showList.filter(x=> x.genres.includes(filterValue))
            case "Channel":
                return showList.filter(x=> x.network && x.network.name.toUpperCase().includes(filterValue.toUpperCase()))
            case "Schedule":
                return showList.filter(x=> x.schedule.time.includes(filterValue))
            default:
                return showList;

        }

    }

    const handleFilter = ():void=>{
        
        const dataArray = new Array<any>();
        let data:IShow[]
        if(filterValue!==undefined && filterValue!=null && filterValue!==''){
            data = filterFunction();
        }else{
            data = showList;
        }
         
        data.forEach(x=>{            
           
           let object = {
               id:x.id,
               name: x.name,
               language:x.language,
               genres:x.genres.join(','),
               premiered:x.premiered,
               rating: x.rating.average,
               network: x.network?x.network.name:''                
           }
           dataArray.push(object);
       })
       var header = headers('showList')
       const props: IMaterialize<IShow> = {
           data:dataArray,
           headers:header,
           addcallback:setIsOnForm,
           deletecallback:setIsOnForm,
           editcallback:setIsOnForm,
           onRowClick:onRowClickCallBack,
           iconDelete:'Delete',
           type:'shows'
       }        
       setTableProps(props)
    }

    const getInput = ():JSX.Element=>{
        if(filter=="Schedule"){
        return(
            <TextField
            id="time"
            label={filter}
            variant="outlined"
            margin="normal"
            type="time"                       
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setFilterValue(e.target.value)}
          />
        )
        }else{
            return(
                <TextField 
                variant="outlined"
                id="filterValue"
                label={filter}
                name="filterValue"
                value={filterValue}
                onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setFilterValue(e.target.value)}
                
                />
            )
        }
    }

    const body= ():JSX.Element =>{
        if(!isOnForm){
            return(
                <Fragment>
                <Grid container direction="row">
                <Grid item xs={3} sm={3} md={3} >
                        <Select
                        native
                        value={filter}     
                        onChange={(e:React.ChangeEvent<{ name?: string; value: unknown }>)=>setFilter(e.target.value)}
                        name="Filter"
                        > 
                        <option value="Keywords">Keywords</option>
                        <option value="Language">Language</option>
                        <option value="Genre">Genre</option>                                               
                        <option value="Channel">Channel</option>                                               
                        <option value="Schedule">Schedule</option>                                               
                        </Select>                       
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} >
                        {getInput()}
                    </Grid> 
                    <Grid item xs={3} sm={3} md={3} >
                        <Button onClick={handleFilter} variant="contained" color="primary">filter</Button>
                    </Grid>
                </Grid>
                <Grid container direction="row">
                <MaterialTableGeneric {...tableProps!}></MaterialTableGeneric>
                </Grid>
                </Fragment>
            )
        }else{
            return(
                <ShowInfo {...showId}></ShowInfo>
                
            )
        }
        
    }

    return (
        <Fragment>
            
            {body()}
        </Fragment>
    )
}
