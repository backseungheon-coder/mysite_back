import React, { useState,useEffect } from 'react';
import { Modal,Button,Table } from 'react-bootstrap';
import axios from 'axios';
import Box from '@mui/material/Box';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import styled from 'styled-components'
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import {useSelector} from 'react-redux';
const Button_cal = styled.button`
background: transparent;
border:none;
`

export default function Cal_modal(props) {
    const [show, setShow] = useState(false);
    const [calrows,setCalrows] = useState([]);
    const handleClose = () => setShow(false);
    const [laoded, setLoaded] = useState(false);
    const handleShow = () => (setShow(true),setLoaded(true));
    const goturl = useSelector((state) => state);
    if(laoded===true){
        axios.post(`${goturl}/store/`, {
                mode:'cal_get',
                id:props.id,
            })
            .then(function (response) {
            setCalrows([...response.data])
            setLoaded(false)
            })
            .catch(function (error) {
                console.log(error);
            })
    }




    return (
        <>


            <Button_cal
            onClick={handleShow}
            >
             <HistoryToggleOffIcon sx={{fontSize:'30px',color:"#595c97"}}/>
            </Button_cal>
            
            <Modal show={show} onHide={handleClose} size="lg" style={{color:'black'}}>
                <Modal.Header closeButton>
                    <Modal.Title>정산 내역</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>NO</th>
                        <th>등록일</th>
                        <th>차수명</th>
                        <th>설명</th>
                        </tr>
                    </thead>

                    <tbody>
                    {calrows.map((event,idx)=>(
                        <tr key={idx}>
                        <td>{(calrows.length)-(idx)}</td>
                        <td>{event.created_date}</td>
                        <td>{event.cal_name}</td>
                        <td>{event.cal_sub}</td>
                        </tr>
                    ))}
                    </tbody>

                    </Table>

                
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