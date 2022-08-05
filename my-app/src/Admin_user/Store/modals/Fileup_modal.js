import React, { useState,useRef } from 'react';
import { Modal,Button } from 'react-bootstrap';
import Box from '@mui/material/Box';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
import './file/css/Drag.scss'
import ImageList_list from './Image_list'
import axios from 'axios';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import styled from 'styled-components'
import fileDownload from 'react-file-download';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import './scss/Drag.scss'
import ImageList from '@mui/material/ImageList';

import {useSelector} from 'react-redux';

const IconButton = styled.button`
// background: transparent;
border-radius: 50%;
border: 1px solid #0D99FF;
color: white;
background-color:#0D99FF;
margin: 0 1em;
width:40px;
height:40px;

&:hover{
    background-color: #0066FF;
}
`

const fileTypes = ["JPG", "PNG", "GIF"];
export default function Fileup_modal(props) {
    const goturl = useSelector((state) => state);
    const [img_list,setImgList] = useState([])
    const [id_list,setidList] = useState([])

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [isDragging, setIsDragging] = useState(true);
    const [isData, setData] = useState(false);
    // 각 선택했던 파일들의 고유값 id
    const fileId = useRef(0);
    const dragRef = useRef(null);
    const [div_heigh,setHeight] = useState('')
    const [file_list, setFile] = useState(null);
    const [ list_img, setImg ] = useState([])
    const [ previewImg, setPreviewImg ] = useState([])

    const [send_list, setsend_list] = useState([]);

    const handleChange = (file) => {
        if (file) {
            setFile(file[0]);
          }
        
    };

    function isEmptyArr(arr)  {
        if(Array.isArray(arr) && arr.length === 0)  {
          return true;
        }
        
        return false;
      }

    function handleShow (e){
        setShow(true);
        loadModule();
    }



    const loadModule = async (e) => {
        const url =`${goturl}/fileread/`;
        const formData = new FormData();
        formData.append("mode",'load')
        formData.append("id",props.id)
        
        axios({
            method: "POST",
            url: url,
            data: formData,
            headers:{
                "Content-Type":"application/json",
                }
        }).then(function(response){
            var url_local = `${goturl}`;
            var list = [];
            var id_set_list =[];
            for(var i=0;i<response.data.length;i++){
                list.push(url_local+response.data[i].url)
            }
            for(var i=0;i<response.data.length;i++){
                id_set_list.push(response.data[i].id)
            }
            setidList(id_set_list)
            setImgList(list)
            if(list===[]){
                setData(false)
                setHeight('400px')
            }
            else{
                setData(true)
                setHeight('730px')
            }
        })
    }


    const doundloadModule = async (e) =>{
        e.preventDefault();

        const url =`${goturl}/download/`
        const formData = new FormData();
        formData.append("mode",'down')
        formData.append("id",props.id)
        axios({
            method: "POST",
            url: url,
            data: formData,
            headers:{
                "Content-Type":"application/json",
            }
        }).then(function (response){
            var url_local = `${goturl}`
            var media = response.data
            var donw = url_local+media
            fetch(donw)
            .then(res => res.blob()) // Gets the response and returns it as a blob
            .then(blob => {
                fileDownload(blob, 'output.zip');
            })
            .then(function(e){
                const del_url =`${goturl}/download/`;
                const del_formData = new FormData();
                del_formData.append("mode",'del')
                axios({
                    method: "POST",
                    url: del_url,
                    data: del_formData,
                    headers:{
                        "Content-Type":"application/json",
                    }
                })
            });


        })
    }


    const uploadMoudle = async (e) => {

        // const desc = e.target.value;
        // const upload_file = e.target[0].files;
        if(isEmptyArr(send_list) === false){
            const upload_file=send_list
        

            const formData = new FormData();
    
            for(var i=0; i<upload_file.length; i++) {
                formData.append("files"+i,upload_file[i]);
            }
           
            formData.append("counter",i)
            formData.append("id",props.id)
    
            const url =`${goturl}/upload/`
    
            axios({
                method: "POST",
                url: url,
                data: formData,
                headers:{
                    "Content-Type":" multipart/form-data",
                }
            }).then(function (response){
                loadModule();
                setsend_list([])
                setPreviewImg([])
                setImg([])
            })   

        }
        else{
            alert('파일이 선택되지 않았습니다.')
        }
       
    }

    
        if(isData === true){
            var element =(
                <>
                    <div style={{margn:'0px',height:'40px',width:'100%',display:'flex',alignItems:'center'}}>
                        <div>업로드 된 이미지 ({img_list.length}/20)</div>
                    </div>

                    <div style={{width: "100%", height:'300px'}}>
                        <div className='img_con' style={{border: '2px solid #A9A9A9' , borderRadius: '0px'}}>
                            <ImageList_list setImgList={setImgList} img_list={img_list} id_list={id_list} loadModule={loadModule}/>  
                        </div>
                    </div>
                </>

            )
    
        }
        else{
            var element =(
                <>
                </>
            )

        }

    //--------------------------------------------------------------------------------------------------------------------------------------



    const insertImg = (files) => {
        for (let i = 0; i < files.length; i++){
            let reader = new FileReader()
            if(files[0]) {
            reader.readAsDataURL(files[i])
            
            setImg(list_img => [...list_img, files[i]])
            }
            reader.onloadend = () => {
            const previewImgUrl = reader.result
        
            if(previewImgUrl) {
                setPreviewImg(previewImg=>[...previewImg, previewImgUrl])
            }
            }

        }
    } 
    
        
    const getPreviewImg = () => {

        if(list_img === null || list_img.length === 0) {
          return (
            <div className="drop_here">
                    <div><CloudDownloadIcon sx={{fontSize:'80px'}} /></div>
                    <div>드래그 또는 클릭 하여 파일 선택 후 전송하기 버튼을 누르세요</div>
            </div>
          )
        } else {
            return (
            // <div className="div_grid">
            //     {list_img.map((el, index) => (



            //         <div  key={index}>

            //         <div  style={{width:'130px',height:'200px',margin:'10px',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff',boxShadow:'2px 2px 2px 2px #A3A3A3'}}>
                    
                    
            //         <img src={previewImg[index]} alt="preview-img" style={{width:'110px',height:'180px',margin:'5px'}}/>
            //         <button className="btn_del" onClick={() => {
            //             setPreviewImg(previewImg.filter((value, idx) => idx !== index));
            //             setImg(list_img.filter((value, idx) => idx !== index));
            //         }}><DeleteIcon/></button>
            //         </div>

            //         </div>
            //         ))}




            // </div>


            <ImageList sx={{ width: '100%', height: 240 }} cols={4} rowHeight={200}>
                {list_img.map((el,index) => (
                        <div  key={index}>

                        <div  style={{width:'120px',height:'200px',margin:'10px',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff',boxShadow:'2px 2px 2px 2px #A3A3A3'}}>
                        
                        
                        <img src={previewImg[index]} alt="preview-img" style={{width:'110px',height:'180px',margin:'5px'}}/>
                        <button className="btn_del" onClick={() => {
                            setPreviewImg(previewImg.filter((value, idx) => idx !== index));
                            setImg(list_img.filter((value, idx) => idx !== index));
                        }}><DeleteIcon/></button>
                        </div>

                        </div>
                ))}
            </ImageList>

            )
          
        }
      }

      if(img_list.length !== 0){
        var Button_icon =(
            <>
                <p style={{fontSize:'24px'}}>{img_list.length}</p>
            </>
            

        )
      }
      else{
        var Button_icon =(
            <>
                 <FileUploadIcon sx={{fontSize:'30px'}}/>
            </>
            

        )


      }


      


    //--------------------------------------------------------------------------------------------------------------------------------------
    return (


        <>
            <IconButton variant={'outline-primary'} onClick={handleShow}>
                        {Button_icon}
            </IconButton>
            
            <Modal show={show} onHide={handleClose} size="lg" style={{color:'black'}}>
                <Modal.Header closeButton>
                    <Modal.Title>파일 업로드</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{height:div_heigh}}>
                    <Box>
                        <div style={{display: 'flex', justifyContent:'space-between'}}>
                            <div>
                                <Button variant={'outline-primary'} onClick={doundloadModule}><DownloadIcon/>전체 다운로드</Button>
                            </div>
                            <div >
                                <Button style={{backgroundColor:'#0D99FF'}} onClick={uploadMoudle}>전송하기</Button>
                            </div>                            
                        </div>
                        
                    <label className="dorp_con"
                    id="files"
                    onDrop={(e)=>{
                        e.preventDefault();
                        const files = e.dataTransfer?.files;
                        setsend_list(files);
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
                        
                    

                        {element}

                    </Box>
                    </Modal.Body>
                <Modal.Footer>
                    
                <Box  style={{width:'100%'} }>
                    

                    <Box style={{float:'right'} }>
                        <Button variant="secondary"  onClick={props.handleClose}>
                        닫기
                        </Button>
                    </Box>
                </Box>
                </Modal.Footer>

            </Modal>
        </>

    );
  }