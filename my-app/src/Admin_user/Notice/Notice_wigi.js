import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import React, { Component,useState } from 'react';
import './Notice.scss'

export default function Notice_wigi(props) {
    

    if (props.mode==='create'){
        return (
            <div className="App" >
                <CKEditor
                    
                    editor={ ClassicEditor }
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
   
                        
                    } }
                    onChange={ ( event, editor ) => {
                        
                      const data = editor.getData();
                        props.setNotice_data(data)
  
                    } }
                    onBlur={ ( event, editor ) => {
  
                    } }
                    onFocus={ ( event, editor ) => {
  
                    } }
                  
                />
            </div>
        );

    }
    else{
        return (
            <div className="App" >
                <CKEditor
                    
                    editor={ ClassicEditor }
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                       editor.setData(props.contents);
                        
                    } }
                    onChange={ ( event, editor ) => {
                        
                      const data = editor.getData();
                        props.setNotice_data(data)
  
                    } }
                    onBlur={ ( event, editor ) => {
  
                    } }
                    onFocus={ ( event, editor ) => {
  
                    } }
                  
                />
            </div>
        );
    }

  
}