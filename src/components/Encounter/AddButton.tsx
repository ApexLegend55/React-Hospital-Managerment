import React, { useState } from 'react';
import { IconButton, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'; // Import the Add icon
import {  
    FormControlLabel,
    FormControl,
    Checkbox,
    Grid,
    Avatar,
    Input,
    InputAdornment,
    OutlinedInput
  } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';


interface AddableComponentProps {
  id: number;
}

const AddableComponent: React.FC<AddableComponentProps> = ({ id }) => {
  return (
    <Paper elevation={1} style={{ padding: 16, margin: 8 }}>
      <Grid container spacing={2}>                                                                      
            <Grid item xs={2} sm={2} md={2}>
            <FormControl fullWidth  variant="standard">                                
                <Input
                    id="standard-adornment-amount"
                    startAdornment={<InputAdornment position="start">Code:</InputAdornment>}
                />
            </FormControl>
            </Grid> 
            <Grid item xs={9} sm={9} md={9}>
            <FormControl fullWidth  variant="standard">                                
                <Input
                id="standard-adornment-amount"
                startAdornment={<InputAdornment position="start">Desc:</InputAdornment>}
                />
            </FormControl>                                                        
            </Grid>  
            <Grid item xs={1} sm={1} md={1}>
            <IconButton  color="inherit">
                <DeleteIcon />
            </IconButton>                                                      
            </Grid>                                                          
        </Grid>
    </Paper>
  );
};

const AddingExample: React.FC = () => {
  const [components, setComponents] = useState<AddableComponentProps[]>([{ id: 1 }]);

  const handleAdd = () => {
    const nextId = components.length + 1;
    setComponents([...components, { id: nextId }]);
  };

  return (
    <div>
        {components.map((component) => (
          <AddableComponent key={component.id} id={component.id} />   
          
        ))}
      <IconButton onClick={handleAdd} color="primary">
        <AddIcon />        
      </IconButton>
      <button>cmd</button>
      <div>
      </div>
    </div>
  );
};

export default AddingExample;