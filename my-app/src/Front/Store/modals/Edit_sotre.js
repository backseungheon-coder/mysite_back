import React, { useState } from 'react';
import { Modal,Button,FloatingLabel,Form } from 'react-bootstrap';
import axios from 'axios';
import Box from '@mui/material/Box';
import styled from 'styled-components'
import BorderColorIcon from '@mui/icons-material/BorderColor';

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
    
    

    

    return (
        <>
        <IconButton variant={'outline-danger'} onClick={()=>{
          axios
          .post("http://127.0.0.1:8000/store/", {
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
                <Modal.Title>가맹점 수정</Modal.Title>
            </Modal.Header>
            <Modal.Body>



            


            <FloatingLabel
                    controlId="floatingInput"
                    label="건축사무소명"
                    className="mb-3"
                    
            ><Form.Control  value={store_name} onChange={onChange1} style={{height:'60px'}}/>


            </FloatingLabel>
            <FloatingLabel
                    controlId="floatingInput"
                    label="휴대전화"
                    className="mb-3"
            ><Form.Control value={store_tell} onChange={onChange2} type="tell"style={{height:'60px'}} />
            </FloatingLabel>

            
            <FloatingLabel
                    
                    controlId="floatingInput"
                    label="주소"
                    className="mb-3"
            ><Form.Control  onChange={onChange3} value={store_add} style={{height:'60px'}}/>
            </FloatingLabel>
            

            <Form.Select onChange={onChange4} value={state} aria-label="Default select example" className="mb-3" style={{height:'60px'}}>
                        <option>지역</option>
                        <option value="서울">서울</option>
                        <option value="경기">경기</option>
                        <option value="인천">인천</option>
                        <option value="부산">부산</option>
                        <option value="대구">대구</option>
                        <option value="광주">광주</option>
                        <option value="울산">울산</option>
                        <option value="대전">대전</option>
                        <option value="세종">세종</option>
                        <option value="경남">경남</option>
                        <option value="대전">대전</option>
                        <option value="전라">전라</option>
                        <option value="충청">충청</option>
                        <option value="강원">강원</option>
            </Form.Select>

            <FloatingLabel controlId="floatingTextarea" label="특이사항 & 메모" className="mb-3">
                <Form.Control value={memo} onChange={onChange5} as="textarea" style={{ height: '150px' }} placeholder="Leave a comment here" />
            </FloatingLabel>
            
                  </Modal.Body>
        <Modal.Footer>
            
        <Box  style={{width:'100%'} }>
                    
                    <Box style={{float:'left'} }>
                        <Button variant="danger" 
                        onClick={() => {  
                            axios
                                .delete(`http://127.0.0.1:8000/store_del/${props.id}`, {
                               
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
                                .post("http://127.0.0.1:8000/store/", {
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
                        수정
                        </Button>
                    </Box>
                </Box>

        </Modal.Footer>
    </Modal>
  </>
    );
  }