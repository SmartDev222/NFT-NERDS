import * as React from 'react';
import {SvgIcon} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import './style.scss';

const DefaultSnakeBar = props => {
    const {open, handleClose, vertical, horizontal} = props;

    const action = (
        <SvgIcon onClick={handleClose}>
            <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
        </SvgIcon>
    );

    return (
        <Snackbar
            className="default-snake-bar"
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={handleClose}
            message="To use YakuzaTool, please install MetaMask"
            key={vertical + horizontal}
            action={action}
            autoHideDuration={4000}
        />
    );
}

export default DefaultSnakeBar;