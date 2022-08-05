
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './Notice.scss'
import { Table } from 'react-bootstrap';
import SearchIcon from '@mui/icons-material/Search';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components'
import Pagination from './Pagination.js'
import axios from 'axios';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import {useSelector} from 'react-redux';


const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid #0D99FF;
  color: #0D99FF;
  margin-top: 10px;
  padding: 0.25em 1em;

    &:hover{
        border: 2px solid #0D99FF;
        color: white;
        background: #0D99FF;
    }
`

function Notice_list(props){

    const [rows, setrows] = useState([]);
    const goturl = useSelector((state) => state);

    if(props.loaded === 'loaded'){
      const url =`${goturl}/notice/get`;
    axios({
        method: "GET",
        url: url,
        data: '',
        headers:{
            "Content-Type":"application/json",
            }
    }).then(function(response){

      var box_list = []

      if(props.state === 'all'){
        setrows([...response.data])
        
      }
      else if(props.state ==='default'){

        for(let i = 0; i < [...response.data].length; i++){
          if ([...response.data][i].Notice_cate.includes('일반') == true){
            box_list.push([...response.data][i])
          }
        }
        setrows(box_list)
      }
      else if(props.state === 'system'){
        for(let i = 0; i < [...response.data].length; i++){
          if ([...response.data][i].Notice_cate.includes('시스템') == true){
            box_list.push([...response.data][i])
          }
        }
        setrows(box_list)
      }
      else{
        for(let i = 0; i < [...response.data].length; i++){
          if ([...response.data][i].Notice_cate.includes('기타') == true){
            box_list.push([...response.data][i])
          }
        }
        setrows(box_list)
      }
      
      props.setloaded('needloade')
    })
    }

    return(
        <div style={{width: '100%', height: '100%',display: 'flex',flexDirection: 'column',justifyContent: 'center'}}>
            <Table hover style={{marginTop:'0px',width:'100%',display:'flex',flexDirection:'column',justifyContent: 'center'}}>

            <thead style={{display:'flex', justifyContent: 'center',backgroundColor:'white',height:'50px',alignItems: 'center'}}>
                <tr style={{display:'flex', justifyContent: 'center',width:'60%',border:'0px'}}>
                    <th style={{width:'5%',border:'0px'}}>NO</th>
                    <th style={{width:'25%',border:'0px'}}>구분</th>
                    <th style={{width:'60%',border:'0px'}}>제목</th>
                    <th style={{width:'10%',border:'0px'}}>등록일</th>
                </tr>
            </thead>

            <tbody style={{display:'flex',flexDirection:'column',borderTop:'0px',alignItems: 'center',minHeight:'550px'}}>
                    
            {rows.map((event,idx)=>{

                    if(event.important==true){
                      return(
                        <tr key={idx} style={{display:'flex', justifyContent: 'center',width:'60%',height:'55px',alignItems: 'center',backgroundColor:'#F3F3F3'}}>
                            <td style={{width:'5%',border:'0px',height:'48px',display:'flex',alignItems: 'center',justifyContent: 'center'}}>{(rows.length)-(idx)}</td>
                            <td style={{width:'25%',border:'0px',display:'flex',justifyContent: 'center'}}>
                                <div style={{width:'84px',height:'32px',border:'1px solid #FE2222',backgroundColor:'white',borderRadius:'20px',alignItems: 'center',display:'flex',justifyContent: 'center' , color:'#FE2222'}}>
                                    {event.Notice_cate}
                                </div>
                            </td>
                            <td style={{width:'60%',border:'0px',display:'flex',justifyContent: 'space-between',height:'48px',alignItems:'center'}}
                            onClick={(e) =>{
                              props.setInneritem(event);
                              props.setloaded('loaded');
                              props.setdisplay('inner');
                              props.setFileList(event._file)
                            }}
                            > <span style={{color:'#FE2222'}}>{event.notice_title}</span> <span><AttachFileIcon/></span>  </td>
                            <td style={{width:'10%',border:'0px',display:'flex',justifyContent: 'center',height:'48px',alignItems:'center'}}>{event.created_date}</td>
                        </tr>
                      )
                    }
                    else{
                      return(
                        <tr key={idx} style={{display:'flex', justifyContent: 'center',width:'60%',height:'55px',alignItems: 'center'}}>
                            <td style={{width:'5%',border:'0px',height:'48px',display:'flex',alignItems: 'center',justifyContent: 'center'}}>{(rows.length)-(idx)}</td>
                            <td style={{width:'25%',border:'0px',display:'flex',justifyContent: 'center'}}>
                                <div style={{width:'84px',height:'32px',border:'1px solid black',backgroundColor:'white',borderRadius:'20px',alignItems: 'center',display:'flex',justifyContent: 'center' }}>
                                    {event.Notice_cate}
                                </div>
                            </td>
                            <td style={{width:'60%',border:'0px',display:'flex',justifyContent: 'space-between',height:'48px',alignItems:'center'}}
                            onClick={(e) =>{
                              props.setInneritem(event);
                              props.setloaded('loaded');
                              props.setdisplay('inner');
                            }}
                            > <span>{event.notice_title}</span> <span><AttachFileIcon/></span>  </td>
                            <td style={{width:'10%',border:'0px',display:'flex',justifyContent: 'center',height:'48px',alignItems:'center'}}>{event.created_date}</td>
                        </tr>
                      )
                    }  
                  })}                    
            </tbody>
            </Table>
            <div style={{width:'100%',display:'flex',flexDirection:'column',alignItems: 'center'}}>
                <div style={{display:'flex',justifyContent: 'flex-end',width:'60%',borderTop:'1px solid #D1D1D1'}}>
                    <Button onClick={()=>{props.setdisplay('create')} }>글쓰기</Button>
                </div>
            </div>
        </div>
    )
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.setloaded('loaded')
  };

  return (
    <Box sx={{ width: '100%'}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider',width: '100%',display: 'flex',justifyContent: 'center',backgroundColor: 'white' }}>

        <Box sx={{width: '60%',display: 'flex',justifyContent: 'flex-end',alignItems: 'center'}}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{width: '100%'}}>
            <Tab sx={{fontWeight: 'bold'}} label="전체" {...a11yProps(0)} />
            <Tab label="일반 공지" {...a11yProps(1)} />
            <Tab label="시스템 공지" {...a11yProps(2)} />
            <Tab label="기타 공지" {...a11yProps(3)} />
        </Tabs>

            <InputGroup className="mb-3" style={{width:'500px'}}>
                <Form.Control
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                style={{borderLeft: '1px solid #D1D1D1',borderRadius:'50px 0px 0px 50px',height:'30px'}}
                />
                <InputGroup.Text style={{backgroundColor:'white',border:'1px solid #D1D1D1',borderRadius:'0px 50px 50px 0px',height:'30px'}}><SearchIcon sx={{color:'#A9A9A9'}}/></InputGroup.Text>
            </InputGroup>

        </Box>
      </Box>

      <TabPanel value={value} index={0} style={{width: '100%'}} className='tab'>
        <Box sx={{width: '100%',display: 'flex',justifyContent: 'center',backgroundColor:'white'}} className="box">
                <Notice_list setFileList={props.setFileList} state={'all'} setdisplay={props.setdisplay} setloaded={props.setloaded} loaded={props.loaded} setInneritem={props.setInneritem}/>
        </Box>
      </TabPanel>

      <TabPanel value={value} index={1} style={{width: '100%'}} className='tab'>
        <Box sx={{width: '100%',display: 'flex',justifyContent: 'center',backgroundColor:'white'}} className="box">
                <Notice_list setFileList={props.setFileList} state={'default'} setdisplay={props.setdisplay} setloaded={props.setloaded} loaded={props.loaded} setInneritem={props.setInneritem}/>
        </Box>
      </TabPanel>

      <TabPanel value={value} index={2} style={{width: '100%'}} className='tab'>
        <Box sx={{width: '100%',display: 'flex',justifyContent: 'center',backgroundColor:'white'}} className="box">
                <Notice_list setFileList={props.setFileList} state={'system'} setdisplay={props.setdisplay} setloaded={props.setloaded} loaded={props.loaded} setInneritem={props.setInneritem}/>
        </Box>
      </TabPanel>

      <TabPanel value={value} index={3} style={{width: '100%'}} className='tab'>
        <Box sx={{width: '100%',display: 'flex',justifyContent: 'center',backgroundColor:'white'}} className="box">
                <Notice_list setFileList={props.setFileList} state={'else'} setdisplay={props.setdisplay} setloaded={props.setloaded} loaded={props.loaded} setInneritem={props.setInneritem}/>
        </Box>
      </TabPanel>
    </Box>
  );
}
