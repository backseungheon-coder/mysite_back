import React, { useState } from 'react';
import { ToggleButton,Modal,FloatingLabel,Button,ButtonGroup,Form} from 'react-bootstrap';
import axios from 'axios';
import Box from '@mui/material/Box';
import styled from 'styled-components'
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {useSelector} from 'react-redux';
const Button_edit = styled.button`
  background: transparent;
  border:none;
  color: #FE2222;

  &:hover{
    color:#FF4F59;
  }
`

export default function FAQ_modal(props) {

    const goturl = useSelector((state) => state);
    const [addr, getaddr] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [title,setTitle] =useState(props.faq_title);
    const [content,setContent] =useState(props.contents);
    const [cate,setCate] =useState(props.faq_catego);
    const [radioValue, setRadioValue] = useState(props.visdis);


    const radios = [
        { name: '화면표시', value: '1' },
        { name: '화면표시안함', value: '0' },
      ];

    
    return (

        <>

            <Button_edit onClick={handleShow}><BorderColorIcon/></Button_edit>
            
            <Modal show={show} onHide={handleClose} size="lg" style={{color:'black'}}>
                <Modal.Header closeButton>
                    <Modal.Title>FAQ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                
                <Form.Select aria-label="Default select example" className="mb-3" style={{height:'60px'}} onChange={(e) => setCate(e.target.value)} value={cate}>
                        <option>카테고리</option>
                        <option value="앱/프로그램">앱/프로그램</option>
                        <option value="영업관리시스템">영업관리시스템</option>
                        <option value="영업정보공유">영업정보공유</option>
                        <option value="기타">기타</option>
                </Form.Select>


                <FloatingLabel
                    
                    controlId="floatingInput"
                    label="제목"
                    className="mb-3"
                ><Form.Control   onChange={(e) => setTitle(e.target.value)} type="title" placeholder="title" style={{height:'60px'}} value={title}/>
                </FloatingLabel>


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
                    <Box style={{float:'left', display:'flex'}}>
                    <Button variant="danger"  style={{marginRight:'10px'}}
                    
                    onClick={()=>{
                        axios
                        .post(`${goturl}/FAQ/`, {
                            mode:'delete',
                            id:props.id,

                                })
                                .then(function (response) {
                                 
                                    props.setloadstate('loaded') 

                                })
                                .catch(function (error) {
                                    console.log(error);
                                });
                                handleClose()

                    }}
                    
                    
                    >
                        삭제
                    </Button>

                    </Box>
                    <Box style={{float:'right', display:'flex'}}>
                    <   Button variant="secondary"  onClick={handleClose} style={{marginRight:'10px'}}>
                        취소
                        </Button>
                        <Button variant="primary" 
                        
                        onClick={()=>{
                            axios
                            .post(`${goturl}/FAQ/`, {
                                mode:'edit',
                                id:props.id,
                                faq_title:title,
                                faq_catego:cate,
                                visdis:radioValue,
                                contents:content,

                                    })
                                    .then(function (response) {
                                    
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