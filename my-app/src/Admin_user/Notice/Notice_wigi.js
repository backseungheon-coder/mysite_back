import ClassicEditor from "@ckeditor/ckeditor5-34.1.0-stl0r2rdr5hi";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import React, { Component,useState } from 'react';
import './Notice.scss'

export default function Notice_wigi(props) {
    

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