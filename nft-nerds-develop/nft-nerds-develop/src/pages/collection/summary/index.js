import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';

import './style.scss';
import TradesChart from "../../../components/utils/tradesChart";
import RarityChart from "../../../components/utils/RarityChart";

const Summary = () => {

    return(
        <Box className="summary_container">
            <TradesChart/>
            <RarityChart/>
        </Box>
    );
}
export default Summary;