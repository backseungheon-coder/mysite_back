import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { ToggleButton,Modal,FloatingLabel,Button,Collapse,ButtonGroup,Tabs,Tab,FormControl,Form,Dropdown,DropdownButton,Table } from 'react-bootstrap';
import './list.css';
import axios from 'axios';
import Agency_edit_modal from './modals/Agency_edit_modal.js';
import Under_create_modal from './modals/Under_create_modal.js';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import Looks3Icon from '@mui/icons-material/Looks3';
import Looks4Icon from '@mui/icons-material/Looks4';
import Looks5Icon from '@mui/icons-material/Looks5';
import Looks6Icon from '@mui/icons-material/Looks6';
import TextField from '@mui/material/TextField';
import {useSelector} from 'react-redux'

function Store_list(props){
    const goturl = useSelector((state) => state);
    const [levels, setlevels] = useState([])
    const [groups, setGroup] = useState([])
    const [select, setselect] = useState('')
    var sort_group = []
    var asd = []

    if(props.loadstate==='loaded' || props.change==='needchange'){

        axios.post(`${goturl}/agency_num/`,{
            'id' : window.localStorage.getItem('id'),
        })
        .then((response) => {
            props.setrows(response.data.userlist)
            setGroup(response.data.group)
            setlevels(response.data.level)
            props.setloadstate('needload') 
            props.setchange('changed')
          })
    }

    for(var i in groups){
        
        asd = props.rows.filter((x) => x.group_user == groups[i].id);
        asd.sort(function compare(a,b){
            if (a.level < b.level) return -1;
            if (a.level > b.level) return 1;
            return 0;
            
        });
        sort_group.push(asd)
    }
    var row = sort_group.flat()
    
    const rendering = (prop) =>{
      
        
        switch(prop){
            case 1:
                return(<><LooksOneIcon/></>)
            case 2:
                return(<>{'\u00A0'}{'\u00A0'}<LooksTwoIcon/></>)

            case 3:
                return(<>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}<Looks3Icon/></>)
            
            case 4:
                return(<>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}<Looks4Icon/></>)
            
            case 5:
                return(<>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}<Looks5Icon/></>)
            
            case 6:
                return(<>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}<Looks6Icon/></>)
            }
    }
    

    return(
    <Table  bordered hover>
        <thead>
            <tr>
                <th style={{width:'4%'}}>NO</th>
                <th style={{width:'20%'}}>대리점명</th>
                <th style={{width:'10%'}}>담당자명</th>
                <th style={{width:'10%'}}>대리점 ID</th>
                <th style={{width:'10%'}}>휴대전화</th>
                <th style={{width:'10%'}}>가맹점수</th>
                <th style={{width:'6%'}}>상태</th>
                <th style={{width:'10%'}}>등록일</th>
                <th style={{width:'10%'}}>최종접속시간</th>
                <th style={{width:'10%'}}>관리</th>
            </tr>
        </thead>

        <tbody>
        {props.rows.map((event,idx)=>(
            <tr key={event.id}>
            <td>{(props.rows.length)-(idx)}</td>
            <td style={{textAlign:'left'}}>{rendering(event.level)}{event.agency_name}</td>
            <td>{event.manager_name}</td>
            <td>{event.username}</td>
            <td>{event.agency_tell}</td>
            <td>{event.counter}</td>
            <td ><Form.Select style={{width:'100%'}}  value={event.state} onChange={(e) => {  
                    setselect(e.target.value)

                    axios
                            .post(`${goturl}/agency/`, {
                                        mode:'change_normal',
                                        id:event.id,
                                        state:e.target.value
                                    })
                                    .then(function (response) {
                                        props.setloadstate('loaded')
                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                    });

                                }
                }>
                <option value="정상">정상</option>
                <option value="정지">정지</option>
            </Form.Select></td>
            <td>{event.date_joined}</td>
            <td>{event.last_login}</td>
            <td>
                <div style={{display: 'flex',justifyContent: 'center'}}>
                    <div style={{marginRight:'5px'}}>
                        <Agency_edit_modal setloadstate={props.setloadstate} id={event.id} />
                    </div>
                    <div style={{marginLeft:'5px'}}>
                        <Under_create_modal setloadstate={props.setloadstate} id={event.id} />
                    </div>
                </div>

            </td>
            </tr>
        
    ))}
    </tbody>
        </Table>
    );
}

function Btn(props){
    const [select, setselect] = useState('')
    const [search_name,setsearch_name] =useState('')
    const [search_num,setsearch_num] =useState('')
    const [search_email,setsearch_email] =useState('')

    const goturl = useSelector((state) => state);

    const handleSelect = (e) => {
        setselect(e.target.value);
      };

      const handlename = (e) => {
        setsearch_name(e.target.value);
      };
    
      const handelnum = (e) => {
        setsearch_num(e.target.value);
      };

      const handelemail = (e) => {
        setsearch_email(e.target.value);
      };
    return(
        <>
        <Box sx={{display:"flex", justifyContent:'flex-start', margin:0}} className="table_btn">
        
            <Form.Select style={{width:150}}  onChange={handleSelect}>
                <option>상태</option>
                <option value="정상">정상</option>
                <option value="정지">정지</option>
            </Form.Select>
        
            <TextField  label="이름" size="small" variant="outlined" onChange={handlename} />
            <TextField  label="전화번호" size="small" variant="outlined" onChange={handelnum}/>
            <TextField  label="이메일" size="small" variant="outlined" onChange={handelemail}/>
            
            
            <Button variant="primary"
            
            onClick={()=>{
                props.setloadstate('loaded')
            }}
        
            >초기화</Button>

            <Button variant="success"
            onClick={()=>{
                axios
                .post(`${goturl}/search/`, {
                    id : window.localStorage.getItem('id'),
                    select:select,
                    search_name:search_name,
                    search_num:search_num,
                    search_email:search_email,
                          

                        })
                        .then(function (response) {
                            props.setrows([...response.data])
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
            }}
            >검색</Button>
        </Box>
        </>
    )
}

export default function ListaBtn(props){
    const [rows, setrows] = useState([])
    const [loadstate, setloadstate] = useState('loaded');

    return(
        <>
        <Box sx={{display:"flex", flexDirection:'column', marginTop:2}}>
            <Btn setloadstate={setloadstate} rows={rows} setrows={setrows} />
            <Store_list loadstate={loadstate} setloadstate={setloadstate} rows={rows} setrows={setrows} change={props.change} setchange={props.setchange}/>
        </Box>
        </>
        
    )
}