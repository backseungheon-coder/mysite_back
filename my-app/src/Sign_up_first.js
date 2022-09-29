import React, { useState } from 'react';
import axios from 'axios';
import './Login/scss/sign_style.scss';
import Login from './Login/Login';
import styled from 'styled-components';
import Stepper from './Stepper'
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


    const [show,setShow] = useState(false)
    const [show_check,setShow_check] = useState(false)

    const [checked, setChecked] = useState(false);


    

    const navigate = useNavigate();
	// input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
    const handleInputName = (e) => {
        props.setInputName(e.target.value)
    }

    const handleInputEmail = (e) => {
        props.setInputEmail(e.target.value)
    }
    const handleInputPhone = (e) => {
        props.setInputPhone(e.target.value)
    }
 
    const handleInputPw = (e) => {
        props.setInputPw(e.target.value)
    }

    const handleInputPwc = (e) => {
        props.setInputPwc(e.target.value)
    }
     
    
    

    if(show === false){
        var show_pass = "password"
    }
    else{
        var show_pass = "text"
    }

    if(show_check === false){
        var show_pass_check = "password"
    }
    else{
        var show_pass_check = "text"
    }


    const onClickLogin =  () => { 

          
            axios 
              .post(`https://api.nestatest.shop/manager/signup/`, {
                mode:'sign_up',
                username:props.inputEmail,
                password:props.inputPw,
                password1:props.inputPw,
                password2:props.inputPwc,
                agency_name:props.inputName,
                agency_tell:props.inputPhone,
                manager_name:props.inputName,
                agency_email:props.inputEmail,
                level:1,
                devide:1,
                group_user:props.inputName,
                group:props.inputName,
            })
            .then(function (response) {
                // setContent(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function (response) {
                alert('환영합니다')
                
            })
            .then(function (response){
                navigate("/")
            })
    }

    return(
                 <>
                <div action="">
                    <div className="inputBox">
                        <input type="text" name="username" id="uEmail" autoComplete="off" required value={props.inputName} onChange={handleInputName}/>
                        <label >
                            <span>이름</span>
                            
                        </label>
                    </div>

                    <div className="inputBox">
                        <input type="text" name="username" id="uEmail" autoComplete="off" required value={props.inputEmail} onChange={handleInputEmail}/>
                        <label >
                            
                            <span>이메일</span>
                            
                        </label>
                    </div>

                    {/* <div className="inputBox">
                        <input type="text" name="username" id="uEmail" autoComplete="off" required value={inputPhone} onChange={handleInputPhone}/>
                        <label >
                            <span>전화번호</span>
                        </label>
                        <button type="button" onClick={() => {alert('hi')}}>인증</button> 
                    </div> */}
                    
                    <div className="inputBox">
                        <input type={show_pass} name="password" id="uPassword" className="pw" autoComplete="off"  required value={props.inputPw} onChange={handleInputPw}/>
                        <label >
                            <span>비밀번호</span>
                        </label>
                        <button type="button" onClick={() => {setShow((e) => !e);}}>show</button>
                        <button type="button" className="passwordEye">hide</button>
                    </div>


                    
                    
                    
                    <div className="inputBox">
                        <input type={show_pass_check} name="password" id="uPassword" className="pw" autoComplete="off" required value={props.inputPwc} onChange={handleInputPwc}/>
                        <label >
                            <span>비밀번호 확인</span>
                        </label>
                        <button type="button" onClick={() => {setShow_check((e) => !e);}}>show</button>
                        <button type="button" className="passwordEye">hide</button>
                    </div>

                    {/* <Checkbox/>  가입 약관에 동의 */}


                    {/* <Agreement_con>
                        <Agree_top>
                        <ToggleButton
                            id="toggle-check"
                            type="checkbox"
                            variant="outline-secondary"
                            checked={checked}
                            value="1"
                            onChange={(e) => setChecked(e.currentTarget.checked)}
                            style={{width: '25px', height:  '25px'}}
                        />
                            
                        <span style={{fontWeight:'bold',align:'center',padding:'2px',marginLeft:'5px'}}>  가입 약관에 모두 동의합니다.</span>                        
                        </Agree_top>

                        <Agree_bottom>

                            <Check_ul> 
                                <li><input type="checkbox"/> 만 14세 이상입니다.(필수)</li>
                                <li><input type="checkbox" /> 서비스 <a href='/' style={{color:'#006EBF'}}>이용약관</a>에 동의합니다. (필수)</li>
                                <li><input type="checkbox" /> <a href='/' style={{color:'#006EBF'}}>개인정보 수집 및 이용</a>에 동의합니다. (필수)</li>
                                <li><input type="checkbox" /> 마케팅 정보 수집에 동의합니다. (선택)</li>
                            </Check_ul> 
                        </Agree_bottom>
                    </Agreement_con>


                    <input onClick={onClickLogin} type="submit" name="uSubmit" id="uSubmit" value="회원가입" /> */}
                    
                </div>
                <div>
                </div>

                                
            

                

    </>               
    )
}
 
export default Sign_up;