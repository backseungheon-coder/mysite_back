import React, { useState } from 'react';
import { ToggleButton,Modal,FloatingLabel,Button,ButtonGroup,Form } from 'react-bootstrap';
import axios from 'axios';
import Box from '@mui/material/Box';
import {useDropzone} from 'react-dropzone'
import { borderRadius } from '@mui/system';
import BackupIcon from '@mui/icons-material/Backup';
import styled, { css } from 'styled-components'



const Button_create = styled.button`
  background: #0D99FF;
  border-radius: 3px;
  width:80px;
  height: 30px;
  border:none;
  color:white;
  font-size:14px;
  
  &:hover {
    background: #0066FF;


  }
`

export default function FAQ_modal(props) {
    const [addr, getaddr] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [title,setTitle] =useState('');
    const [content,setContent] =useState('');
    const [cate,setCate] =useState('');
    const [radioValue, setRadioValue] = useState('1');



    const radios = [
        { name: '화면표시', value: '1' },
        { name: '화면표시안함', value: '0' },
      ];


    return (

        <>
            <Button_create onClick={handleShow}>
            <div>등록</div>
            </Button_create>
            
            <Modal show={show} onHide={handleClose} size="lg" style={{color:'black'}}>
                <Modal.Header closeButton>
                    <Modal.Title>FAQ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                
                <Form.Select aria-label="Default select example" className="mb-3" style={{height:'60px'}} onChange={(e) => setCate(e.target.value)} >
                        <option>카테고리</option>
                        <option value="앱/프로그램">앱/프로그램</option>
                        <option value="영업관리시스템">영업관리시스템</option>
                        <option value="영업정보공유">영업정보공유</option>
                        <option value="기타">기타</option>
                </Form.Select>
                <div style={{height: '20px'}}></div>

                <FloatingLabel
                    
                    controlId="floatingInput"
                    label="제목"
                    className="mb-3"
                ><Form.Control   onChange={(e) => setTitle(e.target.value)} type="title" placeholder="title" style={{height:'60px'}}/>
                </FloatingLabel>

                <div style={{height: '20px'}}></div>
                <FloatingLabel controlId="floatingTextarea2" label="답변입력">
                    <Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: '150px', marginBottom:'1rem' }}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    />
                </FloatingLabel>


                <ButtonGroup>
                    {radios.map((radio, idx) => (

                    <ToggleButton
                        key={idx}
                        id={`radio-${idx}`}
                        type="radio"
                        variant={idx % 2 ? 'outline-danger' : 'outline-primary'}
                        name="radio"
                        value={radio.value}
                        checked={radioValue === radio.value}
                        onChange={(e) => setRadioValue(e.currentTarget.value)}
                        style={{marginBottom:'30px'}}
                    >
                        {radio.name}
                    </ToggleButton>
                    
                    ))}
                </ButtonGroup>


                </Modal.Body>
                <Modal.Footer>
                        
                <Box  style={{width:'100%'} }>
                
                    <Box style={{float:'right', display:'flex'}}>
                    <Button variant="secondary"  onClick={handleClose} style={{marginRight:'10px'}}>
                        취소
                        </Button>
                        <Button variant="primary" 
                        
                        onClick={()=>{
                            axios
                            .post("http://127.0.0.1:8000/FAQ/", {
                                mode:'create',
                                faq_title:title,
                                faq_catego:cate,
                                visdis:radioValue,
                                contents:content,

                                    })
                                    .then(function (response) {
                                        setTitle('')
                                        setContent('')
                                        setCate('')
                                        setRadioValue(1)
                                        props.setloadstate('loaded') 

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