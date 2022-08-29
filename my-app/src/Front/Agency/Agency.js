
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Button} from 'react-bootstrap';
import Agency_lists from './Agency_list.js';
import Agency_create_modal from './modals/Agency_create_modal.js';
  
 

function Matin_table(props){
    const [change, setchange] = useState('changed')
    // const ExampleCustomInput = ({ value, onClick }) => (
    //     <Button variant="outline-secondary"className="example-custom-input" style={{margin:0,width:130}} onClick={onClick}>{value}</Button>
    // );

    const css_right = {
        marginRight:10
    }
    
    return(
        <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            m:2,
            height:'auto'

        }}
      >
  
              <Box sx={{display: 'flex',justifyContent: 'space-between', marginTop:2}}>
                    <Box>
                        <h4>대리점 관리-목록</h4>
                    </Box>
                    <Box sx={{display: 'flex'}}>
                        {/* <Button variant="primary" style={css_right}>일괄정산</Button> */}
                    
                        {/* <Agency_create_modal setchange={setchange}/> */}
                
                    </Box>
  
              </Box>

                      <hr></hr>
        
              <Box sx={{marginTop:0,marginBottom:5}}>
                
                <Agency_lists change={change} setchange={setchange} />
                {/* 여기에 중간 애용 삽입 */}

              </Box>
          
      </Box>
    )
}

export default function SimplePaper() {
    const [state, setState] = useState('Table')

    if(state === 'Table'){
        
        return (
        <Box sx={{margin:5}}>

            <Matin_table setState={setState}/>

        </Box>
        );
    }
}
