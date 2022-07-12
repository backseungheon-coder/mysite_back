
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Button,Form} from 'react-bootstrap';
import Notice_list from './Notice_list';
import Notice_wigi from './Notice_wigi.js';
import Checkbox from '@mui/material/Checkbox';
import styled from 'styled-components'
import axios from 'axios';
import Notice_file from './Norice_file.js';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import fileDownload from 'react-file-download';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Button_up = styled.button`
  background: #0D99FF;
  border-radius: 3px;
  border: 2px solid #0D99FF;
  color: white;
  margin: 0 1em;
  padding: 0.25em 1em;
`

const Inner_con = styled.div`
  background: #F3F3F3;
  color: black;
  width:100%;
  height: 100%;
  display: flex;
  justify-content:center;
`

const Inner_temp = styled.div`
    background: white;
    color: black;
    width:60%;
    margin-top :50px;
    height: 750px;
    display: flex;
    justify-content:center;
    align-items: center;
`

const Inner_line = styled.div`
    color: black;
    width:95%;
    height: 90%;
`

const Button_back = styled.button`
    background: #0D99FF;
    border:none;
    border-radius:50%;
    width:42px;
    height:42px;
    display: flex;
    justify-content:center;
    align-items: center;
`

const Uploaded_box = styled.div`
    border:1px solid #D9D9D9;
    color: black;
    width:100%;
    height: 80px;
    overflow: auto;
    display: flex;
    flex-direction: column;
`

const Wiziwig_con = styled.div`
    margin-top:30px;
    width:100%;
    height: 400px;
    overflow: auto;
`


const Button_del = styled.button`
    width:100px;
    height:35px;
    background: transparent;
    border-radius:6px;
    border:2px solid #A9A9A9;
    color:#A9A9A9;
    &:hover {
        border:2px solid #FE2222;
        color:#FE2222
    }

`

const Button_rp = styled.button`
    border:2px solid #0D99FF;
    color:#0D99FF;
    width:100px;
    height:35px;
    background: transparent;
    border-radius:6px;
    &:hover {
        background: #0D99FF;
        color:white
    }

`


