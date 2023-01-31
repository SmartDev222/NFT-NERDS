import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, Modal, SvgIcon, InputBase, Typography, Checkbox } from '@mui/material';
import './style.scss';

const FilterModal = props => {
    const filterValue = props.filter;
    const getFilterValue = props.getFilterValue;
    const [isListing, setIsListing] = useState(false);
    const [isTrades, setIsTrades] = useState(false);

    const clear = () => {
        setIsListing(false);
        setIsTrades(false);
    }

    const reset = () => {
        setFilter();
    }
    const setFilter = () => {
        if(filterValue == 'both') {
            setIsListing(true);
            setIsTrades(true);
        }
        else {
            if(filterValue == "item_listed") setIsListing(true);
            else setIsListing(false);
            if(filterValue == "item_sold") setIsTrades(true);
            else setIsTrades(true);
        }
    }
    const handleCheckbox = (e) => {
        
        const name = e.target.value;
        const checked = e.target.checked;
        if(name == 'isListing') setIsListing(checked);
        else setIsTrades(checked);

    }

    useEffect(() => {
        setFilter();
    },[])

	return (
        <Modal className='css-8ndowl' open={props.open} onClose={props.onClose}>
            <Box className='css-2meek2' tabIndex="-1">
                <Box className='css-j7qwjs'>
                    <Box className='css-jj7qqp'>
                        <Typography variant='h5' className='css-1k3est7'>
                            Filter by
                        </Typography>
                        <SvgIcon onClick={props.onClose} className="css-s6jlyw" fontSize="medium" focusable="false" viewBox="0 0 24 24" aria-hidden="true" data-testid="CloseIcon">
                            <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </SvgIcon>
                    </Box>
                    <Paper className='css-1ro9fl1'>
                        <Box className='css-hpgf8j'>
                            <Box className='css-1nnw2ij'>
                                <Typography variant='overline' className='css-1dz37nv'>Event type</Typography>
                                <Box className='css-k008qs'>
                                    <Box className='css-1iwhrk2'>
                                        <Box className='css-irtagd'>
                                            <Checkbox color='primary' className='css-x4wcd9' value="isListing" checked={isListing} onChange={(e) => handleCheckbox(e)}/>
                                            <Typography variant='overline' className='css-9jicix'>Listings</Typography>
                                        </Box>
                                    </Box>
                                    <Box className='css-1iwhrk2'>
                                        <Box className='css-irtagd'>
                                            <Checkbox color='primary' className='css-x4wcd9' value="isTrades" checked={isTrades} onChange={(e) => handleCheckbox(e)}/>
                                            <Typography variant='overline' className='css-9jicix'>Trades</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                    <Paper variant='rounded' elevation={2} className='css-1csa03x'>
                        <Box className='css-hpgf8j'>
                            <Box className='css-j7qwjs'>
                                <Box className='css-pxz4hp'>
                                    <Typography variant='overline' className='css-iabhyu'>Collections</Typography>
                                    <Box>
                                        <Box sx={{ position: 'relative', display: 'inline-block' }}>
                                            <InputBase
                                                id="filled-search"
                                                placeholder="Search by address, name or slug..."
                                                type="search"
                                                style={{ fontSize: "13px", fontWeight: 600, height: "6px", backgroundColor: "rgb(38, 38, 51)", borderWidth: "0px", padding: "14px", borderRadius: "4px" }}
                                                className='css-1e00h5i'
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                                <Box>
                                    <Box className='css-1g1z99s'>
                                        <Typography variant='caption' className='css-10snf7b'>No collections selected (will accept events from any collection)</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                    <Box className='css-1m9fqvd'>
                        <Button variant='outlined' size='medium' color='error' className='css-1ocwypl' onClick={clear}>Clear</Button>
                        <Button variant='outlined' size='medium' color='primary' className='css-fel3qj' onClick={reset}>Reset</Button>
                        <Button variant='contained' size='medium' color='primary' className='css-1clr4rj' onClick={() => getFilterValue(isListing, isTrades)}>Save</Button>
                    </Box>
                </Box>
            </Box>
        </Modal>     
	);
};

export default FilterModal