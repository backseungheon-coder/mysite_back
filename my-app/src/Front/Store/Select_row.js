import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function BasicSelect() {
  const [id, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
   
      <FormControl sx={{m:1.2 , width:"50%"}}>
        <InputLabel id="demo-simple-select-label">가맹점 등록</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={id}
          label="가맹점 등록"
          onChange={handleChange}
        >
          <MenuItem value='1'>테스트 대리점1</MenuItem>
          <MenuItem value='2'>테스트 대리점2</MenuItem>
          <MenuItem value='3'>테스트 대리점3</MenuItem>
        </Select>
      </FormControl>

  );
}