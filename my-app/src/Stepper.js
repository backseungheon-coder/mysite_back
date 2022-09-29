import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Login/scss/sign_style.scss';
import styled from 'styled-components';
import First from './Sign_up_first'
import Second from './Sign_up_second'
import Third from './Sign_up_third'
import {
  Link,
  BrowserRouter,
  Routes,
  Route,
  useNavigate ,
}from "react-router-dom";
import axios from 'axios';

const steps = ['개인정보 입력', '개인정보 수집 동의', 'SMS 인증'];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());


  // 개인정보 데이터
  const [inputName, setInputName] = useState('')
  const [inputEmail, setInputEmail] = useState('')
  const [inputPhone, setInputPhone] = useState('')


  const [inputPw, setInputPw] = useState('')
  const [inputPwc, setInputPwc] = useState('')


  
  const [check_1, setcheck_1] = useState(false)
  const [check_2, setcheck_2] = useState(false)
  const [check_3, setcheck_3] = useState(false)
  const [check_4, setcheck_4] = useState(false)
  const [done, setDone] = useState(false)

  console.log(done)
  const handleNext_state = (act) =>{
    if (act === 0){
      return (inputName === '' || inputEmail === '' || inputPw === '' || inputPwc === '' || inputPw!=inputPwc)
      return(false)
    }
    else if (act === 1){
      return (check_1 === false || check_2 === false || check_3 === false )
      return(false)
    }
    else if (act === 2){
 
      return (done === false)
    }
  }

  const isStepOptional1 = (step) => {
    return step === 0;
  };

  const isStepOptional2 = (step) => {
    return step === 1;
  };

  const isStepOptional3 = (step) => {
    return step === 2;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = (act) => {
    if(act === 1){
      axios 
      
              .post(`http://127.0.0.1:8000/manager/signup/`, {
                mode:'Signup',
                username:inputEmail,
                password:inputPw,
                password1:inputPw,
                password2:inputPwc,
                agency_name:inputName,
                manager_name:inputName,
                agency_email:inputEmail,
                level:1,
                devide:1,
                group_user:inputName,
                group:inputName,
                marketing_agreement:check_4,

                


            })
            .then(function (response) {
                window.sessionStorage.setItem('agency_email', response.data.agency_email);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
              let newSkipped = skipped;
              if (isStepSkipped(activeStep)) {
                newSkipped = new Set(newSkipped.values());
                newSkipped.delete(activeStep);
              }
          
              setActiveStep((prevActiveStep) => prevActiveStep + 1);
              setSkipped(newSkipped); 
            })

    }
    else{
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }
  
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    };

    }
   

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional2(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional2(index)) {
            labelProps.optional = (
              <Typography variant="caption"></Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            환영합니다!
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Link to={'/'}>
              <Button >로그인 하러 가기</Button>
            </Link>
            
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          
          {isStepOptional1(activeStep) && (
              <First inputName={inputName} setInputName={setInputName} inputEmail={inputEmail} setInputEmail={setInputEmail} inputPw={inputPw} setInputPw={setInputPw} inputPwc={inputPwc} setInputPwc={setInputPwc}></First>
            )}
          {isStepOptional2(activeStep) && (
              <Second check_1={check_1} setcheck_1={setcheck_1} check_2={check_2} setcheck_2={setcheck_2} check_3={check_3} setcheck_3={setcheck_3} check_4={check_4} setcheck_4={setcheck_4}></Second>
            )}
          {isStepOptional3(activeStep) && (
              <Third done={done} setDone={setDone}></Third>
            )}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />

            <Button 
            disabled={handleNext_state(activeStep)}
            onClick={() => {handleNext(activeStep)}}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}


