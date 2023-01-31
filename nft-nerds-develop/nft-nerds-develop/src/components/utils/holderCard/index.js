import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';

import './style.scss';

const HolderCard = props => {
    const index = props.index;

    return (
        <Box className="css-zoser8" sx={{ height: "76px", left: "0px", position: "absolute", top: index*76, width: "100%" }}>
            <Box className="css-q5daxs">
                <Box className="css-1week56">
                    <Typography variant="body1" className="css-h10dot">0xef9…a9300</Typography>
                    <Box className="css-0">
                        <a className="css-1vbae4g" target="_blank" rel="noreferrer" href="https://opensea.io/0xef9497439548c5967b179d80a49e829efa2a9300">
                            <img src="assets/images/icons/opensea_dark.svg" alt="" height="16" />
                        </a>
                        <a className="css-6jpeea" target="_blank" rel="noreferrer" href="https://etherscan.io/address/0xef9497439548c5967b179d80a49e829efa2a9300">
                            <img src="assets/images/icons/etherscan.svg" alt="" height="16" />
                        </a>
                    </Box>
                </Box>
                <Box className="css-mrxdtu">
                    <Typography variant="body1" className="css-1dqdia6">2500</Typography>
                    <Typography variant="body1" className="css-c6i5lh">top 2</Typography>
                </Box>
                <Box className="css-ydkif2">
                    <Typography variant="body1" className="css-1la04yn">21%</Typography>
                    <Box className="css-8atqhb">
                        <LinearProgress color='primary' variant='determinate' className="css-3ruqx5" value={21} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default HolderCard