import { Box, Link, rgbToHex, Typography } from '@mui/material';
import React, { Component } from 'react';
import './style.scss';
// import placeholderimg from './placeholder.svg';
// import openseaimg from  "./opensea_dark.svg";

const List = (props) => {
    const item = props.data;
    const index = props.index;
    console.log(item);
    return (
        <Box>
            <Box className='one-item'>
                <Box className='item-image'>
                    <Box style={{cursor: 'pointer'}}>
                        <img width="199" height="199" src={item.img} style={{maxWidth: '199px', maxHeight: '199px', objectFit: 'contain', borderRadius: '8px', verticalAlign: 'middle', visibility: 'visible'}}  />
                    </Box>
                </Box>
                <Box className='item-rank'>
                    <Typography variant='overline' className='item-num'>#{index + 1}</Typography>
                    <Box className='rank-box'>
                        <Typography variant='body2' aria-label='Rank 1814/5286, top 34%' className='rank-num' >Rank: <span style={{color: '#7fd1ff', fontWeight: '600'}}>{item.token}</span></Typography>
                    </Box>
                </Box>
                <Box className='item-owner'>
                    <Typography className='owner'>Owner:</Typography>
                    <Typography className='owner-name'>{item.owners}</Typography>
                </Box>
                <Box className='item-blank'></Box>
                <Box className='item-link'>
                    <Box className='link-box'>
                        <Link underline='always' tarket="_blank" rel='noreferrer' href='https://opensea.io/assets/0xc31085b262b3d57c649f8747e4f083685697176e/1' className='link'>
                            <img src="https://nftnerds.ai/opensea_dark.svg" height="19" />
                        </Link>
                        <Link underline='always' tarket="_blank" rel='noreferrer' href='https://opensea.io/assets/0xc31085b262b3d57c649f8747e4f083685697176e/1' className='link'>
                            <img src="	https://nftnerds.ai/looksrare_dark.svg" height="19" />
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
     
}

export default List;