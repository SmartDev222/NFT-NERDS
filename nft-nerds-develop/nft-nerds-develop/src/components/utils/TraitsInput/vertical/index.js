import React, { useState } from "react";
import {
	Box, Paper, Typography, InputBase, 
	TextField, Grid, Button, ToggleButton, 
	Input, FormControl, Select, InputLabel,
	MenuItem, OutlinedInput, Switch, SvgIcon
} from "@mui/material";
// import Grid from '@mui/material/Grid';

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


const VerticalTraitsInput = (props) => {

    const [traitsBtnSelected, setTraitsBtnSelected] = useState(false);
    return(
        <>
            <Box className='vertical-traits-container'>
				<Paper className="traits_paper" elevation={2}>
					<Box className="traits_content_container">
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
        </>
    );
}
export default VerticalTraitsInput;
