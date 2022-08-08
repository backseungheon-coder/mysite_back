
import React, { useState } from 'react';
import './Notice.scss'
import styled from 'styled-components'
import { Modal,Button,Form } from 'react-bootstrap';
import Box from '@mui/material/Box';
import DownloadIcon from '@mui/icons-material/Download';
import ImageList from '@mui/material/ImageList';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {useSelector} from 'react-redux';
export default function Notice_file(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const goturl = useSelector((state) => state);
    // const [ list_img, setImg ] = useState([])
    // const [send_list, setsend_list] = useState([]);
    // const [ previewImg, setPreviewImg ] = useState([])



    const Button_up = styled.button`
  background: #0D99FF;
  border-radius: 3px;
  border: 2px solid #0D99FF;
  color: white;
  margin: 0 1em;
  padding: 0.25em 1em;
  
`

function handleShow (e){
    setShow(true);
    // loadModule();
}

const insertImg = (files) => {
    for (let i = 0; i < files.length; i++){
        let reader = new FileReader()
        if(files[0]) {
        reader.readAsDataURL(files[i])
        var list = props.list_img
        props.setImg(list => [...list, files[i]])
        }
        reader.onloadend = () => {
        const previewImgUrl = reader.result
        var preview = props.previewImg
        if(previewImgUrl) {
            props.setPreviewImg(preview => [...preview, previewImgUrl])
        }
        }

    }
} 

const getPreviewImg = () => {

    if(props.list_img === null || props.list_img.length === 0) {
      return (
        <div className="drop_here">
                <div><CloudUploadIcon sx={{fontSize:'80px'}} /></div>
                <div>드래그 또는 클릭 하여 파일 선택 후 전송하기 버튼을 누르세요</div>
        </div>
      )
    } else {
        return (
        <ImageList sx={{ width: '100%', height: 240 }} cols={4} rowHeight={200}>
            {props.list_img.map((el,index) => (
                    <div  key={index}>

                    <div  style={{width:'120px',height:'200px',margin:'10px',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff',boxShadow:'2px 2px 2px 2px #A3A3A3'}}>                    
                    <img src={props.previewImg[index]} alt="preview-img" style={{width:'110px',height:'180px',margin:'5px'}}/>
                    <button className="btn_del" onClick={() => {
                        props.setPreviewImg(props.previewImg.filter((value, idx) => idx !== index));
                        props.setImg(props.list_img.filter((value, idx) => idx !== index));
                    }}><DeleteIcon/></button>
                    </div>

                    </div>
            ))}
        </ImageList>

        )
    }
  }

      return (
        <>

            <Button_up onClick={handleShow}>
                업로드
            </Button_up>

            <Modal show={show} onHide={handleClose} size="lg" style={{color:'black'}}>
                <Modal.Header closeButton>
                    <Modal.Title>파일 업로드</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{height:'300px'}}>
                    <Box>                        
                    <label className="dorp_con"
                    id="files"
                    onDrop={(e)=>{
                        e.preventDefault();
                        const files = e.dataTransfer?.files;
                        props.setsend_list(files);
                        insertImg(files);
                        e.stopPropagation();
                        }}
                        onDragOver={(e)=>{e.preventDefault();}}
                    >
                    
                        <div className="dropBox">
                                {getPreviewImg()} 
                        </div>
                        
                        <div className="dorp_plus"
                        type="file"
                        >
                            <AddIcon sx={{fontSize:'70px',color:'#0D99FF'}}/>
                        </div>
                        <input type='file' for='files' style={{display:'none'}}
                        onClick={(e)=>{
                        e.preventDefault();
                        alert('hi')

                        }}
                        
                        ></input>
                    </label>  
                        
                    </Box>
                    </Modal.Body>
                <Modal.Footer>
                    
                <Box  style={{width:'100%'} }>
                    

                    <Box style={{float:'right'} }>
                        <Button variant="secondary"  onClick={handleClose}>
                        닫기
                        </Button>
                    </Box>
                </Box>
                </Modal.Footer>

            </Modal>
        
        </>
      );
  
}