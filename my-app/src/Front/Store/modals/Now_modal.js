import React, { useState } from 'react';
import { ToggleButton,Modal,FloatingLabel,Button,ButtonGroup,Form } from 'react-bootstrap';
import axios from 'axios';
import Box from '@mui/material/Box';
import styled from 'styled-components'
import {useSelector} from 'react-redux';

const Examine_button = styled.button`
width:65px;
height:30px;
border:none;
border-radius: 5px;
font-size:14px;

background: ${props => props.background};
color: ${props => props.color};
border: ${props => props.border};

&:hover{
    background: ${props => props.hover};
    border: ${props => props.hborder};
    color: ${props => props.bcolor};
}
`



export default function Now_mdoal(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [content,setContent] =useState(props.now_memo);
    const [radioValue, setRadioValue] = useState(props.now);
    const [radiovari, setradiovari] = useState(props.nowbtn);

    const goturl = useSelector((state) => state);

    if(props.now === '대기'){
        var radio_color=('transparent')
        var border=('1px solid #FFD000')
        var fcolor=('#FFD000')
        var bhover = ('transparent')
        var bborder = ('1px solid #FFE500')
        var bcolor  = ('#FFE500')
    }
    else if(props.now === '승인'){
        var radio_color=('#06DE28')
        var border=('none')
        var fcolor=('white')
        var bhover=('#00FF28')
        var bborder = ('none')
        var bcolor  = ('white')

    }
    else if(props.now === '반려'){
        var radio_color=('#FE2222')
        var border=('none')
        var fcolor=('white')
        var bhover=('#FF4F59')
        var bborder = ('none')
        var bcolor  = ('white')
    }
    else{
        var radio_color=('#FFD000')
        var border=('none')
        var fcolor=('white')
        var bhover=('#FFE500')
        var bborder = ('none')
        var bcolor  = ('white')
    }

    const radios = [
      { name: '대기', value: '대기', vari:'outline-warning' },
      { name: '승인', value: '승인',vari:'outline-success' },
      { name: '반려', value: '반려',vari:'outline-danger' },
      { name: '보완완료', value: '보완완료',vari:'outline-warning' }
    ];
    return (
        <>
            
            <Examine_button 
            color={fcolor}
            background={radio_color}
            border={border}
            hover={bhover}
            hborder={bborder}
            bcolor = {bcolor}

            // style={{
            //     backgroundColor:radio_color,
            //     border:border,
            //     color:color
            //     }} 
                onClick={handleShow}>
            {radioValue}
            </Examine_button>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>검토 현황</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <ButtonGroup>
                    {radios.map((radio, idx) => (
                    <ToggleButton
                        style={{marginRight:5}}
                        key={idx}
                        id={`radio-${idx}`}
                        type="radio"
                        variant={radio.vari}
                        name="radio"
                        value={radio.value}
                        checked={radioValue === radio.value}
                        onChange={(e) => {     
                            setRadioValue(e.currentTarget.value);
                        }
                        }
                    >
                        {radio.name}
                    </ToggleButton>
                    ))}
                </ButtonGroup>

                <FloatingLabel controlId="floatingTextarea" label="검토내용" className="mb-3">
                        <Form.Control onChange={(e) => setContent(e.target.value)} as="textarea" style={{ height: '150px',marginTop:20 }} placeholder="Leave a comment here" value={content}/>
                </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Box  style={{width:'100%'} }>
                        
                        <Box style={{float:'right'} }>
                            <Button variant="secondary"  onClick={handleClose}>
                            취소
                            </Button>
                            <Button style={{marginLeft:2} } variant="primary" 
                            onClick={() => { 
                                axios
                                .post(`${goturl}/store/`, {
                                            mode:'now',
                                            id:props.id,
                                            now:radioValue,
                                            now_memo:content,
                                        })
                                        .then(function (response) {
                                            handleClose()
                                            props.setchange('needchange')
                                        })
                                        .catch(function (error) {
                        
                                        });
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