function Matin_table(props){
    const [change, setchange] = useState('changed')
    const [startDate, setStartDatestart] = useState(new Date());
    const [startDateend, setStartDateend] = useState(new Date());
    const [loaded, setloaded] = useState('loaded')
    const [display,setdisplay] = useState('notice')

    const [notice_data,setNotice_data]= useState('');//공지사항 body
    const [aChecked, setaChecked] = useState(false);//팝업표시여부
    const [bChecked, setChecked] = useState(false);//화면표시여부
    const [cChecked, setcChecked] = useState(false);//중요 공지사항
    const [notice_cate, setNotice_cate]= useState('일반') ;//공지사항 카테고리
    const [notice_title, setNotice_title] = useState('');//공지사항 타이틀
    const [send_list, setsend_list] = useState([]);
    const [ previewImg, setPreviewImg ] = useState([]);
    const [ list_img, setImg ] = useState([]);
    const [file_list,setFileList] = useState([]);
    const [inner_item,setInneritem] = useState([]);
    const [ notice_id, setID] = useState('');
    
    const ExampleCustomInput = ({ value, onClick }) => (
        <Button variant="outline-secondary"className="example-custom-input" style={{margin:0,width:130}} onClick={onClick}>{value}</Button>
    );
    
    function isEmptyArr(arr)  {
        if(Array.isArray(arr) && arr.length === 0)  {
          return true;
        }
        
        return false;
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
            formData.append("mode",'uploade')
            formData.append("counter",i)
            formData.append("id",e)
    
            const url ="http://127.0.0.1:8000/notice/create/"
    
            axios({
                method: "POST",
                url: url,
                data: formData,
                headers:{
                    "Content-Type":" multipart/form-data",
                }
            }).then(function (response){
                setsend_list([])
                setPreviewImg([])
                setImg([])
            })   
        }  
    }   
    
    function getCheckboxValue(event)  {
        let result = '';
        if(event.target.checked)  {
            setChecked(true)
        }else {
          result = '';
          setChecked(false)
        }
      }

    function getCheckboxValue2(event)  {
        let result = '';
        if(event.target.checked)  {
            setaChecked(true)
        }else {
          result = '';
          setaChecked(false)
        }
      }

    function getCheckboxValue3(event)  {
        let result = '';
        if(event.target.checked)  {
            setcChecked(true)
        }else {
          result = '';
          setcChecked(false)
        }
      }

    const css_right = {
        marginRight:10
    }


    function click_return(e) {
        setdisplay('notice')
    }


    if(display === 'notice' ){
        return(
            <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height:'auto',
                width:'100%',
                height:'100%',
                backgroundColor:'#F3F3F3',
                marginTop:'40px'
            }}
        >
                <Box sx={{display: 'flex',justifyContent: 'center',backgroundColor:'white',paddingTop:'10px',paddingBottom:'20px'}} >
                    <Box>
                        <h2 style={{fontWeight: 'bold'}}>공지사항</h2>
                    </Box>
                    {/* <Box sx={{display: 'flex'}}>
                    <Button variant="outline-primary"
                        onClick={ click_create }
                    >공지사항 등록</Button>
                    </Box> */}
                </Box>
                <Box sx={{marginTop:0,marginBottom:5}} >
                    <Notice_list setdisplay={setdisplay} setloaded={setloaded} loaded={loaded} setInneritem={setInneritem} setFileList={setFileList}/>
                </Box>
        </Box>
        )
    }
    else if(display === 'create'){
        return(
            <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                m:10,
                height:'auto'
            }}
        >
                
                <Box sx={{display: 'flex',justifyContent: 'space-between', marginTop:2}}>
                    <Box>
                        <h4>공지사항 등록</h4>
                    </Box>
                    <Box sx={{display: 'flex'}}>
                        {/* <Button variant="primary" style={css_right}>일괄정산</Button> */}

                    </Box>
                </Box>
                        <hr></hr>
                <Box sx={{marginTop:0}}>
                
                <div style={{display:'flex', marginBottom:'20px'}}>
                    <Form.Select aria-label="Default select example" style={{width:'30%'}}
                    onChange={(e)=>{
                        setNotice_cate(e.target.value)
                    }}

                    >
                    <option value="일반">일반공지</option>
                    <option value="시스템">시스템공지</option>
                    <option value="기타">기타공지</option>
                    </Form.Select>
                    <div style={{width:'1%'}}></div>

                    <Form.Control  type="text"   placeholder="제목을 입력해주세요." style={{width:'69%'}} 
                    onChange={(e)=>{
                        setNotice_title(e.target.value)
                    }}

                    />
                    
                </div> 
                   
                <div style={{display:'flex',justifyContent:'space-between', marginBottom:'20px'}}>
                    <div style={{display:'flex'}}>
                        <div><Checkbox {...label}
                        onChange={(e)=>{
                        getCheckboxValue(e)
                        }}
                        /> 화면표시여부</div>
                        <div><Checkbox {...label}
                        onChange={(e)=>{
                        getCheckboxValue2(e)
                        }}
                        /> 팝업표시여부</div>
                        <div><Checkbox {...label}
                        onChange={(e)=>{
                        getCheckboxValue3(e)
                        }}
                        /> 중요 공지</div>
                    </div>
                    <div>
                        <Notice_file setsend_list={setsend_list}  send_list={send_list} setPreviewImg={setPreviewImg } previewImg={previewImg} setImg={setImg} list_img={list_img} />
                    </div>
                    
                </div>

                <Notice_wigi setNotice_data={setNotice_data} />
     
                
                </Box>
                <Box sx={{marginBottom:2}}>
                    <div style={{float:'left'}}>
                        <Button variant="secondary"
                            onClick={ 
                                (e)=>{
                                    setloaded('loaded')
                                    click_return()
                                }
                                 }
                        >목록</Button>
                    </div>
                    <div style={{float:'right'}}>
                        <Button_up
                            onClick={(e)=>{
                                    const url ="http://127.0.0.1:8000/notice/create/";
                                    const formData = new FormData();
                                    formData.append("mode",'post')
                                    formData.append("contents",notice_data)
                                    formData.append("visdis",bChecked)
                                    formData.append("popdis",aChecked)
                                    formData.append("important",cChecked)
                                    formData.append("notice_title",notice_title)
                                    formData.append("notice_cate",notice_cate)
                                axios({
                                    method: "POST",
                                    url: url,
                                    data: formData,
                                    headers:{
                                        "Content-Type":"application/json",
                                        }
                                }).then(function(response){

                                    setID(response.data)
                                    uploadMoudle(response.data);
                                    setaChecked(false);
                                    setChecked(false);
                                    setcChecked(false);
                                    setloaded('loaded');
                                    click_return();
                                })
                            }}
                        >저장하기</Button_up>
                    </div>
                </Box>
        </Box>
        )
    }

    else if(display === 'edit'){

        return(
            <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                m:10,
                height:'auto'
            }}
        >
                
                <Box sx={{display: 'flex',justifyContent: 'space-between', marginTop:2}}>
                    <Box>
                        <h4>공지사항 등록</h4>
                    </Box>
                    <Box sx={{display: 'flex'}}>
                        {/* <Button variant="primary" style={css_right}>일괄정산</Button> */}

                    </Box>
                </Box>
                        <hr></hr>
                <Box sx={{marginTop:0}}>
                
                <div style={{display:'flex', marginBottom:'20px'}}>
                    <Form.Select aria-label="Default select example" style={{width:'30%'}}
                    value={inner_item.Notice_cate}
                    onChange={(e)=>{
                        setNotice_cate(e.target.value)
                    }}
                    >
                    <option value="일반">일반공지</option>
                    <option value="시스템">시스템공지</option>
                    <option value="기타">기타공지</option>
                    </Form.Select>
                    <div style={{width:'1%'}}></div>

                    <Form.Control  type="text"   placeholder="제목을 입력해주세요." style={{width:'69%'}} 
                    value={inner_item.notice_title}
                    onChange={(e)=>{
                        setNotice_title(e.target.value)
                    }}

                    />
                    
                </div> 
                   
                <div style={{display:'flex',justifyContent:'space-between', marginBottom:'20px'}}>
                    <div style={{display:'flex'}}>
                        <div><Checkbox {...label}
                        value={inner_item.visdis }
                        onChange={(e)=>{
                        getCheckboxValue(e)
                        }}
                        /> 화면표시여부</div>
                        <div><Checkbox {...label}
                        value={inner_item.popdis }
                        onChange={(e)=>{
                        getCheckboxValue2(e)
                        }}
                        /> 팝업표시여부</div>
                        <div><Checkbox {...label}
                        value={inner_item.important}
                        onChange={(e)=>{
                        getCheckboxValue3(e)
                        }}
                        /> 중요 공지</div>
                    </div>
                    <div>
                        <Notice_file setsend_list={setsend_list}  send_list={send_list} setPreviewImg={setPreviewImg } previewImg={previewImg} setImg={setImg} list_img={list_img} />
                    </div>
                    
                </div>

                <Notice_wigi contents={inner_item.contents} setNotice_data={setNotice_data} />
     
                
                </Box>
                <Box sx={{marginBottom:2}}>
                    <div style={{float:'left'}}>
                        <Button variant="secondary"
                            onClick={ 
                                (e)=>{
                                    setloaded('loaded')
                                    click_return()
                                }
                                 }
                        >목록</Button>
                    </div>
                    <div style={{float:'right'}}>
                        <Button_up
                            onClick={(e)=>{
                                    const url ="http://127.0.0.1:8000/notice/create/";
                                    const formData = new FormData();
                                    formData.append("mode",'post')
                                    formData.append("contents",notice_data)
                                    formData.append("visdis",bChecked)
                                    formData.append("popdis",aChecked)
                                    formData.append("important",cChecked)
                                    formData.append("notice_title",notice_title)
                                    formData.append("notice_cate",notice_cate)
                                axios({
                                    method: "POST",
                                    url: url,
                                    data: formData,
                                    headers:{
                                        "Content-Type":"application/json",
                                        }
                                }).then(function(response){

                                    setID(response.data)
                                    uploadMoudle(response.data);
                                    setaChecked(false);
                                    setChecked(false);
                                    setcChecked(false);
                                    setloaded('loaded');
                                    click_return();
                                })
                            }}
                        >저장하기</Button_up>
                    </div>
                </Box>
        </Box>
        )
    }
    
    else if(display === 'inner'){
        return(
            <>
                <Inner_con>
                    <Inner_temp>
                        <Inner_line>
                            <div className={'header'}>
                                <div style={{display:'flex', justifyContent: 'space-between'}}>
                                    <div style={{color: '#0D99FF'}}>{inner_item.Notice_cate}</div>
                                    <Button_back
                                    onClick={(e)=>{
                                        
                                        setdisplay('notice')
                                    }}
                                    >
                                        <ArrowBackIosNewIcon sx={{color:"white",marginRight:'3px'}}/>
                                    </Button_back>
                                </div>
                                <h2>{inner_item.notice_title}</h2>
                            </div>
                            <div className={'body'}>
                                <div style={{fontSize:'15px',color:'#999999'}}>등록일 {inner_item.created_date}</div>
                                <Uploaded_box>
                                {/* {file_list.map((event,idx)=>{
                                    <a href='#' key={idx} style={{fontSize:'15px',color:'#333333'}}><AttachFileIcon fontSize='small'/>{event}</a>
                                })}
                                {file_list} */}

                                {file_list.map((event,idx)=>{
                                   return(<a href='#' key={idx} style={{fontSize:'15px',color:'#333333'}}
                                   onClick={(e)=>{
                                    var url_local = "http://127.0.0.1:8000"
                                    var url  = event.url
                                    var donw = url_local+url

                                    axios.get(donw, {
                                        responseType: 'blob',
                                      })
                                      .then((res) => {
                                        fileDownload(res.data, event.title)
                                      })
                                   }
                                } 
                                   >{event.title}<AttachFileIcon fontSize='small'/></a>)
                                })}

                                </Uploaded_box>
                                <Wiziwig_con>
                                    <div dangerouslySetInnerHTML={ {__html: inner_item.contents} }></div>
                                </Wiziwig_con>

                            </div>
                            <div className={'footer'} style={{borderTop:'1px solid #D1D1D1'}}>
                                <div style={{display:'flex',justifyContent: 'space-between',marginTop:'20px'}}>
                                    <Button_del
                                    onClick={(e)=>{
                                    const url ="http://127.0.0.1:8000/notice/create/";
                                    const formData = new FormData();
                                    formData.append("mode",'delete')
                                    formData.append("id",inner_item.id);

                                axios({
                                    method: "POST",
                                    url: url,
                                    data: formData,
                                    headers:{
                                        "Content-Type":"application/json",
                                        }
                                }).then(function(response){
                                    alert('hi');
                                    setdisplay('notice')
                                })
                            }}
                                    >삭제</Button_del>
                                    <Button_rp onClick={() => setdisplay('edit')}>수정</Button_rp>
                                </div>
                            </div>
                        </Inner_line>
                    </Inner_temp>
                </Inner_con>

            </>
        )
    }

}

export default function SimplePaper() {
    const [state, setState] = useState('Table')

    if(state === 'Table'){
        
        return (
        <Box sx={{backgroundColor: 'white',padding:'0px', marginTop:'0px',height:'100%'}} >
        <Box  sx={{width: '100%', height: '100%',backgroundColor: 'transparent'}} >

            <Matin_table setState={setState}/>

        </Box>
        </Box>
        );
    }
}
