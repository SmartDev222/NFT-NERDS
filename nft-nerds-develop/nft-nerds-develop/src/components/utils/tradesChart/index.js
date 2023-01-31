import React from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { Box, FormControl, Typography, Select, MenuItem, Switch } from '@mui/material';
import './style.scss';
import CustomizedSelect from '../CustomizedSelect';
import StyledSelect from '../../form';

const background = "#0a0522";

const options = {
    title: {
      text: 'Trades',
      align: 'left',
      style: {
        color: "#8686A0",
        fontSize: "24px",
        textTransform: "uppercase",
        fontWeight: "400",
        lineHeight: "24px"
      }
    },
    series: [
        {
            type: 'scatter',
            color: 'rgba(220, 92, 112, 0.8)',
            data: [1, 2, 1, 4, 3, 6, 7, 3, 8, 6, 9]
        },
        {
            type: 'scatter',
            color: 'rgba(127, 209, 255, 0.8)',
            data: [10, 32, 21, 41, 13, 26, 17, 31, 18, 26, 39]
        },
        {
            type: 'scatter',
            color: 'rgba(164, 141, 255, 0.8)',
            data: [120, 312, 26, 49, 63, 56, 37, 21, 19, 56, 49]
        },
    ],
    chart: {
        backgroundColor: background
    },
    yAxis: {
        title: {
            text: 'price in eth',
            style: {
                color: "#7D7D9D",
                fontSize: "14px",
                textTransform: "uppercase",
                fontFamily: "Zen Kurenaido",
            }
        }
    }
  }

const TradesChart = props => {
    const [interval, setInterval] = React.useState(1);
    const [span, setSpan] = React.useState(15);
    const [outliers, setOutliers] = React.useState(true);

    const handleIntervalChange = (event) => {
        setInterval(event.target.value);
    };

    const handleSpanChange = (event) => {
        setSpan(event.target.value);
    }

    const handleOutliersChange = (event) => {
        setOutliers(event.target.checked);
    };

    const intervalOptions = [
        {value: 1, text: '1M'},
        {value: 5, text: '5M'},
        {value: 30, text: '30M'},
        {value: 60, text: '1H'},
        {value: 240, text: '4M'},
        {value: 1440, text: '1D'}
    ];

    const spanOptions = [
        {value: 15, text: '15M'},
        {value: 60, text: '1H'},
        {value: 240, text: '4H'},
        {value: 720, text: '12H'},
        {value: 1440, text: '1D'},
        {value: 4320, text: '3D'},
        {value: 10080, text: '7D'},
        {value: 20160, text: '14D'},
        {value: 43200, text: '30D'},
        {value: 86400, text: '60D'},
    ];
    return (
        <Box className="trades-chart">
            <Box>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />
            </Box>
            <Box className="data-controls">
                <FormControl className="interval-control">
                    <Box>
                        <Typography variant='p'>Interval</Typography>
                        <Box className="interval-select-box">
                            {/* <CustomizedSelect value={interval} onChange={handleIntervalChange} options={intervalOptions} /> */}
                            <StyledSelect item={["1M", "5M", "30M", "1H", "4M", "1D"]}/>
                        </Box>
                    </Box>
                </FormControl>
                <FormControl className="interval-control">
                    <Box>
                        <Typography variant='p'>Span</Typography>
                        <Box className="interval-select-box">
                            {/* <CustomizedSelect value={span} onChange={handleSpanChange} options={spanOptions} /> */}
                            <StyledSelect item={["15M", "1H", "4H", "12H", "1D", "3D", "7D", "14D", "30D", "60D"]}/>
                        </Box>
                    </Box>
                </FormControl>
                <FormControl className="outliers-box">
                    <Box>
                        <Typography variant='p' className="q-label">Outliers</Typography>
                        <Switch
                            checked={outliers}
                            onChange={handleOutliersChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    </Box>
                </FormControl>
            </Box>
        </Box>
    );
};

export default TradesChart;