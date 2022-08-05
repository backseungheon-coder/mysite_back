
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import styled, { css } from 'styled-components'
import axios from 'axios';
import { BarChart, ResponsiveContainer,Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import GroupsIcon from '@mui/icons-material/Groups';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import Dash_Notice from './Dash_Notice.js'
import {useSelector} from 'react-redux';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Container_styled = styled.div`
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
    background:#F3F3F3;
`

const Inner_top_Box = styled.div`
    height:100%;
    margin-top:20px;
    width:96%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 250px 1fr;
`

const Grid_Box = styled.div`
    margin:10px;
    border-radius:15px;
    background-color: white;
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction:column;

    ${(props) =>
        props.primary && //primary 가 존재할 경우
        css`
          background-color: #F3F3F3;
          color: black;
        `}
`

const Notice_Box = styled.div`
    margin:10px;
    grid-column: 1 / 3;
	grid-row: 2 / 2;
    border-radius:20px;
    background-color:white;
`

const Bottom_sub_Box = styled.div`
    margin:10px;
    grid-column: 3 / 3;
	grid-row: 2 / 2;
    border-radius:20px;
    background-color:white;
    display:flex;
    justify-content:center;
`

const Top_Box_con = styled.div`
    margin:10px;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
`

const Top_Box_inner = styled.div`
    border-radius:10px;
    height: 46%;
    width: 100%;
    background-color:white;
    display:flex;
    align-items:center;
    justify-content: space-around;
`

const Inner_circle = styled.div`
    border-radius:50%;
    height:90px;
    width:90px;
    display:flex;
    justify-content:center;
    align-items:center;
    background-image: linear-gradient(135deg, #0D99FF 0%, #466FFF 100%);
`

const Inner_circle_small = styled.div`
    border-radius:50%;
    height:90px;
    width:90px;
    display:flex;
    justify-content:center;
    align-items:center;
    background-image: linear-gradient(135deg, #0D99FF 0%, #466FFF 100%);
`

function Matin_table(props){
    const [loadstate, setloadstate] = useState('needload');
    const [row, setrows] = useState([]);
    const [data,setdata] = useState([]);
    const goturl = useSelector((state) => state);
    
    if(loadstate ==='needload'){
        const url =`${goturl}/dash/`;
        const formData = new FormData();
        axios({
            method: "post",
            url: url,
            data: window.localStorage.getItem('id'),
            headers:{
                "Content-Type":"application/json",
                }
        }).then(function(response){
            setrows(response.data);
            setloadstate('loaded');
            setdata(response.data.list);
        })
        
    }


    return(
        <Container_styled>
            <Inner_top_Box>
                <Grid_Box>
                    <Inner_circle>
                    <div style={{fontWeight:'bold',fontSize:'40px',color:'white'}}>{row.d_agency}</div>
                    </Inner_circle>
                    <div style={{fontSize:'24px',color:'black',marginTop:'14px'}}>오늘 실적 수</div>
                </Grid_Box>
                <Grid_Box>
                <Inner_circle>
                    <div style={{fontWeight:'bold',fontSize:'40px',color:'white'}}>{row.m_agency}</div>
                </Inner_circle>
                <div style={{fontSize:'24px',color:'black',marginTop:'14px'}}>이번달 실적 수</div>
                </Grid_Box>

                <Top_Box_con>
                    <Top_Box_inner>
                        <Inner_circle_small>
                        <div style={{fontWeight:'bold',fontSize:'40px',color:'white'}}>{row.store}</div>
                        </Inner_circle_small>
                        <div style={{display:'flex', flexDirection:'column',alignItems: 'center'}}>
                            <div style={{fontSize:'18px',color:'black'}}>
                                    그룹 가맹점 수
                            </div>
                        </div>
                    </Top_Box_inner>
                    <Top_Box_inner>
                        <Inner_circle_small >
                            <div style={{fontSize:'40px',fontWeight:'bold',color:'white'}}>{row.agency}</div>
                        </Inner_circle_small>
                        <div style={{display:'flex', flexDirection:'column',alignItems: 'center'}}>
                            <div style={{fontSize:'18px',color:'black'}}>
                                    그룹 대리점 수
                            </div>
                        </div>
                    </Top_Box_inner>
                </Top_Box_con>
                
                <Notice_Box>
                    <div style={{fontSize:'30px',textAlign:'center'}}>대리점 실적</div>
                    <ResponsiveContainer width="98%" height="80%">
                        <BarChart  data={data}>
                            <XAxis dataKey="name" stroke="#8884d8" />
                            <YAxis />
                            <Tooltip />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <Bar dataKey="실적" fill="#8884d8" barSize={30} />
                        </BarChart>
                    </ResponsiveContainer>
                </Notice_Box>
                <Bottom_sub_Box>
                    <Dash_Notice/>
                </Bottom_sub_Box>
            </Inner_top_Box>
        </Container_styled>
    )
}

export default function SimplePaper() {
    const [state, setState] = useState('Table')

    if(state === 'Table'){
        
        return (
        <Box sx={{width:'100%',height:'100%',backgroundColor:'#FFF'}}>
            <Matin_table setState={setState}/>
        </Box>
        );
    }
}
