
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Form,InputGroup } from 'react-bootstrap';
import Checkbox from '@mui/material/Checkbox';
import Acco_test from './Acco_test.js';
import SearchIcon from '@mui/icons-material/Search';

import axios from 'axios';
import {useSelector} from 'react-redux';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


function Matin_table(props){
    const goturl = useSelector((state) => state);
    const [loadstate, setloadstate] = useState('loaded');
    const [row, setrows] = useState([])

    if(loadstate==='loaded'){


            axios.get(`${goturl}/FAQ`)
            .then((response) => {
                setrows([...response.data])
                setloadstate('needload') 
                // props.setchange('changed')
              })
    }

    return(
        <>
        <div  style={{display: 'flex',flexDirection: 'column'}}>
            
            <div style={{height:'260px',width:'100%',backgroundColor:'#FFFFFF',display:'flex',flexDirection: 'column',justifyContent: 'center',alignItems:'center'}}>
                    <span style={{fontSize:'44px',fontWeight:'bold'}}>FAQ</span>
                    
                    
                    <InputGroup className="mb-3" style={{width:'500px',marginTop:'30px'}}>
                        <Form.Control
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        style={{border:'none',boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',borderRadius:'50px 0px 0px 50px',height:'50px'}}
                        />
                        <InputGroup.Text style={{border:'none',backgroundColor:'#fff',boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',borderRadius:'0px 50px 50px 0px',height:'50px'}}><SearchIcon sx={{color:'#A9A9A9'}}/></InputGroup.Text>
                    </InputGroup>
                    
            </div>
            <div style={{backgroundColor:'#fff',display:'flex',justifyContent: 'center',height:'40px'}}><div style={{width:'40%',display: 'flex',justifyContent:'flex-end'}}></div></div>
            <div style={{display: 'flex',justifyContent: 'center'}}>
                <div style={{width:'40%',marginTop:'30px',marginBottom:'30px'}}>
        
                {row.map((event,idx)=>(
                       <Acco_test   key={idx+event.id} id={event.id} quest={event.faq_title} con={event.contents} faq_catego={event.faq_catego} visdis={event.visdis} setloadstate={setloadstate}/> 
                ))}


                </div>


            </div>
        </div>
            
        </>
    )
    }



export default function SimplePaper() {
        
        return (
        <Box sx={{width:'100%',height:'100%',backgroundColor:'#F3F3F3'}}>
            <Matin_table/>
        </Box>
        );
    
}
