import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';



const names = [
  'Burning',
  'Cramping',
  'Crushing',
  'Dull',
  'Fullness',
  'Pressure',
  'Pressure sensation',
  'Plusation',
  'Radiating',
  'Sharp',
  'Shooting',
  'Stabbing',
  'Tender',
  'Throbbing',
  'Vague',
  '',
  'acute',
  'chronic',
  'constant',
  'deep',
  'improving',
  'intermittent',
  'lessening',
  'same as prior',
  'stable',
  'superficial',
  'unchanged',
  'worsening',
];
         

interface SelectQualityProps {
  width?: string | number; // Optional width prop
  margin?: string | number;
}
export default function SelectQuality({ width = 240, margin = 0}: SelectQualityProps) {
  const [selectquality, setquality] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof selectquality>) => {
    const {
      target: { value },
    } = event;
    setquality(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ display: 'flex', gap: 0.5 }} >
        <InputLabel id="demo-simple-select-standard-label"  >Quality</InputLabel>
        <Select
          labelId="ddemo-simple-select-standard-label"
          id="demo-multiple-checkbox"
          multiple          
          value={selectquality}
          onChange={handleChange}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Placeholder</em>;
            }

            return selected.join(' | ');
          }}             
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={selectquality.includes(name)} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
