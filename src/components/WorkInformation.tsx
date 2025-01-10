import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function SelectStatus() {
  const [status, setStatus] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ minWidth:490 }}>
        <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={status}
          onChange={handleChange}
          label="Status"
        >
          <MenuItem value={10}>Employed</MenuItem>
          <MenuItem value={20}>Un-Employed</MenuItem>
          <MenuItem value={30}>Retired</MenuItem>
          <MenuItem value={40}>Full-time Student</MenuItem>
          <MenuItem value={50}>Part-time Student</MenuItem>
        </Select>
      </FormControl>
      
    </div>
  );
}




