import React, { useState } from 'react';
import './Notice.scss'
import { Table } from 'react-bootstrap';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Notice_list(props){
    
    const [rows, setrows] = useState([]);
    const [loaded, setloaded] = useState('needloade');
    const [show, setShow] = useState(false);


    const [Notice_cate,setNotice_cate] = useState('');
    const [created_date, setcreated_date] = useState('');
    const [notice_title,setnotice_title]  = useState('');
    const [file, setfile] = useState([]);
    const [contents, setcontents] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if(loaded === 'needloade'){
      const url ="http://127.0.0.1:8000/notice/get/";
    axios({
        method: "GET",
        url: url,
        data: '',
        headers:{
            "Content-Type":"application/json",
            }
    }).then(function(response){
      var box_list = []
        setrows([...response.data])
        setloaded('loaded')
    })
    }




    return(
      <>
      <div style={{width: '95%', height: '80%',display: 'flex',flexDirection: 'column',justifyContent: 'center'}}>
        <Table hover style={{marginTop:'0px',width:'100%',display:'flex',flexDirection:'column',justifyContent: 'center'}}>

        <thead style={{display:'flex', justifyContent: 'center',backgroundColor:'white',height:'50px',alignItems: 'center'}}>
            <tr style={{display:'flex', justifyContent: 'center',width:'100%',border:'0px'}}>
                <th style={{width:'5%',border:'0px'}}>NO</th>
                <th style={{width:'20%',border:'0px'}}>구분</th>
                <th style={{width:'50%',border:'0px'}}>제목</th>
                <th style={{width:'25%',border:'0px'}}>등록일</th>
            </tr>
        </thead>

        <tbody style={{display:'flex',flexDirection:'column',borderTop:'0px',alignItems: 'center'}}>
                
        {rows.map((event,idx)=>{

                if(event.important==true){
                  return(
                    <tr onClick={()=>{
                      setnotice_title(event.notice_title);
                      setNotice_cate(event.Notice_cate);
                      setcreated_date(event.created_date);
                      setfile(event._file)
                      setcontents(event.contents)
                      handleShow();
                    }} 
                    
                    key={idx} style={{display:'flex', justifyContent: 'center',width:'100%',height:'55px',alignItems: 'center',backgroundColor:'#F3F3F3'}}>
                        <td style={{width:'5%',border:'0px',height:'48px',display:'flex',alignItems: 'center',justifyContent: 'center'}}>{(rows.length)-(idx)}</td>
                        <td style={{width:'20%',border:'0px',display:'flex',justifyContent: 'center'}}>
                            <div style={{width:'60px',height:'30px',border:'1px solid #FE2222',backgroundColor:'white',borderRadius:'20px',alignItems: 'center',display:'flex',justifyContent: 'center' , color:'#FE2222',fontSize:'14px'}}>
                                {event.Notice_cate}
                            </div>
                        </td>
                        <td style={{width:'50%',border:'0px',display:'flex',justifyContent: 'space-between',height:'48px',alignItems:'center'}}
                        
                        > <span style={{color:'#FE2222'}}>{event.notice_title}</span></td>
                        <td style={{width:'25%',border:'0px',display:'flex',justifyContent: 'center',height:'48px',alignItems:'center'}}>{event.created_date}</td>
                    </tr>
                  )
                
                }
                else{
                  return(
                    <tr onClick={()=>{
                      setnotice_title(event.notice_title);
                      setNotice_cate(event.Notice_cate);
                      setcreated_date(event.created_date);
                      setfile(event._file)
                      setcontents(event.contents)
                      handleShow();
                      }} 
                        key={idx} style={{display:'flex', justifyContent: 'center',width:'100%',height:'55px',alignItems: 'center'}}>
                        <td style={{width:'5%',border:'0px',height:'48px',display:'flex',alignItems: 'center',justifyContent: 'center'}}>{(rows.length)-(idx)}</td>
                        <td style={{width:'20%',border:'0px',display:'flex',justifyContent: 'center'}}>
                            <div style={{width:'60px',height:'30px',border:'1px solid black',backgroundColor:'white',borderRadius:'20px',alignItems: 'center',display:'flex',justifyContent: 'center',fontSize:'14px' }}>
                                {event.Notice_cate}
                            </div>
                        </td>
                        <td style={{width:'50%',border:'0px',display:'flex',justifyContent: 'space-between',height:'48px',alignItems:'center'}}
                        > <span >{event.notice_title}</span></td>
                        <td style={{width:'25%',border:'0px',display:'flex',justifyContent: 'center',height:'48px',alignItems:'center'}}>{event.created_date}</td>
                    </tr>
                  )
                }  
              })}                    
        </tbody>
        </Table>
    </div>




    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{notice_title}</Modal.Title>
        </Modal.Header>
        <Modal.Body><div dangerouslySetInnerHTML={ {__html:contents} }></div></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
              닫기
          </Button>
        </Modal.Footer>
      </Modal>
            

      </>
    )
}