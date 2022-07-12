import React, { useState,useCallback,useEffect,useRef } from 'react';
import { Modal,Button,Form } from 'react-bootstrap';
import Box from '@mui/material/Box';
import axios from 'axios';
import fileDownload from 'react-file-download';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import styled from 'styled-components'
import ImageList from './Image_list';
import './scss/Drag.scss';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';



const IconButton = styled.button`
background: transparent;
border-radius: 3px;
border: 2px solid #D1D1D1;
color: #D1D1D1;
margin: 0 1em;
padding: 3px 5px;

&:hover{
    background-color: #E3E3E3;
    color: #F5F5F5;
    border: 2px solid #F5F5F5;
}
`


const fileTypes = ["JPG", "PNG", "GIF"];
export default function Fileup_modal(props) {
    const [loaded, setLoaded] = useState(true);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    // const [isDragging, setIsDragging] = useState(true);
    const [img_list,setImgList] = useState([])

    function handleShow (e){
        setShow(true);
        loadModule();
    }



    const loadModule = async (e) => {
        const url ="http://127.0.0.1:8000/fileread/";
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
            var url_local = "http://127.0.0.1:8000";
            var list = [];
            for(var i=0;i<response.data.length;i++){
                list.push(url_local+response.data[i])
            }

            
            

            setImgList(list)
            setLoaded(true);
        })
    }



    const uploadMoudle = async (e) => {
        e.preventDefault();

        const desc = e.target.value;
        const upload_file = e.target[0].files;
        const formData = new FormData();

        for(var i=0; i<upload_file.length; i++) {
            formData.append("files"+i,upload_file[i]);
        }
       
        formData.append("counter",i)
        formData.append("id",props.id)

        const url ="http://127.0.0.1:8000/upload/"

        axios({
            method: "POST",
            url: url,
            data: formData,
            headers:{
                "Content-Type":" multipart/form-data",
            }
        }).then(function (response){
        })   
    }



    const doundloadModule = async (e) =>{
        e.preventDefault();

        const url ="http://127.0.0.1:8000/download/"
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
            var url_local = "http://127.0.0.1:8000"
            var media = response.data
            var donw = url_local+media
            fetch(donw)
            .then(res => res.blob()) // Gets the response and returns it as a blob
            .then(blob => {
                fileDownload(blob, 'output.zip');
            })
            .then(function(e){
                const del_url ="http://127.0.0.1:8000/download/";
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

    const [isDragging, setIsDragging] = useState(false);
  
    // 각 선택했던 파일들의 고유값 id
    const fileId = useRef(0);
    
    // 드래그 이벤트를 감지하는 ref 참조변수 (label 태그에 들어갈 예정)
    const dragRef = useRef(null);
    //-----------------------------------------드래그 앤 드롭 이벤트 처리----------------------------------------------------

    const [droppedFiles, setDroppedFiles] = useState([])
    const handleFileDrop = useCallback(
        (item) => {
        if (item) {
            const files = item.files
            setDroppedFiles(files)
        }
        },
        [setDroppedFiles],
    )

    // const [isDropped,setDropped] = useState(false);
    // const [dopfile,setdopfile] = useState([]);
    // const [list_loaded,setlist_loaded] = useState('laoded');
    // const [files, setFiles] = useState([]);
    // const [url_img,seturl_img] = useState('');
    
    // const encodeFileToBase64 = (fileBlob,seturl_img) => {
        
    //     const reader = new FileReader();
    //         reader.readAsDataURL(fileBlob);
    //         console.log(fileBlob)
    //         return new Promise((resolve) => {
    //         reader.onload = () => {
    //             imageSrc.push(reader.result);
    //             seturl_img(reader.result)
    //         };
    //         });
    //   };

    
    const [ list_img, setImg ] = useState([])
    const [ previewImg, setPreviewImg ] = useState([])

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
                    <div>드래그 또는 클릭하여 파일 선택하세요!</div>

                


            </div>
          )
        } else {
          return list_img.map((el, index) => {
            return (
              <div className='div_grid' key={index}>

                <div  style={{width:'130px',height:'200px',margin:'10px',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff',boxShadow:'2px 2px 2px 2px #A3A3A3'}}>
                  <img src={previewImg[index]} alt="preview-img" style={{width:'110px',height:'180px',margin:'5px'}}/>
                  <button className="btn_del"><DeleteIcon/></button>
                </div>

              </div>
            )
          })
        }
      }
      
      // render 
       

    return (


        <>
            <IconButton variant={'outline-primary'} onClick={handleShow}>
            <FileUploadIcon fontSize="large"/>
            </IconButton>

            
            <Modal show={show} onHide={handleClose} size="lg" style={{color:'black'}}>
                <Modal.Header closeButton>
                    <Modal.Title>파일 업로드</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{height:'auto'}}>
                    <Box>

                        <h4>File upload test</h4>
                            <form onSubmit={uploadMoudle}>
                                파일<input type="file" name="files" multiple/>
                                <input type="submit" value="제출"/>
                            </form>
                            
                        <h4>File downliad test</h4>

                        <form onSubmit={doundloadModule}>
                            <button type="submit">
                            다운로드
                            </button>
                        </form>

{/* -------------------------------------------------드래그 앤 드롭 테스트-------------------------------------------------------------------------------------------- */}
                    <div className="dorp_con"
                    onDrop={(e)=>{
                        e.preventDefault();
                        const files = e.dataTransfer?.files;
                        
                        // var a
                        // for (let i=0; i<files.length; i++){

                        //     encodeFileToBase64([...files][i]);
                        // }
                        
                        // // setdopfile([...files]);
                        // setlist_loaded('needload')
        
                        insertImg(files)
                        e.stopPropagation();
                        }}
                        
                        onDragOver={(e)=>{e.preventDefault();}}
                    >

                    <div className="dropBox">
                      
                            {getPreviewImg()}
                      
                        
                    </div>

                    <div className="dorp_plus">
                        
                        <AddIcon sx={{fontSize:'70px',color:'#0D99FF'}}/>

                    </div>
                    
                    </div>



{/* -------------------------------------------------드래그 앤 드롭 테스트-------------------------------------------------------------------------------------------- */}                   
                        
                        <ImageList img_list={img_list}/>  

                        


                    </Box>
                    </Modal.Body>
                <Modal.Footer>
                    
                <Box  style={{width:'100%'} }>
                    <Box style={{float:'right'} }>
                        <Button variant="primary"  onClick={props.handleClose}>
                        닫기
                        </Button>
                    </Box>
                </Box>
                </Modal.Footer>

            </Modal>
        </>







    );
  }

