import React, { useState } from 'react';
import { ToggleButton,Modal,FloatingLabel,Button,Collapse,ButtonGroup,Tabs,Tab,FormControl,Form,Dropdown,DropdownButton,InputGroup } from 'react-bootstrap';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import styled from "styled-components";
import {useSelector} from 'react-redux';

const Button_agency = styled.button`
background: transparent;
border:2px solid #0D99FF;
color: #0D99FF;
width: 100px;
height: 38px;
border-radius:6px;
&:hover{
    background-color: #0D99FF;
    color:white;
}
`   


function Agency_edit(props){
    const [username,setusername] = useState('');
    const [password,setpassword] = useState('');
    const [agency_name,setagency_name] = useState('');
    const [agency_tell,setagency_tell] = useState('');
    const [manager_name,setmanager_name] = useState('');
    const [agency_email,setagency_email] = useState('');


    const onChange1 = (event) => {setusername(event.target.value);}
    const onChange2 = (event) => {setpassword(event.target.value);}
    const onChange3 = (event) => {setagency_name(event.target.value);}
    const onChange4 = (event) => {setagency_tell(event.target.value);}
    const onChange5 = (event) => {setmanager_name(event.target.value);}
    const onChange6 = (event) => {setagency_email(event.target.value);}

    return(
        <>
        <FloatingLabel
            controlId="floatingInput"
            label="대리점ID"
            className="mb-3"
        ><Form.Control  value={username} onChange={onChange1} style={{height:'60px'}}/>
        </FloatingLabel>

        <FloatingLabel
        controlId="floatingInput"
        label="비밀번호"
        className="mb-3"
        ><Form.Control  value={password} onChange={onChange2} style={{height:'60px'}}/>
        </FloatingLabel>

        <FloatingLabel
        controlId="floatingInput"
        label="대리점명"
        className="mb-3"
        ><Form.Control  value={agency_name} onChange={onChange3} style={{height:'60px'}}/>
        </FloatingLabel>

        <FloatingLabel
        controlId="floatingInput"
        label="휴대전화"
        className="mb-3"
        ><Form.Control  value={agency_tell} onChange={onChange4} style={{height:'60px'}}/>
        </FloatingLabel>

        <FloatingLabel
        controlId="floatingInput"
        label="담당자명"
        className="mb-3"
        ><Form.Control  value={manager_name} onChange={onChange5} style={{height:'60px'}}/>
        </FloatingLabel>

        <FloatingLabel
        controlId="floatingInput"
        label="이메일"
        className="mb-3"
        ><Form.Control  value={agency_email} onChange={onChange6} style={{height:'60px'}}/>
        </FloatingLabel>

        <Form.Select style={{width:150}}>
                <option>상태</option>
                <option value="정상">정상</option>
                <option value="정지">정지</option>
        </Form.Select>
        


        </>
    );
}


