import React, { useState } from 'react';
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";

export default function img_List(props) {
  return (

    <Lightbox images={props.img_list} startIndex={props.startindex} onClose={() => (
        props.setMode('normal')
    )}/>
  );
}