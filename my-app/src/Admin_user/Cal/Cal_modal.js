import React, { useState } from 'react';
import { Modal,FloatingLabel,Button,Form } from 'react-bootstrap';
import axios from 'axios';
import Box from '@mui/material/Box';
import styled from "styled-components";
import {useSelector} from 'react-redux';

const Button_cal = styled.button`
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

export default function Cal_modal(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [title,setTitle] =useState('');

    const goturl = useSelector((state) => state);
    
    return (
            
        <>
            <Button_cal onClick={handleShow}>
            정산 등록
            </Button_cal>
            
            <Modal show={show} onHide={handleClose} size="lg" style={{color:'black'}}>
                <Modal.Header closeButton>
                    <Modal.Title>정산등록</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                
                
                <FloatingLabel
                    
                    controlId="floatingInput"
                    label="제목"
                    className="mb-3"
                ><Form.Control   onChange={(e) => setTitle(e.target.value)} type="title" placeholder="title" style={{height:'60px'}}/>
                </FloatingLabel>



                </Modal.Body>
                <Modal.Footer>
                    
                <Box  style={{width:'100%'} }>
                    
                    <Box style={{float:'right', display:'flex'}}>
                    <   Button variant="secondary"  onClick={props.handleClose} style={{marginRight:'10px'}}>
                        취소
                        </Button>
                        <Button variant="primary" 
                        
                        onClick={()=>{
                            axios
                            .post(`${goturl}/Cal/`, {
                                mode:'create',
                                cal_title:title,
                                    })
                                    .then(function (response) {
                                        setTitle('')
                                        props.setloaded('needload') 
                                        
                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                    });
                                    handleClose()

                        }}

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