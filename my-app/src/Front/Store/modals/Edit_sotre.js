import React, { useState } from 'react';
import { Modal,Button,FloatingLabel,Form } from 'react-bootstrap';
import axios from 'axios';
import Box from '@mui/material/Box';
import styled from 'styled-components'
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {useSelector} from 'react-redux';

const IconButton = styled.button`
background: transparent;
border-radius: 3px;
border: none;
color: #F67878;
margin: 0 1em;
padding: 3px 5px;

&:hover{
    color: #FF0000;
}
`

export default function Edit_sotre(props) {
    const [store_name,setname] = useState(props.store_name);
    const [store_tell,setstore_tell] = useState(props.store_tell);
    const [store_add,setstore_add] = useState(props.store_add);
    const [state,setstate] = useState(props.state);
    const [memo,setmemo] = useState('');


    const [key, setKey] = useState('store');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const onChange1 = (event) => {setname(event.target.value);}
    const onChange2 = (event) => {setstore_tell(event.target.value);}
    const onChange3 = (event) => {setstore_add(event.target.value);}
    const onChange4 = (event) => {setstate(event.target.value);}
    const onChange5 = (event) => {setmemo(event.target.value);}
    const goturl = useSelector((state) => state);
    

    

    return (
        <>
        <IconButton variant={'outline-danger'} onClick={()=>{
          axios
          .post(`${goturl}/store/`, {
                      mode:'get',
                      id:props.id,

                  })
                  .then(function (response) {
                      setmemo(response.data)
                      props.setchange('needchange')
                  })
                  .catch(function (error) {
                      console.log(error);
                  });
          handleShow()
        }
        }>
        <BorderColorIcon sx={{fontSize:'30px',color:'#FE2222'}}/>
        </IconButton>
    
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>????????? ??????</Modal.Title>
            </Modal.Header>
            <Modal.Body>



            


            <FloatingLabel
                    controlId="floatingInput"
                    label="??????????????????"
                    className="mb-3"
                    
            ><Form.Control  value={store_name} onChange={onChange1} style={{height:'60px'}}/>


            </FloatingLabel>
            <FloatingLabel
                    controlId="floatingInput"
                    label="????????????"
                    className="mb-3"
            ><Form.Control value={store_tell} onChange={onChange2} type="tell"style={{height:'60px'}} />
            </FloatingLabel>

            
            <FloatingLabel
                    
                    controlId="floatingInput"
                    label="??????"
                    className="mb-3"
            ><Form.Control  onChange={onChange3} value={store_add} style={{height:'60px'}}/>
            </FloatingLabel>
            

            <Form.Select onChange={onChange4} value={state} aria-label="Default select example" className="mb-3" style={{height:'60px'}}>
                        <option>??????</option>
                        <option value="??????">??????</option>
                        <option value="??????">??????</option>
                        <option value="??????">??????</option>
                        <option value="??????">??????</option>
                        <option value="??????">??????</option>
                        <option value="??????">??????</option>
                        <option value="??????">??????</option>
                        <option value="??????">??????</option>
                        <option value="??????">??????</option>
                        <option value="??????">??????</option>
                        <option value="??????">??????</option>
                        <option value="??????">??????</option>
                        <option value="??????">??????</option>
                        <option value="??????">??????</option>
            </Form.Select>

            <FloatingLabel controlId="floatingTextarea" label="???????????? & ??????" className="mb-3">
                <Form.Control value={memo} onChange={onChange5} as="textarea" style={{ height: '150px' }} placeholder="Leave a comment here" />
            </FloatingLabel>
            
                  </Modal.Body>
        <Modal.Footer>
            
        <Box  style={{width:'100%'} }>
                    
                    <Box style={{float:'left'} }>
                        <Button variant="danger" 
                        onClick={() => {  
                            axios
                                .delete(`${goturl}/store_del/${props.id}`, {
                               
                                        })
                                        .then(function (response) {
                                            handleClose()
                                            props.setchange('needchange')
                                        })
                                        .catch(function (error) {
                                            console.log(error);
                                        });
                                    }
                            
                                }
                        >
                            ??????
                        </Button>
                    </Box>
    
                    <Box style={{float:'right'} }>
                        <Button variant="secondary"  onClick={handleClose}>
                        ??????
                        </Button>

                        <Button style={{marginLeft:2} } variant="primary" 
                        onClick={() => {  
                            axios
                                .post(`${goturl}/store/`, {
                                            mode:'edit',
                                            id:props.id,
                                            store_name: store_name,
                                            store_tell: store_tell,
                                            store_add: store_add,
                                            memo: memo,
                                            state: state,
                                        })
                                        .then(function (response) {
                                            handleClose()
                                            props.setchange('needchange')
                                        })
                                        .catch(function (error) {
                                            console.log(error);
                                        });
                                    }
                            
                                }
                            >
                        ??????
                        </Button>
                    </Box>
                </Box>

        </Modal.Footer>
    </Modal>
  </>
    );
  }