import React, { useState } from 'react';
import axios from 'axios';
// import './Login/scss/sign_style.scss';
// import Login from './Login/Login';
import styled from 'styled-components';
// import Stepper from './Stepper'
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
import FloatingLabel from 'react-bootstrap/FloatingLabel';


const Agreement_con = styled.div`



min-height: 386px;
margin-top:10px;
margin-bottom:10px;




`

const Agree_top = styled.div`

`

const Agree_bottom_agree = styled.div`
display:flex;
justify-content:flex-end;
margin-top:10px;
`


const Check_ul = styled.ul`
margin-top:10px;
padding:0px;

`

var str_usage = (`
1. 개인정보 수집목적 및 이용목적

가. 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산

콘텐츠 제공 , 구매 및 요금 결제 , 물품배송 또는 청구지 등 발송 , 금융거래 본인 인증 및 금융 서비스

나. 회원 관리

회원제 서비스 이용에 따른 본인확인 , 개인 식별 , 불량회원의 부정 이용 방지와 비인가 사용 방지 , 가입 의사 확인 , 연령확인 , 만14세 미만 아동 개인정보 수집 시 법정 대리인 동의여부 확인, 불만처리 등 민원처리 , 고지사항 전달

2. 수집하는 개인정보 항목 : 이름 , 로그인ID , 비밀번호 , 이메일 , 14세미만 가입자의 경우 법정대리인의 정보

3. 개인정보의 보유기간 및 이용기간

원칙적으로, 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안 보존합니다.

가. 회사 내부 방침에 의한 정보 보유 사유

o 부정거래 방지 및 쇼핑몰 운영방침에 따른 보관 : OO년

나. 관련 법령에 의한 정보보유 사유

o 계약 또는 청약철회 등에 관한 기록

-보존이유 : 전자상거래등에서의소비자보호에관한법률

-보존기간 : 5년

o 대금 결제 및 재화 등의 공급에 관한 기록

-보존이유: 전자상거래등에서의소비자보호에관한법률

-보존기간 : 5년

o 소비자 불만 또는 분쟁처리에 관한 기록

-보존이유 : 전자상거래등에서의소비자보호에관한법률

-보존기간 : 3년

o 로그 기록

-보존이유: 통신비밀보호법

-보존기간 : 3개월

※ 동의를 거부할 수 있으나 거부시 회원 가입이 불가능합니다.

`)



function Sign_up(props) {
    const [checked, setChecked] = useState(true);
  
    return(
                 <>
                    <Agreement_con>


                    </Agreement_con>            

                

    </>               
    )
}
 
export default Sign_up;