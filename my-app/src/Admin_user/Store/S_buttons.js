import React, { useState } from 'react';
import { Button,Form,Collapse} from 'react-bootstrap';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Date_picker from './Date_picker.js'

export default function S_Buttons(props) {
    const [open, setOpen] = useState(true);

    if(open == true){
      var element =(
    
        <><div>검색&nbsp;</div> <ArrowBackIosIcon sx={{ fontSize: 17 }}/></>
      )
    }
    else{
      var element =(
    
        <><div>검색&nbsp;</div>  <ArrowForwardIosIcon sx={{ fontSize: 17 }}/></>
      )

    }
    
    return (
      <>
        <Button
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
          style={{backgroundColor:'#0D99FF',borderRadius:'7px',color:'white',border:'none',height:'36px',width:'80px',margin:0,display:'flex',justifyContent:'center',alignItems: 'center',justifyContent: 'center'}}
          
        >
        {element}
        </Button>

        

        <Collapse in={open} >
            
            <div id="example-collapse-text" >
                    <div style={{display: 'flex',marginLeft:'20px'}}>
                    <Form.Select aria-label="Default select example" style={{width:130,borderRadius:'0px'}}>
                        <option>대리점</option>
                        {props.a_data.map((event,idx)=>(
                            <option value={event.id} key={idx}>{event.agency_name}</option>
                        ))}
                    </Form.Select>

                    
                    <Date_picker name={'등록일'}/>


                    <Form.Select aria-label="Default select example" style={{width:130,borderRadius:'0px'}}>
                        <option>검토현황</option>
                        <option value="대기">대기</option>
                        <option value="승인">승인</option>
                        <option value="반려">반려</option>
                        <option value="보완완료">보완완료</option>
                    </Form.Select>

                    <Form.Select aria-label="Default select example" style={{width:130,borderRadius:'0px'}}>
                        <option>설치현황</option>
                        <option value="대기">대기</option>
                        <option value="승인">승인</option>
                        <option value="반려">반려</option>
                        <option value="보완완료">보완완료</option>
                    </Form.Select>

                    <Form.Select aria-label="Default select example" style={{width:130,borderRadius:'0px'}}>
                        <option>매장현황</option>
                        <option value="대기">대기</option>
                        <option value="승인">승인</option>
                        <option value="반려">반려</option>
                        <option value="보완완료">보완완료</option>
                    </Form.Select>

                    <Form.Select aria-label="Default select example" style={{width:130,borderRadius:'0px'}}>
                        <option>정산</option>
                        <option value="대기">대기</option>
                        <option value="승인">승인</option>
                        <option value="반려">반려</option>
                        <option value="보완완료">보완완료</option>
                    </Form.Select>

                    <Form.Select aria-label="Default select example" style={{width:130,borderRadius:'0px'}}>
                        <option>월별정산</option>
                        <option value="대기">대기</option>
                        <option value="승인">승인</option>
                        <option value="반려">반려</option>
                        <option value="보완완료">보완완료</option>
                    </Form.Select>

                    <Form.Select aria-label="Default select example" style={{width:130,borderRadius:'0px'}}>
                        <option>가맹점명</option>
                        <option value="대기">대기</option>
                        <option value="승인">승인</option>
                        <option value="반려">반려</option>
                        <option value="보완완료">보완완료</option>
                    </Form.Select>

                    <Date_picker name={'설치일'}/>
                  </div>
                </div>
       
        </Collapse>
        
      </>
    );
  }
  
