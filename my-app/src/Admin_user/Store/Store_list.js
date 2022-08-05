import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import Now_modal from "./modals/Now_modal.js";
import Edit_sotre from "./modals/Edit_sotre.js";
import Memo_modal from "./modals/Memo_modal.js";
import Fileup_modal from "./modals/Fileup_modal.js";
// import Fileup_modal from "./modals/Fileup_test";
import Cal_modal from "./modals/Cal_modal.js";
import './Store.css';
import Pagination from './Pagination.jsx'
import Form from 'react-bootstrap/Form';
import {useSelector} from 'react-redux';


function createData( check,NO,agency,  user_data, division, create_date, file_up, memo, now,cal,management) {
    return {  check,NO,agency,  user_data, division, create_date, file_up, memo, now,cal,management};
  }

function User_data_progress(props){

return(
      <div style={{display:'flex',flexDirection:'column',alignItems: 'flex-start'}}>
        <div style={{fontSize:'12.6px'}}>[{props.store_name}]</div>
        <div style={{fontSize:'12.6px'}}>{props.store_tell}/{props.store_add}</div>
        <div style={{fontSize:'12.6px'}}>대리점 전화번호</div>
      </div>
    );
}

export default function Table_store(props) {
    
  const [loadstate, setloadstate] = useState('loaded');
  const [rows, setrows] = useState([])
  const [allchecked, setAllchecked] = useState(false);
  const [allcheckedlist, setallcheckedlist] = useState([]);
  const [checkedInputs, setCheckedInputs] = useState([]);

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const [totalcount, setTotalcount] = useState();
  const goturl = useSelector((state) => state);

  const allchaneHandler = () =>{
    setAllchecked(!allchecked)
    if (allchecked==false){
      for (let i = 0; i < rows.length; i++){
        allcheckedlist.push(rows[i].id)
      }
      setCheckedInputs(allcheckedlist)
    }
    else{
      setallcheckedlist([]);
      setCheckedInputs([]);
    }
  }

  const changeHandler = (checked, id) => {
    if (checked) {
      setCheckedInputs([...checkedInputs, id]);
    } else {
      // 체크 해제
      setCheckedInputs(checkedInputs.filter((el) => el !== id));
    }
  };

  if(loadstate==='loaded' || props.change==='needchange'){
    axios.get(`${goturl}/store/`)
    .then((response) => {
      setrows([...response.data])
      setloadstate('needload')
      props.setchange('changed')
      setTotalcount([...response.data].length)
        
      })

    }
    const thst = {
        justifyContent:'center',alignItems:'center',textAlign:'center',color:'black',verticalAlign:'middle',padding:'4px',fontWeight:'normal',
      }
      const th_color = {
        textAlign:'center',color:'white',verticalAlign:'middle',backgroundColor:'#0D99FF',height:'5px',
      }
      const check_color = {
        textAlign:'center',color:'white',verticalAlign:'middle',backgroundColor:'#0D99FF',
      }


  
  return(
    <>
    <div style={{display:'flex',justifyContent:'space-between',marginTop:'10px'}}>
      <div style={{display:'flex',justifyContent:'center'}}>
      <Form.Select aria-label="Default select example"
            type="number"
            value={limit}
            onChange={({ target: { value } }) => {
              setLimit(Number(value));
              setPage(1);
              setTotalcount(rows.length);
            }}
          >
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="10">10</option>
            <option value="50">50</option>
            <option value={rows.length}>All</option>
          </Form.Select>

      </div>
      <div>
      <Pagination
            total={rows.length}
            limit={limit}
            page={page}
            setPage={setPage}
            setTotalcount={setTotalcount}
            totalcount={totalcount}
          />
      </div>
    </div>


   



    <Table bordered hover >

    <thead  className='back_change' style={{height:'10px'}}>
        <tr style={th_color}>
        <th style={{width:"5%"}}><input type="checkbox" style={check_color}  defaultChecked={allchecked} onChange={()=>(
            allchaneHandler()
        )}/></th>
        <th style={{width:"5%",fontWeight:'normal',padding:'2px'}}>NO</th>
        <th style={{width:"8%",fontWeight:'normal',padding:'2px'}}>대리점</th>
        <th style={{width:"23%",fontWeight:'normal',padding:'2px'}}><div style={{display:'flex',flexDirection:'column'}}><div>회원정보</div><div style={{fontSize:'12.6px'}}>(건축사명,휴대전화,주소)</div></div></th>
        <th style={{width:"5%",fontWeight:'normal',padding:'2px'}}>지역</th>
        <th style={{width:"10%",fontWeight:'normal',padding:'2px'}}>등록일</th>
        <th style={{width:"10%",fontWeight:'normal',padding:'2px'}}>파일업로드</th>
        <th style={{width:"10%",fontWeight:'normal',padding:'2px'}}>특이사항&메모</th>
        <th style={{width:"10%",fontWeight:'normal',padding:'2px'}}>검토현황</th>
        <th style={{width:"10%",fontWeight:'normal',padding:'2px'}}>정산</th>
        <th style={{width:"5%",fontWeight:'normal',padding:'2px'}}>수정</th>
        </tr>
    </thead>

    <tbody style={{borderTop:'none'}}>

    {rows.slice(offset, offset + limit).map((event,idx)=>(
        <tr key={event.id}>       
            <th style={thst}><input type="checkbox" style={thst} id={event.id}   checked={checkedInputs.includes(event.id) ? true : false}
            onChange={(e)=>{
              changeHandler(e.currentTarget.checked, event.id)
            }}

            /></th>
            <th style={thst}>{totalcount-(idx)}</th>
            <th style={thst}><div style={{fontWeight:'normal'}}>{event.agency_name}</div></th>
            <th style={thst}><User_data_progress store_name={event.store_name} store_tell={event.store_tell} store_add={event.store_add}/></th>
            <th style={thst}>{event.state}</th>
            <th style={thst}>{event.created_at}</th>
            <th style={thst}><Fileup_modal setchange={props.setchange} id={event.id} val='file_up'/></th>
            <th style={thst}><Memo_modal setchange={props.setchange} memo={event.memo} id={event.id} val='memo'/></th>
            <th style={thst}><Now_modal now_memo={event.now_memo} now={event.now} setchange={props.setchange} id={event.id} val='now'/></th>
            <th style={thst}>

              <div style={{paddingLeft:'20px',paddingRight:'20px',display: 'flex',justifyContent:'space-between'}}>
                <div>
                  <div style={{fontSize:'12px',color:"#595c97"}}>{event.cal_name}</div>
                  <div style={{fontSize:'12px',color:"#595c97"}}>{event.cal_date}</div>
                </div>
                <Cal_modal id={event.id} />
              </div>

            </th>
            <th style={thst}><Edit_sotre store_name={event.store_name} store_tell={event.store_tell} store_add={event.store_add} state={event.state} memo={event.memo} setchange={props.setchange} id={event.id} val='management'/></th>
        </tr>
    ))}

    </tbody>
    </Table>
    </>
  );
}
