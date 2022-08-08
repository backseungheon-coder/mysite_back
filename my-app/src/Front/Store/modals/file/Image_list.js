import React, { useState,useRef } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Modal,Button,Form } from 'react-bootstrap';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import DeleteIcon from '@mui/icons-material/Delete';
import './css/Drag.scss'

export default function StandardImageList() {


  

  return (
    <ImageList sx={{ width: '100%', height: '100%' }} cols={4} rowHeight={148}
    
    
    >
      {itemData.map((item) => (
          
        <ImageListItem key={item.img} style={{width: '180px', height: '180px'}} >
            
          <img
         
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            classname={item.title}
            loading="lazy"
          />

            <ImageListItemBar
            
            className='button_show'
                    sx={{
                      background:
                        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                    }}
                    position="bottom"
                  
                    actionIcon={
                      <IconButton
                        sx={{ color: 'white',width: '180px',height: '180px' }}
                        onclick={(event) => event.preventDefault()}
                      >
                      <div style={{display: 'flex', justifyContent: 'space-around',width: '100%'}}>
                          <div style={{height:'100px',width:'50%'}}>
                              <ZoomOutMapIcon style={{height:'100%',width:'50%',verticalAlign: 'middle'}}/>
                          </div>
                          <div style={{height:'100px',width:'50%'}}>
                            <DeleteIcon style={{height:'100%',width:'50%',verticalAlign: 'middle'}}/>        
                          </div>
         
                      </div>
                      </IconButton>
                    }
                    actionPosition="left"
                  />


          {/*  */}
          
        </ImageListItem>

      
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
  },

];
