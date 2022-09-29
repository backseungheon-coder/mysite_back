import React, { useState } from 'react';
import axios from 'axios';
// import './Login/scss/sign_style.scss';
// import Login from './Login/Login';
import styled from 'styled-components';
// import Stepper from './Stepper'

import {
    Link,
    BrowserRouter,
    Routes,
    Route,
    useNavigate ,
  }from "react-router-dom";

import ToggleButton from 'react-bootstrap/ToggleButton';
import Form from 'react-bootstrap/Form';


const Agreement_con = styled.div`
display: flex;
flex-direction: column;

min-height: 346px;
margin-top:50px;
margin-bottom:10px;




`

const Agree_top = styled.div`
display: flex;
`

const Agree_bottom = styled.div`

margin-top:10px;
border-top:1px solid #D1D1D1;
`


const Check_ul = styled.ul`
margin-top:10px;
padding:0px;

`



function Sign_up(props) {
    const [checked, setChecked] = useState(true);
  
    return(
                 <>
                    <Agreement_con>
                        <Agree_top>
                        <ToggleButton
                            id="toggle-check"
                            type="checkbox"
                            variant="outline-secondary"
                            checked={checked}
                            value="1"
                            onChange={(e) => {
                                setChecked(e.currentTarget.checked)

                                props.setcheck_1(checked)
                                props.setcheck_2(checked);
                                props.setcheck_3(checked);
                                props.setcheck_4(checked);
                            
                            }}
                            style={{width: '25px', height:  '25px'}}
                        />
                            
                        <span style={{fontWeight:'bold',align:'center',padding:'2px',marginLeft:'5px'}}>  가입 약관에 모두 동의합니다.</span>                        
                        </Agree_top>

                        <Agree_bottom>

                            <Check_ul> 
                                <li><input type="checkbox" onChange={() => {props.setcheck_1((e) => !e);}} checked={props.check_1}/> 만 14세 이상입니다.(필수)</li>
                                <li><input type="checkbox" onChange={() => {props.setcheck_2((e) => !e);}} checked={props.check_2}/> 서비스 <a href='/' style={{color:'#006EBF'}}>이용약관</a>에 동의합니다. (필수)</li>
                                <li><input type="checkbox" onChange={() => {props.setcheck_3((e) => !e);}} checked={props.check_3}/> <a href='/' style={{color:'#006EBF'}}>개인정보 수집 및 이용</a>에 동의합니다. (필수)</li>
                                <li><input type="checkbox" onChange={() => {props.setcheck_4((e) => !e);}} checked={props.check_4}/> 마케팅 정보 수집에 동의합니다. (선택)</li>
                            </Check_ul> 
                        </Agree_bottom>
                    </Agreement_con>            

                

    </>               
    )
}
 
export default Sign_up;