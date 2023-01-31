import { DialogContent, Grid } from '@mui/material';
import React, { Component } from 'react';
import { makeStyles } from '@mui/material';
import './style.scss'
import { display } from '@mui/system';
import unDrawSearching from '../../assets/undraw_searching.svg';
import Footer from '../../layout/Footer';
import Header from '../../layout/Header';

const asset = (props) => {
	return (
		<div>
			<Header {...props}/>
			<Grid container className='asset' direction="column">
				<Grid item xs={12} alignItems="center">
					<div className='header_title'>
						<span className='title'>Paste OpenSea asset URL</span>
					</div>
				</Grid>
				<Grid item xs={12}>
					<div className='body_search'>
						<input type='text' placeholder='paste OpenSea link to asset here...' className='search' />
					</div>
				</Grid>
				<Grid item xs={12}>
					<div className='no_search'>
						<img src={unDrawSearching} alt='no_search' style={{width: '320px'}} />
					</div>
				</Grid>
			</Grid>
			<Footer/>
		</div>
	);
}

export default asset;