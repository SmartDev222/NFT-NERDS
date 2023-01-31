import React, { useState } from 'react';
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';

import { FormControl, InputLabel } from '@mui/material';

import OutlinedInput from "@mui/material/OutlinedInput";
import ListItemText from '@mui/material/ListItemText';
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Checkbox from '@mui/material/Checkbox';


import './style.scss';




const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const DetailInput = (props) => {
    const data = props.data;
    const title = props.title;
    
    
    const getInputData = props.getInputData;
    
    const [personName, setPersonName] = useState([]);
  
    const traitsDetailHandleChange = (event) => {
        const {
            target: { value }
        } = event;
        
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
        
        getInputData(title, value);
        

    };

    return(
        <>
            <FormControl className='css-tzsjye'>
                <InputLabel id="demo-multiple-checkbox-label">{title}</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={personName}
                    onChange={traitsDetailHandleChange}
                    input={<OutlinedInput label={title} />}
                    renderValue={(selected) => selected.length+" selected: "+ selected.join(', ')}
                    MenuProps={MenuProps}
                    >
                    {data.map((item, index) => (
                        <MenuItem key={index} value={item.name}>
                            <Grid container spacing={2}>
                                <Grid item xs={1}>
                                    <Checkbox style={{marginTop:-10}} checked={personName.indexOf(item.name) > -1} />
                                    
                                </Grid>
                                <Grid item xs={7}>
                                    <ListItemText primary={item.name} />
                                </Grid>
                                <Grid item xs={2}>
                                    <ListItemText primary={item.percent} />
                                </Grid>
                                <Grid item xs={2}>
                                    <ListItemText primary={item.value} />
                                </Grid>
                            </Grid>
                            
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    );
}
export default DetailInput;