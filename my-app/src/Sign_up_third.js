import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './Login/scss/sign_style.scss';
import Login from './Login/Login';
import styled from 'styled-components';
import Stepper from './Stepper'

import Button from 'react-bootstrap/Button';

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
margin-top:10px;
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
padding:0px;
`



function Sign_up(props) {

    const [inputPhone, setInputPhone] = useState('')
    const [certi, setcerti] = useState('')
    const [certi_state, setcerti_state] = useState('')
    const [minutes, setMinutes] = useState(3);
    const [seconds, setSeconds] = useState(0);

    const handleInputPhone = (e) => {
        setInputPhone(e.target.value)
    }

    const handleInputcerti = (e) => {
        setcerti(e.target.value)
    }

    if(minutes=== 0 && seconds=== 0){
        var state_btn = true;
    }
    else{
        var state_btn = false;
    }

    useEffect(() => {
        const countdown = setInterval(() => {
          if (parseInt(seconds) > 0) {
            setSeconds(parseInt(seconds) - 1);
          }
          if (parseInt(seconds) === 0) {
            if (parseInt(minutes) === 0) {
              clearInterval(countdown);
            } else {
              setMinutes(parseInt(minutes) - 1);
              setSeconds(59);
            }
          }
        }, 1000);
        return () => clearInterval(countdown);
      }, [minutes, seconds]);

    if (certi_state === 'go'){
        var html = (
            <>
        <div className="inputBox">
            <input type="text" name="username" id="uEmail" autoComplete="off" required value={certi} onChange={handleInputcerti}/>
            <label >
                <span>인증번호</span>
            </label>
            <button type="button" onClick={(e) => {e.preventDefault()}}>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</button> 
        </div> 


        <Button variant="primary" onClick={()=>{
            // props.setDone(true);
            axios 
      
            .post(`http://127.0.0.1:8000/manager/smscheck/`, {
                certi:certi,
                agency_email:window.sessionStorage.getItem('agency_email')
            })            .then(function (response) {
                if(response.data.success === true){
                    props.setDone(true);
                }
                else{
                    alert('인증번호가 틀렸습니다!')
                }
                // setContent(response.data)
            })

        }}
         disabled={state_btn}>

            인증번호 확인
        </Button>
        
            </>
        )
    }

    return(
                 <>
                    <div className="inputBox">
                        <input type="text" name="username" id="uEmail" autoComplete="off" required value={inputPhone} onChange={handleInputPhone}/>
                        <label >
                            <span>전화번호</span>
                        </label>
                        <button type="button" onClick={() => {
                            if(inputPhone != ''){
                                setcerti_state('go'); setMinutes(3);setSeconds(0);

                                    // props.setDone(true);
                                    axios 
                              
                                    .post(`http://127.0.0.1:8000/manager/sms/`, {
                                        agency_tell:inputPhone,
                                        agency_email:window.sessionStorage.getItem('agency_email')
                                    })
                        
                                
                            }
                            else{
                                alert('전화번호를 입력 해주시기 바랍니다.')
                            }   
                        }                         
                            
                        }>인증번호 전송</button> 
                    </div>   
                    {html}
    </>               
    )
}
 
export default Sign_up;