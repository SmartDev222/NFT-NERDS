import { Box, Container, Link, Typography, ThemeProvider, createTheme } from '@mui/material';
import React, { Component } from 'react';
import Footer from '../../layout/Footer';
import Header from '../../layout/Header';
import './style.scss';

const theme = createTheme({
	typography: {
		fontFamily: 'Raleway, Arial',
	}
});

const faq = (props) => {
	return(
		<div>
			<Header {...props}/>
			<ThemeProvider theme={theme}>
				<Container maxWidth="md" className='faq'>
					<Box className='box'>
						<Typography variant='h5' className='box_qus'>How do you calculate the rarity?</Typography>
						<Typography variant='body2' className='box_des'>We use normalized frequencies of the token's traits.<br />This is the standard approach for calculating rarity in the NFT space.</Typography>
					</Box>
					<Box className='box'>
						<Typography variant='h5' className='box_qus'>Are the charts live, or do I need to refresh?</Typography>
						<Typography variant='body2' className='box_des'>All the charts you see on the page are live<br />No deed to refresh-it's being synced under the hood.</Typography>
					</Box>
					<Box className='box'>
						<Typography variant='h5' className='box_qus'>What features do you plan to add?</Typography>
						<Typography variant='body2' className='box_des'>There's plenty coming! Join our <Link underline='always' className='link' href='#' style={{textDecoration: 'none'}}>discord</Link> for more info.</Typography>
					</Box>
					<Box className='box'>
						<Typography variant='h5' className='box_qus'>What are the criteria for trending collections?</Typography>
						<Typography variant='body2' className='box_des'>We show most actively trading collections that reach a certain volume threshold.</Typography>
					</Box>
					<Box className='box'>
						<Typography variant='h5' className='box_qus'>Why can't I find a project?</Typography>
						<Typography variant='body2' className='box_des'>At the moment, we decide which projects to feature in YakuzaTool.<br />Join our <Link underline='always' className='link' href='#' style={{textDecoration: 'none'}}>discord</Link> to find upcoming collections or request a new one to be included.</Typography>
					</Box>
					<Box className='box'>
						<Typography variant='h5' className='box_qus'>Which chains are supported?</Typography>
						<Typography variant='body2' className='box_des'>At the moment, we support only Ethereum.<br />We'll be adding more chains in the future.</Typography>
					</Box>
					<Box className='box'>
						<Typography variant='h5' className='box_qus'>How can I get in touch with the team?</Typography>
						<Typography variant='body2' className='box_des'>You can reach us through a <Link underline='always' className='link' href='#' style={{textDecoration: 'none'}}>Twitter</Link> DM or in our <Link underline='always' className='link' href='#' style={{textDecoration: 'none'}}>discord</Link> server.</Typography>
					</Box>
					<Box className='box'>
						<Typography variant='h5' className='box_qus'>Who are you?</Typography>
						<Typography variant='body2' className='box_des'>Mathematicians and coders who aspire to create the best tool in the NFT space.</Typography>
					</Box>
				</Container>
			</ThemeProvider>
			<Footer/>
		</div>
	);
}

export default faq;