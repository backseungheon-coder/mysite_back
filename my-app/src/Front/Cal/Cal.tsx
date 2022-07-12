
import React, { useState,Dispatch  } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {Button,Form,Table } from 'react-bootstrap';
import styled from "styled-components";
import AddIcon from '@mui/icons-material/Add';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import axios from 'axios';
import Cal_modal from './Cal_modal.js';
import Cal_plus from './Cal_plus.js';



interface propTypes{
    setState:Function;
}

interface propsFull{
    Id_full:string;
    datarr:any;
    setSize:Function;
    setready:string;
}

interface propsinner{
    num:any;
    setId_full:Function;
    id:string;
    title:string;
    setSize:Function;
    setready:string;
}

const Container = styled.div`
display: flex;
flex-direction: column;
margin:20px;
height:auto;

`;



const Cal_con = styled.div`
    width:100%;
    
    display: flex;
    .table_con{
        border-radius: 10px;
        margin: 10px;
        width:50%;
        height:auto;
        background-color: white;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        // ----------------------------------------------------------------------------------------------------------------------------------
        .table_title{
            color:  ${props => props.color};
            font-weight: 400;
            display: flex;
            width:100%;
            min-height: 50px;
            align-items: center;
            justify-content: space-between;
            p{
                margin-left: 3%;
                float: left;
            }
            div{
                display: flex;
                float:right;
                margin-right: 2%;
                button{
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    margin-right: 10px;
                    justify-content: center;
                    display: flex;
                    align-items: center;
                }
            }
        }
        .table{
            margin-top:0px;
            
            thead{
                background-color:  ${props => props.color};
                color: white;

            }
            tbody{
                border-top: 0;
                tr{
                    border-bottom: 0.5px solid gray;
                }
            }
        }
    }
    
    .table_add{
        border-radius: 10px;
        margin: 10px;
        width:50%;
        height:auto;
        background-color: white;
        box-shadow: 10px 5px 5px #cecece;
        border: 2px solid #92B4EC;
        display: flex;
        align-items: center;
        justify-content: center;

    }

    .table_setting{
        border-radius: 10px;
        margin: 10px;
        width:50%;
        height:auto;
        background-color: white;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        div{
            display: flex;
            align-items: center;
            justify-content: center;
            width:90%;
            margin: 10px;
        }
    }
  
`;

const Plus_con = styled.div`
   
        border-radius: 10px;
        min-height: 700px;
        margin: 10px;
        width:100%;
        height:auto;
        background-color: white;
        box-shadow: 10px 5px 5px #cecece;
        border: 2px solid #92B4EC;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        div{
            display: flex;
            align-items: center;
            justify-content: center;
            width:90%;
            margin: 10px;
        }
`;

const Circle_button_plus = styled.button`
        border:none;
        background-color: #0D99FF;
        color:white;
        &:hover{
            border:2px solid #0987;
            background: #0987e3;
        }
`;

const Circle_button_full = styled.button`
        border:2px solid #0D99FF;
        background: transparent;
        color:#0D99FF;
        &:hover{
            border:none;
            background-color: #0D99FF;
            color:white;
        }
`;


const Edit_button = styled.button`
        border:none;
        background: transparent;
        color:#FE2222;
        &:hover{
            border:none;
            color:#FF4F59;
        }
`;


