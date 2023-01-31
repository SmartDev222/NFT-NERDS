import React, { useState } from 'react';
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { ToggleButton, ToggleButtonGroup, FormControl, InputLabel } from '@mui/material';

import OutlinedInput from "@mui/material/OutlinedInput";
import ListItemText from '@mui/material/ListItemText';
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Checkbox from '@mui/material/Checkbox';

import DetailInput from '../detailInput';

import './style.scss';

const TriatsInputStyle = {
    width: "70px",
    fontSize: "13px",
    fontWeight: 600,
    backgroundColor: "rgb(38, 38, 51)",
    padding: "20px 14px",
    borderRadius: "5px"
}

const listContainerStyle = {
    boxSizing: "border-box",
    direction: "ltr",
    height: "873px",
    position: "relative",
    width: "292px",
    willChange: "transform",
    overflow: "auto"
}

const listStyle = {
    width: "auto",
    height: "3000px",
    maxWidth: "292px",
    maxHeight: "3000px",
    overflow: "hidden",
    position: "relative"
}



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
const backgroundData = [
    {
        name: 'Joys',
        percent: '0.22%',
        value: 'Ξ0.32'
    },
    {
        name: 'Golden Glow',
        percent: '2.6%',
        value: 'Ξ0.6'
    },
    {
        name: 'Wide Eyed',
        percent: '3.41%',
        value: 'Ξ0.8'
    },
    {
        name: 'Closed',
        percent: '2.2%',
        value: 'Ξ0.5'
    },
    {
        name: 'White Glow',
        percent: '3.6%',
        value: 'Ξ0.9'
    }
]





const HorizontalTraitsInput = (props) => {

   
    const [personName, setPersonName] = useState([]);
  
    const traitsDetailHandleChange = (event) => {
      const {
        target: { value }
      } = event;
      setPersonName(
        // On autofill we get a stringified value.
        typeof value === "string" ? value.split(",") : value
      );
    };

    const [traitsBtnSelected, setTraitsBtnSelected] = useState(false);
    const [saveFlag, setSaveFlag] = useState(false);

    const [logicMode, setLogicMode] = useState('or');

    const logicHandleChange = (event, mode) => {
        setLogicMode(mode);
    };

    const getInputData = (key, data) =>  {
        console.log('==============', key, data);
    }

    const traitsDataArray = {
        general:{
            price: {
                min: '',
                max: ''
            },
            rank: {
                min: '',
                max: ''
            },
            tokenId: {
                min: '',
                max: ''
            }
        },
        detail: [
            {
                key: 'Background',
                value: backgroundData
            },
            {
                key: 'Eyes',
                value: backgroundData
            },
            {
                key: 'Background',
                value: backgroundData
            },
            {
                key: 'Eyes',
                value: backgroundData
            },
            {
                key: 'Background',
                value: backgroundData
            },
            {
                key: 'Eyes',
                value: backgroundData
            },
            {
                key: 'Background',
                value: backgroundData
            },
            {
                key: 'Eyes',
                value: backgroundData
            }
        ]

    }
        
    return(
        <>
            <Box className='horizontal-traits-input-container'>
                <Box className="traits_container">
                    <Paper className="traits_paper" elevation={3}>
                        <Box className="traits_context_container">
                            <Box className='traits_form' component="form" action="#">
                                <Box className="main_input_container">
                                    <ToggleButton value="check" className="traits_btn" selected={traitsBtnSelected} onChange={()=>{setTraitsBtnSelected(!traitsBtnSelected)}}>
                                        <Box className="traits_btn_content">
                                            <Box>TRAITS</Box>
                                        </Box>
                                    </ToggleButton>
                                    <Box className="price_container">
                                        <Box className="price_in_container">
                                            <Typography className="price_text" component="span">PRICE</Typography>
                                            <Box className="price_input_container">
                                                <Box className="price_min">
                                                    <Box className="triats_input_container">
                                                        <input  className="traits_input" style={TriatsInputStyle} placeholder="Min Price..." type="text"></input>
                                                    </Box>
                                                </Box>
                                                <Box className="price_min">
                                                    <Box className="triats_input_container">
                                                        <input className="traits_input" style={TriatsInputStyle}  placeholder="Max Price..." type="text"  ></input>
                                                    </Box>
                                                </Box>
                                            </Box>
                                            
                                        </Box>
                                    </Box>
                                    <Box className="price_container">
                                        <Box className="price_in_container">
                                            <Typography className="price_text" component="span">RANK</Typography>
                                            <Box className="price_input_container">
                                                <Box className="price_min">
                                                    <Box className="triats_input_container">
                                                        <input  className="traits_input" style={TriatsInputStyle} placeholder="Min Price..." type="text"></input>
                                                    </Box>
                                                </Box>
                                                <Box className="price_max">
                                                    <Box className="triats_input_container">
                                                        <input className="traits_input" style={TriatsInputStyle}  placeholder="Max Price..." type="text"  ></input>
                                                    </Box>
                                                </Box>
                                            </Box>
                                            
                                        </Box>
                                    </Box>
                                    <Box className="price_container">
                                        <Box className="price_in_container">
                                            <Typography className="price_text" component="span">TOKEN ID</Typography>
                                            <Box className="price_input_container">
                                                <Box className="price_min">
                                                    <Box className="triats_input_container">
                                                        <input  className="traits_input" style={TriatsInputStyle} placeholder="Min Price..." type="text"></input>
                                                    </Box>
                                                </Box>
                                                <Box className="price_max">
                                                    <Box className="triats_input_container">
                                                        <input className="traits_input" style={TriatsInputStyle}  placeholder="Max Price..." type="text"  ></input>
                                                    </Box>
                                                </Box>
                                            </Box>
                                            
                                        </Box>
                                    </Box>
                                    <Box className="save_btn_box">
                                        <Button className="save_btn" disabled={!saveFlag}>SAVE</Button>
                                        { saveFlag && <Button className="reset_btn">RESET</Button>}
                                    </Box>
                                </Box>
                                {
                                    traitsBtnSelected && (
                                        <Box className='detail-inputs-container'>
                                            <Box>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12}>
                                                        <Box className='traits-css-rfflpl'>
                                                            <Typography className='traits-css-1vp9fvg' component='p'>Trait type combination:</Typography>
                                                            <ToggleButtonGroup
                                                                className='traits-css-1iaikj'
                                                                color="primary"
                                                                value={logicMode}
                                                                exclusive
                                                                onChange={logicHandleChange}
                                                                >
                                                                <ToggleButton className='traits-css-1yqurw8' value="or">LOGICAL OR</ToggleButton>
                                                                <ToggleButton className='traits-css-1yqurw8' value="and">LOGICAL AND</ToggleButton>
                                                            </ToggleButtonGroup>

                                                        </Box>
                                                    </Grid>
                                                    {   
                                                        traitsDataArray.detail.map((item, index) => (
                                                            <Grid item xs={12} lg={6} xl={4}>
                                                                <Box className='css-hboir5'>
                                                                    <Box className='css-1d3en8a'>
                                                                        <DetailInput key={index} title={item.key} data={item.value} getInputData={getInputData}/>
                                                                    </Box>
                                                                </Box>
                                                            </Grid>
                                                        )) 
                                                    }
                                                    
                                                </Grid>        
                                            </Box>
                                        </Box>
                                    )
                                }
                                
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </>
    );
}
export default HorizontalTraitsInput;
