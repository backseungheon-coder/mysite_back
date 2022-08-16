import React, { useState } from 'react';
import { FloatingLabel,Form } from 'react-bootstrap';
import axios from 'axios';
import {useSelector} from 'react-redux';



export default function ControlledTabs(props) {
    const [key, setKey] = useState('store');
    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState('1');
    const [load,setLoad] = useState('needload');
    const [a_data, seta_data] = useState([]);
    const goturl = useSelector((state) => state);
    const radios = [
      { name: '대기', value: '1', vari:'outline-warning' },
      { name: '승인', value: '2',vari:'outline-success' },
      { name: '반려', value: '3',vari:'outline-danger' },
      { name: '보완완료', value: '4',vari:'outline-warning' }
    ];
    const onChange1 = (event) => {props.getData(event.target.value);}
    const onChange2 = (event) => {props.getTell(event.target.value);}
    const onChange3 = (event) => {props.getaddr(event.target.value);}
    const onChange4 = (event) => {props.getstate(event.target.value);}
    const onChange5 = (event) => {props.getmemo(event.target.value);}
    const onChange6 = (event) => {props.setAgency(event.target.value);}

    


    if(load === 'needload'){
        axios.get(`${goturl}/agency/`)
        .then((response) => {
          alert('hi');
        seta_data([...response.data])
        setLoad('laoded')
        
      })
    }
      
    

    return (
    
      <>
        <Form.Select aria-label="Default select example" className="mb-3" style={{height:'60px'}}
        onChange={onChange6}
        >
                        <option>대리점</option>
                        {a_data.map((event,idx)=>(
                            <option value={event.id} key={idx}>{event.agency_name}</option>
                        ))}
            </Form.Select>
            


            <FloatingLabel
                    controlId="floatingInput"
                    label="건축사무소명"
                    className="mb-3"
                    
            ><Form.Control  onChange={onChange1} type="email" placeholder="name@example.com" style={{height:'60px'}}/>


            </FloatingLabel>
            <FloatingLabel
                    controlId="floatingInput"
                    label="휴대전화"
                    className="mb-3"
            ><Form.Control onChange={onChange2} type="email" placeholder="name@example.com" style={{height:'60px'}} />
            </FloatingLabel>

            
            <FloatingLabel
                    
                    controlId="floatingInput"
                    label="주소"
                    className="mb-3"
            ><Form.Control  onChange={onChange3} type="email" placeholder="name@example.com" style={{height:'60px'}}/>
            </FloatingLabel>
            

            <Form.Select onChange={onChange4} aria-label="Default select example" className="mb-3" style={{height:'60px'}}>
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
                <Form.Control onChange={onChange5} as="textarea" style={{ height: '150px' }} placeholder="Leave a comment here" />
            </FloatingLabel>
        </>
     
    );
  }