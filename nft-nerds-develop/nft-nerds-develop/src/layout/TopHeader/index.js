import React, { useEffect, useState } from 'react';
import { Button, Grid, Box, Typography } from '@mui/material';

//css
import './style.scss';

const TopHeader = (props) => {
    
    return(
        <>
            <Box className='top-header-box'>
                <Box className='top-header-box-in'>
                    <Typography className='top-header-title' variant='span' >FOR FULL ACCESS, UNLOCK PREMIUM.</Typography>
                    <Box className='top-header-btns'>
                        <Box className='get-1month-btn-box'>
                            <Button className="get-1month-btn">
                                Get 1 month (Ξ0.15)<Typography component="span" className='get-month-span'></Typography>
                            </Button>    
                        </Box>
                        <Button className='get-6month-btn'>
                            Get 6 months (Ξ0.5)
                            <Typography component="span" className='get-month-span'></Typography>
                        </Button>
                    </Box>
                </Box>
                
            </Box>
        </>
    );
   
}
export default TopHeader