function Container_changer(props:propsinner){
    const [state, setState] = useState<string>(props.setready);
    const [loaded, setloaded] = useState<string>('needload')
    const Change_state1 = () => setState('plus')
    const Change_state2 = () => setState('table')
    const Change_state3 = () => setState('edit')
    const [data,setData] = useState<any[] >([])
    const [title,setTitle] =useState<string>('');
    const [sub,setSub] =useState<string>('');

    

    const [title_edit,editTitle] =useState<string>('');
    const [sub_edit,editSub] =useState<string>('');
    const [id_delete, editDelete] =useState<any>('');


    if (loaded==='needload'){
        axios.post("http://127.0.0.1:8000/Cal/", {
            mode:'load',
            id:props.id,
        })
        .then((response) => {
        

        setData([...response.data])
         
       
        setloaded('loaded')
        })
    }

    if(state==='table'){
        var element = (
            <div className='table_con'>
            <div>
                <div className='table_title'>
                        <p style={{color:'#0D99FF',marginBottom:'0px',fontWeight:'bold'}}>{props.title}</p>
                        <div>
                            <Circle_button_plus onClick={Change_state1} ><AddIcon /></Circle_button_plus>
                            <Circle_button_full onClick={(e) => (
                                props.setSize('full'),
                                props.setId_full(props.num)
                            )} ><FullscreenIcon/></Circle_button_full>
                        </div> 
                </div>
                <Table bordered hover>
                <thead>
                    <tr style={{background:"#0D99FF"}}>
                        <th style={{width:'15%'}}>{props.id}</th>
                        <th style={{width:'15%'}}>등록일</th>
                        <th style={{width:'20%'}}>차수명</th>
                        <th style={{width:'35%'}}>설명</th>
                        <th style={{width:'15%'}}>관리</th>
                    </tr>
                </thead>
                <tbody>
                {data.map((event,idx)=>(
                    <tr  key={idx+event.id}>
                    <td>{(data.length)-(idx)}</td>
                    <td>{event.created_date}</td>
                    <td>{event.cal_name}</td>
                    <td>{event.cal_sub}</td>
                    <td><Edit_button onClick={()=>(
                        Change_state3(),
                        editTitle(event.cal_name),
                        editSub(event.cal_sub),
                        editDelete(event.id)
                )}><BorderColorIcon/></Edit_button></td>
                    </tr>
                ))}


                </tbody>
                
                </Table>
            </div>
            </div>
        );
        }else if(state==='edit'){
            var element = (
                <div className='table_setting'>
                        <div>정산 수정</div>
    
    
                        <Form.Floating className="mb-3">
                            <Form.Control placeholder="name" onChange={(e) => editTitle(e.target.value)} value={title_edit}/>
                            <label htmlFor="floatingInputCustom">차수명</label>
                        </Form.Floating>
    
                        <Form.Floating className="mb-3">
                            <Form.Control placeholder="name" onChange={(e) => editSub(e.target.value)} value={sub_edit}/>
                            <label htmlFor="floatingInputCustom">설명</label>
                        </Form.Floating>
    
                        <div style={{display:'flex'}}>
                        <Button variant="danger" style={{margin:5}} 
                        onClick={()=>{
                            axios
                            .post("http://127.0.0.1:8000/Cal/", {
                                        mode:'inner_delete',
                                        id:id_delete,

                                    })
                                    .then(function (response) {
                                        Change_state2()
                                        setloaded('needload')

                                        
                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                    });
                        }}
                        
                        
                        >삭제</Button>
                        <Button variant="secondary" style={{margin:5}} onClick={Change_state2}>취소</Button>
                        <Button style={{margin:5}} 
                        
                        onClick={()=>{
                            axios
                            .post("http://127.0.0.1:8000/Cal/", {
                                        mode:'inner_edit',
                                        id:id_delete,
                                        title_edit:title_edit,
                                        sub_edit:sub_edit,

                                    })
                                    .then(function (response) {
                                        
                                        Change_state2()
                                        setloaded('needload')
                                        
                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                    });
                        }}

                        >수정</Button>
                        
                        </div>
                        
                </div>
            );
        
          

    }else if(state==='plus'){
        var element = (
            <div className='table_setting'>
                    <div>정산 등록</div>


                    <Form.Floating className="mb-3">
                        <Form.Control placeholder="name" onChange={(e) => setTitle(e.target.value)} value={title}/>
                        <label htmlFor="floatingInputCustom">차수명</label>
                    </Form.Floating>

                    <Form.Floating className="mb-3">
                        <Form.Control placeholder="name" onChange={(e) => setSub(e.target.value)} value={sub}/>
                        <label htmlFor="floatingInputCustom">설명</label>
                    </Form.Floating>

                    <div style={{display:'flex'}}>
                    <Button variant="secondary" style={{margin:5}} onClick={Change_state2}>취소</Button>

                    {/* --------------------------------------- 여기 해결 해야됨--------------------------------------- */}
                    <Cal_plus id={props.id} title={title} sub={sub} setloaded={setloaded} Change_state2={Change_state2} />


                    </div>
                    
            </div>
        );
    }
    else {
        var element = (
            
            <div className='table_setting'>
            </div>
        );
    }

    return(
        <>
        {element}
        </>  
    );
}
function Full_table(props:propsFull){
    const [state,setState] = useState<string>('ready');

    const add_cal = () => setState('plus')
    const Change_state1 = () => setState('ready')
    const Change_state2 = () => setState('edit')
    const onFullscreen = () => props.setSize('norlmal')
    const [loaded, setloaded] = useState<string>('needload')
    const [data,setData] = useState<any[] >([])
    const Change_state3 = () => setState('edit')
    const [title_edit,editTitle] =useState<string>('');
    const [sub_edit,editSub] =useState<string>('');
    const [id_delete, editDelete] =useState<any>('');

    
    if (loaded==='needload'){
        axios.post("http://127.0.0.1:8000/Cal/", {
            mode:'load',
            id:props.datarr[Number(props.Id_full)].id,
        })
        .then((response) => {
        

        setData([...response.data])
         
       
        setloaded('loaded')
        })
    }

    

    if(state==='plus') {
        var element= (
            <Plus_con>

                <div>정산 등록</div>

                    <Form.Floating className="mb-3">
                        <Form.Control placeholder="name"/>
                        <label htmlFor="floatingInputCustom">차수명</label>
                    </Form.Floating>

                    <Form.Floating className="mb-3">
                        <Form.Control placeholder="name"/>
                        <label htmlFor="floatingInputCustom">설명</label>
                    </Form.Floating>

                    <div style={{display:'flex'}}>
                    <Button variant="secondary" style={{margin:5}} onClick={Change_state1}>취소</Button>
                    <Button style={{margin:5}} onClick={Change_state1}>등록</Button>
                    </div>
                    
            </Plus_con>

        );
    }
    else if(state==='edit') {
        var element= (
            <Plus_con>
                <div>정산 수정</div>
                    <Form.Floating className="mb-3" >
                        <Form.Control placeholder="name" onChange={(e) => editSub(e.target.value)} value={title_edit}/>
                        <label htmlFor="floatingInputCustom">차수명</label>
                    </Form.Floating>

                    <Form.Floating className="mb-3">
                        <Form.Control placeholder="name" onChange={(e) => editSub(e.target.value)} value={sub_edit}/>
                        <label htmlFor="floatingInputCustom">설명</label>
                    </Form.Floating>

                    <div style={{display:'flex'}}>
                    <Button variant="secondary" style={{margin:5}} onClick={Change_state1}>취소</Button>
                    <Button style={{margin:5}} onClick={Change_state1}>등록</Button>
                    </div>
            </Plus_con>

        );
    }
    else{
        var element= (
            <Cal_con style={{height:'700px'}} color='#0D99FF'>
            <div className='table_con'  style={{width:'100%'}}>
            <div>
                <div className='table_title'>
                        <div/>
                        <p style={{color:'#0D99FF',margin:'0px',fontSize:'20px'}}>{props.datarr[Number(props.Id_full)].cal_title}</p>

                        <div>
                            <Button onClick={add_cal} variant='primary'><AddIcon /></Button>
                            <Button onClick={onFullscreen} variant='success'><CloseFullscreenIcon/></Button>
                        </div>  
                </div>
                <Table bordered hover>
                <thead>
                    <tr>
                    <th style={{width:'15%'}}>NO</th>
                    <th style={{width:'15%'}}>등록일</th>
                    <th style={{width:'20%'}}>차수명</th>
                    <th style={{width:'35%'}}>설명</th>
                    <th style={{width:'15%'}}>관리</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((event,idx)=>(
                        <tr  key={idx}>
                        <td>{(data.length)-(idx)}</td>
                        <td>{event.created_date}</td>
                        <td>{event.cal_name}</td>
                        <td>{event.cal_sub}</td>
                        <td><Edit_button onClick={()=>(
                            Change_state3(),
                            editTitle(event.cal_name),
                            editSub(event.cal_sub),
                            editDelete(event.id)
                    )}><BorderColorIcon/></Edit_button></td>
                        </tr>
                    ))}

                </tbody>
                
                </Table>
            </div>
            </div>
            </Cal_con>

        );
    }

    return(
            <>
                {element}
            </>
       
    );
}



