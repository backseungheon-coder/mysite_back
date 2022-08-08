import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './Acco.scss';
import FAQ_modal_edit from './FAQ_modal_edit'
import {useSelector} from 'react-redux';


export default function SimpleAccordion(props) {
  return (
        <>

    <Accordion sx={{marginTop:'10px'}} className="AccordionSummary">
        <AccordionSummary
        className='AccorBox'
          expandIcon={<ExpandMoreIcon sx={{color:'#0D99FF'}}/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
            <div style={{display: 'flex', flexDirection: 'row',alignItems: 'center'}}>
                <Typography sx={{fontSize:'30px',color:'#0D99FF'}}>Q.</Typography>
                <div style={{fontSize:'10px',marginLeft:'15px'}}>
                    {props.quest}
                   
                </div>
            </div>

        </AccordionSummary>
        <AccordionDetails>
            <div style={{display: 'flex', flexDirection: 'row',alignItems: 'center',marginLeft: '30px',justifyContent: 'space-between'}}>
                <div style={{display: 'flex'}}>
                    <Typography sx={{fontSize:'30px',color:'#0D99FF'}}>A.</Typography>
                    <div style={{fontSize:'10px',marginLeft:'15px',display:'flex',alignItems:'center'}}>
                        {props.con}
                    </div>
                </div>
                <FAQ_modal_edit setloadstate={props.setloadstate} id={props.id} faq_title={props.quest} contents={props.con} faq_catego={props.faq_catego} visdis={props.visdis}/>
                
            </div>
        </AccordionDetails>
    </Accordion>     

        </>
  );
}
