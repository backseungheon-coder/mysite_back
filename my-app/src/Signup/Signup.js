import React, { useState } from 'react';
import axios from 'axios';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import {useSelector} from 'react-redux';

function Signup(props) {
    const [inputId, setInputId] = useState('')
    const [inputE, setInputE] = useState('')
    const [inputPw, setInputPw] = useState('')
    const [CheckPw, setCheckPw] = useState('')
    const goturl = useSelector((state) => state);
    const handleInputId = (e) => {
        setInputId(e.target.value)
    }
 
    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }
    
    
    const handleInputE = (e) => {
        setInputE(e.target.value)
    }

    const handleCheckPw = (e) => {
        setCheckPw(e.target.value)
    }
   

    return(
    <>
 <div id="loginwrap">
        <div id="right" style={{paddingTop:"70px"}}>
            <div className="right">
                <h2>가입하기</h2>

                <div action="">
                <div className="inputBox">
                        <input type="text" name="username" id="uEmail" autoComplete="off" required value={inputId} onChange={handleInputId}/>
                        <label >
                            <span>이름</span>
                            
                        </label>
                    </div>

                    <div className="inputBox">
                        <input type="text" name="username" id="uEmail" autoComplete="off" required value={inputE} onChange={handleInputE}/>
                        <label >
                            <span>이메일</span>
                            
                        </label>
                    </div>

                    <div className="inputBox">
                        <input type="password" name="password" id="uPassword" className="pw" autoComplete="off" required value={inputPw} onChange={handleInputPw}/>
                        <label >
                            <span>비밀번호</span>
                        </label>
                        <button type="button">show</button>
                        <button type="button" className="passwordEye">hide</button>
                    </div>

                    <div className="inputBox">
                        <input type="password" name="password" id="uPassword" className="pw" autoComplete="off" required value={CheckPw} onChange={handleCheckPw}/>
                        <label >
                            <span>비밀번호 확인</span>
                        </label>
                    </div>

                    <div className="vox">
                        <div className="inputCheck">
                            <input type="checkbox" />
                            <label >
                                <span style={{fontSize:"20px",marginLeft:"10px",fontWeight:"bold"}}>가입 약관에 모두 동의합니다.</span>
                            </label>
                        </div>

                        <div className="Agreement">
                            <div class="checkcon">
                                <input type="checkbox" />
                                <label style={{marginLeft:"10px"}}>
                                    <span>만 14세 이상 (필수)</span>
                                </label>
                            </div>

                            <div class="checkcon">
                                <input type="checkbox" />
                                <label style={{marginLeft:"10px"}}>
                                    <span>이용약관, 개인정보 수집 및 이용 동의 (필수)</span>
                                </label>
                            </div>

                            <div class="checkcon">
                                <input type="checkbox" />
                                <label style={{marginLeft:"10px"}}>
                                    <span>마케팅 정보 수집에 동의 (선택)</span>
                                </label>
                            </div>
                        </div>                        
                    </div>
                </div>

                

                <div className="su">
                    </div>
                    <input type="submit" name="uSubmit" id="uSubmit" value="가입하기" onClick={()=>{
                         axios
                         .post(`${goturl}/signup/`, {
                                     mode:'post',
                                     username:inputE,
                                     password:inputPw,
                                     password1:inputPw,
                                     password2:CheckPw,
                                     agency_name:'inputId',
                                     agency_tell:'',
                                     manager_name:'inputId',
                                     agency_email:inputE,
                                     level:0,
                                     devide:1,
                                     group_user:'',
                                     group:'',
                                 })
                                 .then(function (response) {
                                    window.location.replace('/');
                                 })
                                 .catch(function (error) {
                                     console.log(error);
                                 });
                             }
                         }
                    />
            </div>
        </div>
    </div>
    </>               
    )
}
 
export default Signup;