function Matin_table(porps:propTypes){
    const [change, setchange] = useState<string>('changed')
    const [loaded, setloaded] = useState<string>('needload')
    const [pulsbtn,showplus] = useState<string>('show')
    const [num, setNum] = useState<number>(0)
    const [count, setCount] = useState<number>(num/2);
    const [size, setSize] = useState<string>('normal');
    const [datarr, setDatarr] = useState<any[]>([]);
    const [Id_full, setId_full] = useState<string>('')
    // const ExampleCustomInput = ({ value, onClick }) => (
    //     <Button variant="outline-secondary"className="example-custom-input" style={{margin:0,width:130}} onClick={onClick}>{value}</Button>
    // );      

    const onIncrease = () => setCount(count + 1);

    var array = []

    if (loaded==='needload'){
        axios.get(`http://127.0.0.1:8000/Cal/`)
        .then((response) => {
        setDatarr([...response.data])
        setCount([...response.data].length/2)
        setNum([...response.data].length)
        setloaded('loaded')
        
        })
    }



//--------------------------------------------여기 해결 해야됨!------------------------------------------------------------------------
    if (loaded==='loaded'){
        if(num==0) {
            for(var i = 0;i<count+1; i++){
                array.push(
                        <>
                        <div key="idx1">
                        정산 항목을 추가 하여 주세요
                        </div>
                        
                        </>
                ) 
            }
        }
        else if(num==1){
            array.push(
                <Cal_con  key="idx2" style={{minHeight:'500px'}} color='#92B4EC' >
                
                    <Container_changer  num={'0'} setId_full={setId_full} id={datarr[0].id} title={datarr[0].cal_title} setready='table' setSize={setSize} />
                    <Container_changer  num={''} setId_full={setId_full} id='' title='' setready='ready' setSize={setSize}/>

                </Cal_con>
            )
        }
        else if(num%2!=0 && num!=1 && num!=0){
            for(var i = 0;i<num-2; i=i+2){
                array.push(
                    <Cal_con  key="idx3" style={{minHeight:'500px'}} color='#92B4EC' >
                        <Container_changer  num={i} setId_full={setId_full} id={datarr[i].id} title={datarr[i].cal_title} setready='table' setSize={setSize} />
                        <Container_changer  num={i+1} setId_full={setId_full} id={datarr[i+1].id} title={datarr[i+1].cal_title} setready='table' setSize={setSize}/>
                    </Cal_con>
                )
            }
            array.push(
                <Cal_con  key="idx4" style={{minHeight:'500px'}} color='#92B4EC' >
                    <Container_changer num={num-1} setId_full={setId_full} id={datarr[num-1].id} title={datarr[num-1].cal_title} setready='table' setSize={setSize} />
                    <Container_changer  num={''} setId_full={setId_full} id='' title='' setready='ready' setSize={setSize}/>
                </Cal_con>
            )
        }
        else if(num%2==0 && num!=1 && num!=0){
            // showplus('show');
            for(var i = 0;i<num; i=i+2){
                array.push(
                    <Cal_con  key="idx5" style={{minHeight:'500px'}} color='#92B4EC' >
                        <Container_changer num={i} setId_full={setId_full} id={datarr[i].id} title={datarr[i].cal_title} setready='table' setSize={setSize} />
                        <Container_changer num={i+1} setId_full={setId_full} id={datarr[i+1].id}  title={datarr[i+1].cal_title} setready='table' setSize={setSize}/>
                    </Cal_con>
                )
            }
        }
    }
    

//--------------------------------------------여기 해결 해야됨!------------------------------------------------------------------------

    
    if(size === 'full'){
        var size_element=(
            <>
                <div>
                    <Full_table Id_full={Id_full} datarr={datarr} setready='table' setSize={setSize}/>
                </div> 
            </>
        );
    }else{
        var size_element=(
            <>
                {array}
                <div style={{width:'100%',height:'100px',display:'flex',alignItems:'center',justifyContent:'center', marginTop:'20px'}}>
            {/*--------------------------------------------------------------------------------------------------------------*/}
            {/*--------------------------------------------------------------------------------------------------------------*/}
            </div>
      
            </>
        );
    }

    return(
        <Container>
                <div style={{display:'flex',justifyContent:'space-between',marginTop:20}}>
                <Box>
                    <h4>정산관리</h4>
                </Box>
                <Box sx={{display: 'flex'}}>
                    <Cal_modal setloaded={setloaded}/>

                </Box>
                </div>
                <hr></hr>
                <Box sx={{marginTop:0,marginBottom:5}}>
                    {size_element}
                </Box>
        </Container>
    )
}

export default function SimplePaper() {
    
    const [state, setState] = useState<string>('Table')

    if(state === 'Table'){
        return (
        <Box sx={{margin:5}}>
            <Matin_table setState={setState}/>
        </Box>
        );
    }
}