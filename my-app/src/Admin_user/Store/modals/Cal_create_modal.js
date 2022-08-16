import React, { useState,useEffect } from 'react';
import { Modal,Button,Table } from 'react-bootstrap';
import styled from "styled-components"
import Box from '@mui/material/Box';
import './scss/Cal_c_modal.scss'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import {useSelector} from 'react-redux';

const Button_Cal = styled.button`
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
    const goturl = useSelector((state) => state);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [cal_tlist,setTList] = useState([]);
    const [cal_ilist,setIList] = useState([]);
    const [mode, setmode] = useState('title_list');
    const [loaded, setLoad] = useState('needload')
    const [inner_id,setId] = useState('')
    const [title_name, setName] = useState('')


    
    
    
    useEffect(() => {

        if (loaded=== 'needload'){
            
        axios.get(`${goturl}/Cal/`)
        .then((response) => {
            setTList([...response.data])
            setLoad('loaded')
        })

        }
        else if(loaded === 'inner_load'){
            console.log(props.checked)
            axios.post(`${goturl}/Cal/`, {
                mode:'load',
                id:inner_id,
            })
            .then((response) => {
            
    
            setIList([...response.data])
            setLoad('loaded')
            })

        }

      });

    if(mode === 'title_list') {
        var element = (
            <div className='cal_create_body'>

                {cal_tlist.map((event,idx)=>(
                    <button id='container' onClick={() =>(
                        
                        setmode('inner_list'),
                        setId(event.id),
                        setLoad('inner_load'),
                        setName(event.cal_title)
                    )}  key={idx}>
                        <p>{event.cal_title}</p>
                    </button>
                ))}

            </div>
        )
    }
    else if(mode === 'inner_list') {
        var element = (
        <div className='cal_inner_body'>
            <div id='inner_title' >
            <div><button onClick={()=>(
                setmode('title_list')
            )}><ArrowBackIcon/></button></div>


            <p>{title_name}</p>
                
            </div>


            <div id='inner_con'>
            <Table  bordered hover>
                <thead>
                    <tr id='thead_tr'>
                    <th>차수명</th>
                    <th>차수 설명</th>
                    <th>등록일</th>
                    <th>등록</th>
                    </tr>
                </thead>
                <tbody>
                    

                {cal_ilist.map((event,idx)=>(
                    <tr id='tbody_tr' key={idx}>
                        <td>{event.cal_name}</td>
                        <td>{event.cal_sub}</td>
                        <td>{event.created_date}</td>
                        <td><button
                        onClick={() =>(
                            axios.post(`${goturl}/Cal/`, {
                                
                                mode:'checked',
                                checked:props.checked,
                                id:event.id
                            })
                            .then((response) => {
                                
                                alert('등록이 완료 되었습니다.')
                                window.location.reload()
                            }).catch(
                                
                            )

                        )}
                        >등록</button></td>
                    </tr>
                ))}
                </tbody>
            </Table>
            </div>

        </div>
        )

    }
    

    return (

        <>
            <Button_Cal variant="outline-primary" style={{marginRight:'10px'}} onClick={handleShow}>일괄정산</Button_Cal>
            
            <Modal show={show} onHide={handleClose} size="lg" style={{color:'black'}}>
                <Modal.Header closeButton>
                    <Modal.Title>일괄 정산</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {element}

                    
                </Modal.Body>
                <Modal.Footer>
                    
                <Box  style={{width:'100%'} }>
    
                    <Box style={{float:'right'} }>
                        <Button variant="primary"  onClick={handleClose}>
                        확인
                        </Button>
                    </Box>
                </Box>
                </Modal.Footer>

            </Modal>
        </>







    );
  }