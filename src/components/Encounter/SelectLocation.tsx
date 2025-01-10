import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';



const names = [
  'All over',
  'Ankle, left',
  'Ankle right',
  'Arm, left',
  'Arm, right',
  'Back',
  'Back, lower',
  'Back, upper',
  'Chest',
  'Chest, right side',
  'Chest, left side',
  'Elbow, left',
  'Elbow, right',
  'Epigastrium',
  'Ears',
  'Ear, left',
  'Ear, right',
  'Eyes',
  'Eye, left',
  'Eye, right',
  'Face',
  'Fingers',
  'Fingers, left hand',
  'Fingers, right hand',
  'Forearm, left',
  'Forearm, right',
  'Feet',
  'Foot, left',
  'Foot, right',
  'Genitals',
  'Groin',
  'Hands',
  'Hand, left',
  'Hand, right',
  'Head',
  'Head, frontal',
  'Head, occipital',
  'Head, left side',
  'Head, right side',
  'Hip',
  'Jaw',
  'Knees',
  'Knees, left',
  'Knees, right',
  'Legs',
  'Leg, left',
  'Leg, right',
  'Mouth',
  'Neck',
  'Nose',
  'Shoulders',
  'Shoulders, left',
  'Shoulders, right',
  'Skin',
  'Stomach',
  'Substemal',
  'Suprapubic',
  'Teeth',
  'Testes',
  'Thigh',
  'Throat',
  'Thumb',
  'Toes',
  'Tongue',
  'Wrist',
  'bilateral',
  'diffuse',
  'fixed',
  'generalized',
  'localized',
  'migratory',
  'unilateral',
];
         

interface SelectLocationProps {
  width?: string | number; // Optional width prop
  margin?: string | number;
}
export default function SelectLocation({ width = 240, margin = 0}: SelectLocationProps) {
  const [selectlocation, setlocation] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof selectlocation>) => {
    const {
      target: { value },
    } = event;
    setlocation(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split('|') : value,
    );
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ display: 'flex', gap: 0.5 }} >
        <InputLabel id="demo-simple-select-standard-label" >Location</InputLabel>
        <Select
          labelId="ddemo-simple-select-standard-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectlocation}
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
              <Checkbox checked={selectlocation.includes(name)} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