export default function Memo_modal(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [content,setContent] =useState('');
    const [username,setusername] = useState('');
    const [password,setpassword] = useState('');
    const [agency_name,setagency_name] = useState('');
    const [agency_tell,setagency_tell] = useState('');
    const [manager_name,setmanager_name] = useState('');
    const [agency_email,setagency_email] = useState('');


    const [username_avaliable,setusername_avaliable] = useState('none');
    const [email_avaliable,setemail_avaliable] = useState('none');



    const isEmail_user = (email) => {
        const emailRegex =
            /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        if (email === ''){
            setusername_avaliable('none')
        }
        else{
            if (emailRegex.test(email) === false){
                setusername_avaliable('false')
            }
            else if (emailRegex.test(email) === true){
                setusername_avaliable('true')
            }
        }
        return emailRegex.test(email);
      };


    const isEmail_email = (email) => {
        const emailRegex =
            /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        if (email === ''){
            setemail_avaliable('none')
        }
        else{
            if (emailRegex.test(email) === false){
                setemail_avaliable('false')
            }
            else if (emailRegex.test(email) === true){
                setemail_avaliable('true')
            }
        }
        return emailRegex.test(email);
      };


    


      

    const onChange1 = (event) => {
        isEmail_user(event.target.value)
        isEmail_email(event.target.value)
        setusername(event.target.value); 
        setagency_email(event.target.value);
    }
    const onChange2 = (event) => {setpassword(event.target.value);}
    const onChange3 = (event) => {setagency_name(event.target.value);}
    const onChange4 = (event) => {setagency_tell(event.target.value);}
    const onChange5 = (event) => {setmanager_name(event.target.value);}
    const onChange6 = (event) => {isEmail_email(event.target.value); setagency_email(event.target.value);} 
    const goturl = useSelector((state) => state);

    


    if( username_avaliable === 'none' ){
        var id_form = (
            <>
                <TextField fullWidth  className="mb-3" label="이메일ID" value={username} onChange={onChange1} variant="outlined" />
                <div style={{marginBottom:'15px'}}></div>
            </>

        )
    }
    else if( username_avaliable === 'false'){
        var id_form = (
            <>
            <TextField
              fullWidth
              error
              id="outlined-error-helper-text"
              label="Error"
              value={username}
              onChange={onChange1}
              helperText="이메일을 형식의 아이디를 입력 하십시오"
            />
            <div style={{marginBottom:'15px'}}></div>
            </>
        )

    }else if( username_avaliable === 'true'){
        var id_form = (
            <>
            <TextField fullWidth  className="mb-3" label="성공" value={username} onChange={onChange1} variant="outlined" color="success" focused />
            <div style={{marginBottom:'15px'}}></div>
            </>
        )
    }


    if( email_avaliable === 'none' ){
        var email_form = (
            <>
                <TextField fullWidth  className="mb-3" label="이메일" value={agency_email} onChange={onChange6} variant="outlined"/>
                <div style={{marginBottom:'15px'}}></div>
            </>

        )
    }
    else if( email_avaliable === 'false'){
        var email_form = (
            <>
            <TextField
              fullWidth
              error
              id="outlined-error-helper-text"
              label="Error"
              value={agency_email}
              onChange={onChange6}
              helperText="이메일을 형식의 아이디를 입력 하십시오"
            />
            <div style={{marginBottom:'15px'}}></div>
            </>
        )

    }else if( email_avaliable === 'true'){
        var email_form = (
            <>
            <TextField fullWidth  className="mb-3" label="성공" value={agency_email} onChange={onChange6} variant="outlined" color="success" focused />
            <div style={{marginBottom:'15px'}}></div>
            </>
        )
    }




  
    return (
        <>

        <Button_agency variant='outline-primary' onClick={()=>{
             handleShow()
        }
        }
        >
          가맹점등록
        </Button_agency>


        

        <Modal show={show} onHide={handleClose} >
            <Modal.Header closeButton>
                <Modal.Title>가맹점 등록</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            
            <>
                {id_form}
                <TextField fullWidth  label="Password" className="mb-3" type="password" onChange={onChange2} autoComplete="current-password" />
                <div style={{marginBottom:'15px'}}></div>
                <TextField fullWidth  className="mb-3" label="대리점명" value={agency_name} onChange={onChange3} variant="outlined" />
                <div style={{marginBottom:'15px'}}></div>
                <TextField fullWidth  className="mb-3" label="휴대전화" value={agency_tell} onChange={onChange4} variant="outlined" />
                <div style={{marginBottom:'15px'}}></div>
                <TextField fullWidth  className="mb-3" label="담당자명" value={manager_name} onChange={onChange5} variant="outlined" />
                <div style={{marginBottom:'15px'}}></div>
                {email_form}               

                </>
                </Modal.Body>
            <Modal.Footer>
            <Box  style={{width:'100%'} }>
                    
                    <Box style={{float:'right'} }>
                        <Button variant="secondary"  onClick={handleClose}>
                        취소
                        </Button>

                        <Button style={{marginLeft:2} } variant="primary" 
                        onClick={() => {  

                            if(username_avaliable === 'true'){
                                  axios
                            .post(`${goturl}/signup/`, {
                                        mode:'post',
                                        username:username,
                                        password:password,
                                        password1:password,
                                        password2:password,
                                        agency_name:agency_name,
                                        agency_tell:agency_tell,
                                        manager_name:manager_name,
                                        agency_email:agency_email,
                                        level:1,
                                        devide:1,
                                        group_user:agency_name,
                                        group:agency_name,
                                    })
                                    .then(function (response) {
                                        setContent(response.data)
                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                    });

                                handleClose()
                                props.setchange('needchange')
                                }
                                else{
                                    alert('에러표시된 항목으로 해결 해주시기 바랍니다.')
                                }
                            }
                            }                          
                          
                            >
                        등록
                        </Button>
                    </Box>
                </Box>

                
            </Modal.Footer>
        </Modal>
      </>

    );
}