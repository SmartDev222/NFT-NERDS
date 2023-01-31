import React, { useState } from "react";
import {
	Box, Paper, Typography, InputBase, 
	TextField, Grid, Button, ToggleButton, 
	Input, FormControl, Select, InputLabel,
	MenuItem, OutlinedInput, Switch, SvgIcon
} from "@mui/material";
// import Grid from '@mui/material/Grid';

import CustomizedSelect from '../../../components/utils/CustomizedSelect';
import ListItem from '../../../components/tokenCard'
import './style.scss';
// import { Grid } from "swiper";



const TriatsInputStyle = {
	width: "70px",
	fontSize: "13px",
	fontWeight: 600,
	backgroundColor: "rgb(38, 38, 51)",
	padding: "20px 14px",
	borderRadius: "5px"
}



const Tokens = () => {
	const [ data ] = useState(
		[
			{
				title: "Hamlet Contemplates Yorick's Yorick's",
				token: '1814',
				owners: '3.3k',
				img: 'https://lh3.googleusercontent.com/F2_g7GeMvhNbOU-uO33L1GHtfC7C04Rva3Rjlc2fTdm7yWE23_HNBB2Li2x7PdvWPVfD7DZHwGTth5Pyt3HfDJMt6Oku4dS4WRP2HA=s120'
			},
			{
				title: "Hamlet Contemplates Yorick's Yorick's",
				token: '1814',
				owners: '3.3k',
				img: 'https://lh3.googleusercontent.com/F2_g7GeMvhNbOU-uO33L1GHtfC7C04Rva3Rjlc2fTdm7yWE23_HNBB2Li2x7PdvWPVfD7DZHwGTth5Pyt3HfDJMt6Oku4dS4WRP2HA=s120'
			},
			{
				title: "Hamlet Contemplates Yorick's Yorick's",
				token: '1814',
				owners: '3.3k',
				img: 'https://lh3.googleusercontent.com/F2_g7GeMvhNbOU-uO33L1GHtfC7C04Rva3Rjlc2fTdm7yWE23_HNBB2Li2x7PdvWPVfD7DZHwGTth5Pyt3HfDJMt6Oku4dS4WRP2HA=s120'
			},
			{
				title: "Hamlet Contemplates Yorick's Yorick's",
				token: '1814',
				owners: '3.3k',
				img: 'https://lh3.googleusercontent.com/F2_g7GeMvhNbOU-uO33L1GHtfC7C04Rva3Rjlc2fTdm7yWE23_HNBB2Li2x7PdvWPVfD7DZHwGTth5Pyt3HfDJMt6Oku4dS4WRP2HA=s120'
			},
			{
				title: "Hamlet Contemplates Yorick's Yorick's",
				token: '1814',
				owners: '3.3k',
				img: 'https://lh3.googleusercontent.com/F2_g7GeMvhNbOU-uO33L1GHtfC7C04Rva3Rjlc2fTdm7yWE23_HNBB2Li2x7PdvWPVfD7DZHwGTth5Pyt3HfDJMt6Oku4dS4WRP2HA=s120'
			},
			{
				title: "Hamlet Contemplates Yorick's Yorick's",
				token: '1814',
				owners: '3.3k',
				img: 'https://lh3.googleusercontent.com/F2_g7GeMvhNbOU-uO33L1GHtfC7C04Rva3Rjlc2fTdm7yWE23_HNBB2Li2x7PdvWPVfD7DZHwGTth5Pyt3HfDJMt6Oku4dS4WRP2HA=s120'
			},
			{
				title: "Hamlet Contemplates Yorick's Yorick's",
				token: '1814',
				owners: '3.3k',
				img: 'https://lh3.googleusercontent.com/F2_g7GeMvhNbOU-uO33L1GHtfC7C04Rva3Rjlc2fTdm7yWE23_HNBB2Li2x7PdvWPVfD7DZHwGTth5Pyt3HfDJMt6Oku4dS4WRP2HA=s120'
			},
			{
				title: "Hamlet Contemplates Yorick's Yorick's",
				token: '1814',
				owners: '3.3k',
				img: 'https://lh3.googleusercontent.com/F2_g7GeMvhNbOU-uO33L1GHtfC7C04Rva3Rjlc2fTdm7yWE23_HNBB2Li2x7PdvWPVfD7DZHwGTth5Pyt3HfDJMt6Oku4dS4WRP2HA=s120'
			},
			{
				title: "Hamlet Contemplates Yorick's Yorick's",
				token: '1814',
				owners: '3.3k',
				img: 'https://lh3.googleusercontent.com/F2_g7GeMvhNbOU-uO33L1GHtfC7C04Rva3Rjlc2fTdm7yWE23_HNBB2Li2x7PdvWPVfD7DZHwGTth5Pyt3HfDJMt6Oku4dS4WRP2HA=s120'
			},
			{
				title: "Hamlet Contemplates Yorick's Yorick's",
				token: '1814',
				owners: '3.3k',
				img: 'https://lh3.googleusercontent.com/F2_g7GeMvhNbOU-uO33L1GHtfC7C04Rva3Rjlc2fTdm7yWE23_HNBB2Li2x7PdvWPVfD7DZHwGTth5Pyt3HfDJMt6Oku4dS4WRP2HA=s120'
			},
			{
				title: "Hamlet Contemplates Yorick's Yorick's",
				token: '1814',
				owners: '3.3k',
				img: 'https://lh3.googleusercontent.com/F2_g7GeMvhNbOU-uO33L1GHtfC7C04Rva3Rjlc2fTdm7yWE23_HNBB2Li2x7PdvWPVfD7DZHwGTth5Pyt3HfDJMt6Oku4dS4WRP2HA=s120'
			},
			{
				title: "Hamlet Contemplates Yorick's Yorick's",
				token: '1814',
				owners: '3.3k',
				img: 'https://lh3.googleusercontent.com/F2_g7GeMvhNbOU-uO33L1GHtfC7C04Rva3Rjlc2fTdm7yWE23_HNBB2Li2x7PdvWPVfD7DZHwGTth5Pyt3HfDJMt6Oku4dS4WRP2HA=s120'
			},
			{
				title: "Hamlet Contemplates Yorick's Yorick's",
				token: '1814',
				owners: '3.3k',
				img: 'https://lh3.googleusercontent.com/F2_g7GeMvhNbOU-uO33L1GHtfC7C04Rva3Rjlc2fTdm7yWE23_HNBB2Li2x7PdvWPVfD7DZHwGTth5Pyt3HfDJMt6Oku4dS4WRP2HA=s120'
			},
			{
				title: "Hamlet Contemplates Yorick's Yorick's",
				token: '1814',
				owners: '3.3k',
				img: 'https://lh3.googleusercontent.com/F2_g7GeMvhNbOU-uO33L1GHtfC7C04Rva3Rjlc2fTdm7yWE23_HNBB2Li2x7PdvWPVfD7DZHwGTth5Pyt3HfDJMt6Oku4dS4WRP2HA=s120'
			},
			{
				title: "Hamlet Contemplates Yorick's Yorick's",
				token: '1814',
				owners: '3.3k',
				img: 'https://lh3.googleusercontent.com/F2_g7GeMvhNbOU-uO33L1GHtfC7C04Rva3Rjlc2fTdm7yWE23_HNBB2Li2x7PdvWPVfD7DZHwGTth5Pyt3HfDJMt6Oku4dS4WRP2HA=s120'
			},
		]
	);
	const [traitsBtnSelected, setTraitsBtnSelected] = React.useState(false);
	const [interval, setInterval] = React.useState(1);
	const [mine, setMine] = React.useState(false);
	const [buynow, setBuynow] = React.useState(false);

	const handleMineChange = (event) => {
        setMine(event.target.checked);
    };
	const handleBuynowChange = (event) => {
        setBuynow(event.target.checked);
    };
	const handleIntervalChange = (event) => {
		setInterval(event.target.value);
	};

	const intervalOptions = [
		{value: 1, text: 'price'},
		{value: 2, text: 'tokenID'},
		{value: 3, text: 'rank'}
	];

	return(
		<Box className="traits-container">
			<Box>
				<Paper className="traits_paper" elevation={2}>
					<Box className="traits_context_container">
						<Box component="form" action="#">
							<Box className="main_input_container">
								<Box className="price_container">
									<Box className="price_in_container">
										<Typography className="price_text" component="span">PRICE</Typography>
										<Box className="price_input_container">
											<Box className="price_min">
												<Box className="traits_input_container">
													<input  className="traits_input" style={TriatsInputStyle} placeholder="Min Price..." type="text"></input>
												</Box>
											</Box>
											<Box className="price_max">
												<Box className="traits_input_container">
													<input className="traits_input" style={TriatsInputStyle}  placeholder="Max Price..." type="text" ></input>
												</Box>
											</Box>
										</Box>
											
									</Box>
								</Box>
								<Box className="price_container">
									<Box className="price_in_container">
										<Typography className="price_text" component="span">Rank</Typography>
										<Box className="price_input_container">
											<Box className="price_min">
												<Box className="traits_input_container">
													<input  className="traits_input" style={TriatsInputStyle} placeholder="Min Rank..." type="text"></input>
												</Box>
											</Box>
											<Box className="price_max">
												<Box className="traits_input_container">
													<input className="traits_input" style={TriatsInputStyle}  placeholder="Max Rank..." type="text"  ></input>
												</Box>
											</Box>
										</Box>
											
									</Box>
								</Box>
								<Box className="price_container">
									<Box className="price_in_container">
										<Typography className="price_text" component="span">Token id</Typography>
										<Box className="price_input_container">
											<Box className="price_min">
												<Box className="traits_input_container">
													<input  className="traits_input" style={TriatsInputStyle} placeholder="tokenIdMin..." type="text"></input>
												</Box>
											</Box>
											<Box className="price_max">
												<Box className="traits_input_container">
													<input className="traits_input" style={TriatsInputStyle}  placeholder="tokenIdMax..." type="text"  ></input>
												</Box>
											</Box>
										</Box>
											
									</Box>
								</Box>
								<Box className="buttons">
									<ToggleButton value="check" className="traits_btn" selected={traitsBtnSelected} onChange={()=>{setTraitsBtnSelected(!traitsBtnSelected)}}>
										<Box className="traits_btn_context">
											<Box>TRAITS</Box>
										</Box>
									</ToggleButton>
									<ToggleButton value="check" className="traits_btn" selected={traitsBtnSelected} onChange={()=>{setTraitsBtnSelected(!traitsBtnSelected)}} disabled>
										<Box className="traits_btn_context">
											<Box>SAVE</Box>
										</Box>
									</ToggleButton>
								</Box>
							</Box>
						</Box>
					</Box>
				</Paper>
			</Box>
			<Box className="result">
				<Box className="setting_bar">
					<Box className="sort_setting">
						<Typography variant="body1" className="typograph">Sort by:</Typography>
						<Box className="select-box">
							<CustomizedSelect value={interval} onChange={handleIntervalChange} options={intervalOptions} />
						</Box>
					</Box>
					<Box className="switch-box">
						<FormControl className="outliers-box">
							<Box>
								<Typography variant='p' className="q-label">MINE ONLY</Typography>
								<Switch
									checked={mine}
									onChange={handleMineChange}
									inputProps={{ 'aria-label': 'controlled' }}
								/>
							</Box>
						</FormControl>
					</Box>
					<Box className="switch-box">
						<FormControl className="outliers-box">
							<Box>
								<Typography variant='p' className="q-label">BUY NOW</Typography>
								<Switch
									checked={buynow}
									onChange={handleBuynowChange}
									inputProps={{ 'aria-label': 'controlled' }}
								/>
							</Box>
						</FormControl>
					</Box>
					<Box className="refresh-box">
						<Box className="refresh-svg">
							<SvgIcon color="success" fontSize="small">
								<path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"></path>
							</SvgIcon>
						</Box>
						<Typography variant="caption" className="refresh-span">Auto-refresh is on</Typography>
					</Box>
				</Box>
				<Box className="res_list">
					<Grid container spacing={2} className="list-grid">
						{data.map((item, index) => (
							<Grid item md={3} sm={6}>
								<ListItem key={index} index={index} data={item} />
							</Grid>
						))}
						
					</Grid>
				</Box>
			</Box>
			
		</Box>
	);
}
export default Tokens;