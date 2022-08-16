import React, {  useState } from 'react';
import { Modal,Button } from 'react-bootstrap';
import Create_modal from "./modals/Create_modal.js";
import {useSelector} from 'react-redux';
import axios from 'axios';
import Box from '@mui/material/Box';
import styled from "styled-components";



const Button_store = styled.button`
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

function Button_bottom(props){
    
    const goturl = useSelector((state) => state);
        return(
            <Box  style={{width:'100%'} }>
                    
    
                    <Box style={{float:'right'} }>
                        <Button variant="secondary"  onClick={props.handleClose}>
                        취소
                        </Button>
                        
                        <Button style={{marginLeft:2} } variant="primary" 
                        onClick={() => {  
                            axios
                                .post(`${goturl}/store/`, {
                                            mode:'create',
                                            agency_id:props.agency,
                                            store_name: props.store_name,
                                            store_tell: props.store_tell,
                                            store_add: props.store_addr,
                                            memo: props.memo,
                                            state: props.k_state,
                                        })
                                        .then(function (response) {
                                            
                                            props.handleClose()
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
        );

}

function Modal_html(props){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    
    const handleShow = () => setShow(true);


    return(
    <>
    <Button_store variant={props.btn} onClick={handleShow}>
      {props.title}
    </Button_store>

    <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
            <Modal.Title>{props.state}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
        {props.val}
        
            </Modal.Body>
        <Modal.Footer>
            <Button_bottom agency={props.agency} setchange={props.setchange} store_name={props.store_name} store_tell={props.store_tell} store_addr={props.store_addr} k_state={props.k_state} memo={props.memo} id={props.id} handleClose={handleClose} btn_bottom={props.btn_bottom}/>
        </Modal.Footer>
    </Modal>
  </>
    )
}

export default function Create_store(props) {
    const [show, setShow] = useState(false);
    const [agency, setAgency] = useState('');
    const [name, setname] = useState('');
    const [tell, settell] = useState('');
    const [addr, setaddr] = useState('');
    const [state, setstate] = useState('');
    const [memo, setmemo] = useState('');
    




  
    return (
        <Modal_html agency={agency} setchange={props.setchange} store_name={name} store_tell={tell} store_addr={addr} k_state={state} memo={memo} state={'가맹점 등록'} title={'가맹점등록'} val=
    {
        <Create_modal setAgency={setAgency} getData={setname} getTell={settell} getaddr={setaddr} getstate={setstate} getmemo={setmemo}/>
    } 
    btn={'outline-primary'} />
    );
    

    
  }