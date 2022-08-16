import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

import {useSelector} from 'react-redux';
import { pureFinalPropsSelectorFactory } from 'react-redux/es/connect/selectorFactory';
import { prependOnceListener } from 'process';

export default function Cal_modal(props) {
    const [show, setShow] = useState(false);
    const [title,setTitle] =useState('');
    const [sub,setSub] =useState('');
    const goturl = useSelector((state) => state);
    
    

    return (

        <>  
            <Button variant="primary" 
             onClick={()=>{
                axios
                .post(`${goturl}/Cal/`, {
                            mode:'add_inner',
                            id:props.id,
                            title:props.title,
                            sub:props.sub,
                        })
                        .then(function (response) {
                            console.log('hi')
                            props.Change_state2('norlmal')
                            props.setloaded('needload')
                        })
                        
                        .catch(function (error) {
                            console.log(error);
                        });

                        
            
            
            }}
            >등록</Button>
            
            
            
        </>







    );
  }