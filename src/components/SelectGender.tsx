import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface SelectGenderProps {
  width?: string | number; // Optional width prop
  margin?: string | number;
}

export default function SelectGender({ width = 240, margin = 0}: SelectGenderProps) {
  const [gender, setGender] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setGender(event.target.value);
  };

  return (
    <>
      <FormControl variant="standard" sx={{m:margin, minWidth: width }}>
        <InputLabel id="demo-simple-select-standard-label">Gender</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={gender}
          onChange={handleChange}
          label="Gender"
        >
          <MenuItem value={10}>Male</MenuItem>
          <MenuItem value={20}>Female</MenuItem>
          <MenuItem value={30}>Transgender</MenuItem>
          <MenuItem value={40}>Unknown</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}
