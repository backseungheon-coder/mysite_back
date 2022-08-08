import React, { useState } from 'react';
import { Modal,FloatingLabel,Button,ListGroup,Card,Form } from 'react-bootstrap';
import axios from 'axios';
import Box from '@mui/material/Box';
import styled from "styled-components";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Memo_tabs from './Memo_tabs';

const Box_add = styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    min-height: 400px;
    div{
        width:80%;
        display:flex;   
        justify-content:center;
        align-items:center;
        margin-bottom: 20px;
    }
`;

const Box_list = styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    align-items:center;
    min-height: 400px;
`;

const Button_ismemo = styled.button`
        background: #0D99FF;
        color: white;
        width: 65px;
        height: 30px;
        border:none;
        border-radius:6px;
        &:hover{
            background-color: #0066FF;
            color:white;
        }
    `  

const Button_nomemo = styled.button`
    background: transparent;
    color: #0D99FF;
    width: 100px;
    height: 38px;
    border-radius:6px;
    &:hover{
        background-color: #0D99FF;
        color:white;
    }
` 



const style = {
    width: '100%',
  };
  

function Communicate(props){
    
    const [state, setState] = useState('main')
    const [title, setTitle] = useState('')
    const [sub, setSub] = useState('')
    const [id, setid] = useState('')
    const [inner_coment,setInner] =  useState([])
    const [state_inner, setInnerstate] = useState('needload')
    const [content, setContent] = useState('')
    const Change_state = () => setState('add')


    const Change_state2 = () => {
    
        axios
            .post("http://127.0.0.1:8000/comments/", {
                        mode:'get',
                    })
                    .then(function (response) {
                        props.setIssue(response.data)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            setState('main')
    }

    const Change_state3 = (e) => {
        console.log(e.target.id)
        setInnerstate('needload')
        setid(e.target.id)
        setState('inner')
    }

    if(state==='add'){
        return(
           

            <Box_add>
            <div style={{fontSize:'25px'}}>요청사항 등록</div>
            <Form.Floating className="mb-3" >
                            <Form.Control placeholder="name"  value={title} onChange={(e) => setTitle(e.target.value)}/>
                            <label htmlFor="floatingInputCustom">요청 제목</label>
            </Form.Floating>

            
            <Form.Floating className="mb-3">
                            <Form.Control placeholder="name" value={sub} onChange={(e) => setSub(e.target.value)}/>
                            <label htmlFor="floatingInputCustom">요청 설명</label>
            </Form.Floating>
 

            <div style={{display:'flex'}}>
            <Button  variant='primary' onClick={()=> {
                      axios
                      .post("http://127.0.0.1:8000/comments/", {
                                  mode:'add_main',
                                  title:title,
                                  sub:sub,
                                  id:window.localStorage.getItem('id'),
                                  store_id:props.id
                              
                              })
                              .then(function (response) {
                                //   setInner(response.data)

                                  Change_state2()
                              })
                              .catch(function (error) {
                                  console.log(error);
                              });
                            //   Change_state2()
            }
            }
             >등록</Button>
            <Button  variant='secondary' onClick={Change_state2} >취소</Button>
            </div>
            </Box_add>
     
        );
    }else if(state==='inner'){
       

        if(state_inner === 'needload'){
            axios
        .post("http://127.0.0.1:8000/comments/", {
                    mode:'inner',
                    id:id
                    
                })
                .then(function (response) {
                    // setInner(...response.data)
                    setInner([...response.data])
                    setInnerstate('loaded')

                })
                .catch(function (error) {
                    console.log(error);
                });
        
        }
            
            return(
            
                <div style={{display:'flex',flexDirection:'column'}}>
                    <div sytle={{minHeight:'1000px'}}>
               
                    {inner_coment.map((event,idx)=>(
                        <Card style={{marginTop:'30px',marginBottom:'30px', backgroundColor:'#ffd6d6'}} key={event.id}>
                            <Card.Body>
                                <div>
                                    <div>{event.contents}</div>
                                    <div style={{float:'right'}}><div>{event.date} </div>{event.writer}</div>
                                </div>
                            </Card.Body>
                        </Card>
                    ))}
    
                    </div>
                    <div>
                    
                    
                        <FloatingLabel controlId="floatingTextarea" label="특이사항" className="mb-3">
                            
                                <Form.Control  onChange={(e) => setContent(e.target.value)} as="textarea" style={{ height: '100px' }} placeholder="Leave a comment here" value={props.content}/>
                 
                        </FloatingLabel>
    
                    
                        <div style={{display: 'flex',justifyContent:'space-between'}}>
                        <Button  variant='primary' onClick={Change_state2} >뒤로가기</Button>
                        <Button  variant='primary'  onClick={(e)=>(
                             axios
                             .post("http://127.0.0.1:8000/comments/", {
                                        mode:'comment_create',
                                        id:id,
                                        user_id:window.localStorage.getItem('id'),
                                        contents:content
                                         
                                     })
                                     .then(function (response) {
                                         // setInner(...response.data)
                                       
                                        setInnerstate('needload')
                                        
                                     })
                                     .catch(function (error) {
                                         console.log(error);
                                     })
                        )}>등록</Button>
                        </div>
                        
                    </div>
                </div>
            )

    }else{

        return(
            <>
            <Box_list>
      
            {props.issuelist.map((event,idx)=>(

                <ListGroup style={{width:'100%'}}  key={event.id}>
                        <ListGroup.Item action style={{minHeight:'80px',display:'flex',flexDirection:'row'}} id={event.id} onClick={Change_state3}><div>{event.title}</div></ListGroup.Item>
                </ListGroup>
            ))}
            </Box_list>
                    <Fab color="primary" aria-label="add" sx={{float:'right'}} onClick={Change_state}>
                        <AddIcon />
                    </Fab>
            </>
        )
    }
}
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export default function Memo_modal(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [content,setContent] =useState('');
    const [value, setValue] = React.useState(0);
    const [issuelist, setIssue] = useState([])

    if(props.memo === ''){
        var btn_color=('outline-primary')
    }
    else{
        var btn_color=('primary')
    }
    return (
        <>
        
        <Button_ismemo onClick={()=>{
            axios
            .post("http://127.0.0.1:8000/store/", {
                        mode:'get',
                        id:props.id,

                    })
                    .then(function (response) {
                        setContent(response.data)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
             

            handleShow()
        }
        }
        >
          등록
        </Button_ismemo>

        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Body >
            
                <Memo_tabs 
                setIssue={setIssue}
                element1={
                    <FloatingLabel controlId="floatingTextarea2" label="메모">
                    <Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: '300px' }}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    />
                </FloatingLabel>
                }
                element2={<Communicate id={props.id} issuelist={issuelist} setIssue={setIssue} setContent={setContent} />}/>
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
                                    .post("http://127.0.0.1:8000/store/", {
                                                mode:'memo',
                                                id:props.id,
                                                memo:content
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
                            등록
                            </Button>
                        </Box>
                    </Box>
            </Modal.Footer>
        </Modal>
      </>

    );
}