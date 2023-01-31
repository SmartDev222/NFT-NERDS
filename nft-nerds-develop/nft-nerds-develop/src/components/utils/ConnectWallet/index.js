import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import './style.scss';

const ConnectWallet = props => {
	const [state, setState] = React.useState({
		terms: false
	  });

	const handleChange = (event) => {
		setState({
		  ...state,
		  [event.target.name]: event.target.checked,
		});
	  };
	
	const { terms } = state;

	return (
		<Box className="connect_wallet">
			<Container maxWidth="xs">
				<Box sx={{ marginTop: '40px', display: 'flex', flexDirection: 'column' }}>
					<Box sx={{marginBottom: '16px'}}>
						<Typography variant="h4" className="title">
							Connect your wallet
						</Typography>
					</Box>
					<Button variant="outlined" className="connectBtn">
						<img src="./assets/images/icons/metamask.svg" alt="symbol" height="14"/>
						<div style={{paddingLeft: '8px'}}>CONNECT</div>
					</Button>
					<Box sx={{width: '100%', marginTop: '24px', marginBottom: '40px'}}>
						<FormGroup sx={{ display: 'flex', flexFlow: 'column wrap'}}>
							<FormControlLabel control={<Checkbox checked={terms} name="terms" onChange={handleChange}/>} 
								label={<Typography className="readme">I have read,understand and agree to NFTNerd's <a href="/disclaimer" className="disclaimer">Disclaimer</a> as well as <a href="/tos" className="tos">Terms of Service and Privacy Policy</a></Typography>}
							/>
						</FormGroup>
					</Box>
					<a className="back_home_btn" href="/">GO TO HOME PAGE</a>
				</Box>
			</Container>
		</Box>
	);
};

export default ConnectWallet;
