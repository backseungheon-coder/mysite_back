import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import axios from 'axios';
import {useSelector} from 'react-redux';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props) {
  const goturl = useSelector((state) => state);
  const [value, setValue] = React.useState(0);
  const handle = () =>{
    axios
            .post(`${goturl}/comments/`, {
                        mode:'get',
                    })
                    .then(function (response) {
                        props.setIssue(response.data)
                    })
                    .catch(function (error) {

                    });
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="메모" {...a11yProps(0)} style={{width:'50%', fontSize:'20px'}}/>
          <Tab label="특이사항" {...a11yProps(1)} style={{width:'50%', fontSize:'20px'}} 
          onClick={handle}
          />
        </Tabs>
      </Box>
      <TabPanel style={{minHeight:'500px'}} component={'span'} value={value} index={0}>
        {props.element1}
      </TabPanel>
      <TabPanel style={{minHeight:'500px'}} component={'span'} value={value} index={1}>
        {props.element2}
      </TabPanel>

    </Box>
  );
}