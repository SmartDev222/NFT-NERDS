import React, { useState } from 'react';
import { Box, Button, Paper, Modal } from '@mui/material';
import './style.scss';

const SignOutModal = props => {
    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
        <Box>
            <Box className='signout-content'>
                <Paper className=''/>
                <Box className='btn_group'>
                    <Button variant='outlined' size='medium' color='error' className='signoutBtn'onClick={props.handleSignOut}>Sign out</Button>
                    <Button variant='contained' size='medium' color='primary' className='closeBtn' onClick={props.handleClose}>Close</Button>
                </Box>
                <Box className='address_box'>
                    <span>{props.address}</span>
                </Box>
            </Box>
        </Box>
        </Modal>    
    );
}

export default SignOutModal;