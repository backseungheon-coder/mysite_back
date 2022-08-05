import React, { useState } from 'react';
import { ToggleButton,Modal,FloatingLabel,Collapse,ButtonGroup,Tabs,Tab,FormControl,Form,Dropdown,DropdownButton,InputGroup } from 'react-bootstrap';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import styled from 'styled-components'
import {useSelector} from 'react-redux';

const Button = styled.button`
background: #FE2222;
color:white;
width:50px;
height: 30px;
border-radius:3px;
border: none;

&:hover{
    background-color: #FF4F59;
}
`

function Agency_edit(props){


    const onChange1 = (event) => {props.setusername(event.target.value);}
    const onChange2 = (event) => {props.setpassword(event.target.value);}
    const onChange3 = (event) => {props.setagency_name(event.target.value);}
    const onChange4 = (event) => {props.setagency_tell(event.target.value);}
    const onChange5 = (event) => {props.setmanager_name(event.target.value);}
    const onChange6 = (event) => {props.setagency_email(event.target.value);}


    return(
        <>
        <TextField fullWidth className="mb-3" label="대리점ID" value={props.username} onChange={onChange1} variant="outlined" />
        <div style={{marginBottom:'15px'}}></div>
        <TextField fullWidth  label="Password" className="mb-3" type="password" onChange={onChange2} autoComplete="current-password" />
        <div style={{marginBottom:'15px'}}></div>
        <TextField fullWidth  className="mb-3" label="대리점명" value={props.agency_name} onChange={onChange3} variant="outlined" />
        <div style={{marginBottom:'15px'}}></div>
        <TextField fullWidth  className="mb-3" label="휴대전화" value={props.agency_tell} onChange={onChange4} variant="outlined" />
        <div style={{marginBottom:'15px'}}></div>
        <TextField fullWidth  className="mb-3" label="담당자명" value={props.manager_name} onChange={onChange5} variant="outlined" />
        <div style={{marginBottom:'15px'}}></div>
        <TextField fullWidth  className="mb-3" label="이메일" value={props.agency_email || ""} onChange={onChange6} variant="outlined" />

        


        </>
    );
}


export default function Agency_eidt_modal(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [content,setContent] =useState('');
    const [data,setData] =useState([]);

    const [username,setusername] = useState('');
    const [password,setpassword] = useState('');
    const [agency_name,setagency_name] = useState('');
    const [agency_tell,setagency_tell] = useState('');
    const [manager_name,setmanager_name] = useState('');
    const [agency_email,setagency_email] = useState('');
    const goturl = useSelector((state) => state);

    return (
        <>

        <Button variant='danger' onClick={()=>{
            axios
            .post(`${goturl}/agency/`, {
                        mode:'get',
                        id:props.id,

                    })
                    .then(function (response) {
                        setusername(response.data.username)
                        setagency_name(response.data.agency_name)
                        setagency_tell(response.data.agency_tell)
                        setmanager_name(response.data.manager_name)
                        setagency_email(response.data.email_addres)
         
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
             

            handleShow()
        }
        }
        >
          관리
        </Button>


        <Modal show={show} onHide={handleClose} >
            <Modal.Header closeButton>
                <Modal.Title>가맹점 수정</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            
                <Agency_edit 
                username={username} agency_name={agency_name} agency_tell={agency_tell} manager_name={manager_name} agency_email={agency_email}
                setusername={setusername} setpassword={setpassword} setagency_name={setagency_name} setagency_tell={setagency_tell} setmanager_name={setmanager_name} setagency_email={setagency_email}
                />    

                </Modal.Body>
            <Modal.Footer>
            <Box  style={{width:'100%'} }>
                    
                    <Box style={{float:'left'} }>
                        <Button variant="danger" 
                        onClick={() => {  
                            axios
                                .post(`${goturl}/agency_del/`, {
                                            id:props.id
                                        })
                                        .then(function (response) {
                                            handleClose()
                                            props.setloadstate('loaded')
                                        })
                                        .catch(function (error) {
                                            console.log(error);
                                        });
                                    }
                            
                                }
                        >
                            삭제
                        </Button>
                    </Box>
    
                    <Box style={{float:'right'} }>
                        <Button variant="secondary"  onClick={handleClose}>
                        취소
                        </Button>

                        <Button style={{marginLeft:2} } variant="primary" 
                        onClick={() => {  
                            axios
                                .post(`${goturl}/agency/`, {
                                            mode:'edit',
                                            id:props.id,
                                            username: username,
                                            password: password,
                                            password1: password,
                                            password2: password,
                                            agency_name: agency_name,
                                            agency_tell:agency_tell,
                                            manager_name: manager_name,
                                            agency_email:agency_email,
                                        })
                                        .then(function (response) {
                                            handleClose()
                                            props.setloadstate('loaded')
                                        })
                                        .catch(function (error) {
                                            console.log(error);
                                        });
                                    }
                            
                                }
                            >
                        수정
                        </Button>
                    </Box>
                </Box>

                
            </Modal.Footer>
        </Modal>
      </>

    );
}