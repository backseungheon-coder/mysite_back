import React, { useState } from 'react';
import ImageList from '@mui/material/ImageList';
import styled from 'styled-components'
import DeleteIcon from '@mui/icons-material/Delete';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import Full_view from './Full_view.js'
import axios from 'axios';
import {useSelector} from 'react-redux';

const Box = styled.div`
  height:100%;
  width:100%;
  position: relative;
  z-index: 1;
`

const Outer_box = styled.div`
  height:160px;
  width:90%;
  position: absolute;
  display: flex;
  
  &:hover{
    height:160px;
    width:90%;
    position: absolute;
    z-index: 0;
    display: flex;
    opacity:0.5;
    background-color:black;
    button{
        visibility:visible;
    }

  }
`
const Img_box = styled.img`
    height:160px;
    width:100%;
    z-index: 3;
    position: relative;
`

const Button = styled.button`
    height:100%;
    width:100%;
    border: none;
    visibility:hidden;
    background-color:black;

`

export default function StandardImageList(props) {
    const [isListHover, setIsListHover] = useState(false);
    const [mode,setMode]= useState('normal');
    const [startindex,setStartindex]= useState();
    const goturl = useSelector((state) => state);
    if (mode === 'full') {
        var element = (
            <Full_view img_list={props.img_list} setMode={setMode} startindex={startindex}/>
        );
    }
    else{
        var element = (
            <></>
        )
    }

  return (
    <>
    {element}
    
    <ImageList sx={{ width: '100%', height: 340 ,margin: '10px'}} cols={4} rowHeight={160}>
      {props.img_list.map((item,idx) => (
        <div style={{position:'relative',zIndex:2}}  key={idx}>
            
            <Box>
                
          
                <Outer_box >
                    <Button onClick={() => {setMode('full');setStartindex(idx)}}>
                        <FullscreenIcon sx={{color:'white'}}/>
                    </Button>
        
                    <Button onClick={() => {
                      
                        const url =`${goturl}/img_del/`
                        const formData = new FormData();
                        formData.append("id",props.id_list[idx])
                        axios({
                            method: "POST",
                            url: url,
                            data: formData,
                            headers:{
                                "Content-Type":"application/json",
                            }
                        }).then(function (response){
                          props.loadModule();
                          alert('삭제 되었습니다.')
                          props.setImgList([])
                        })

                      
                    }}>
                        <DeleteIcon sx={{color:'white'}}/>
                    </Button>
                </Outer_box>
                

                <img

                        style={{width: '90%', height: '160px'}}
                        alt={item.title}
                        src={item}
                    />
                
 
            </Box>
            
        </div>
      ))}
    </ImageList>
    </>
  );
}

