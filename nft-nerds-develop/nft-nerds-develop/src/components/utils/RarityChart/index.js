import React from 'react';
import { Box, FormControl, Typography, Select, MenuItem, Switch } from '@mui/material';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import CustomizedSelect from '../CustomizedSelect';
import './style.scss';
const background = "#0a0522";
const RarityChart = props => {

    const [mode, setMode] = React.useState(true);
    const [span, setSpan] = React.useState(15);

    const options = {
        title: {
          text: 'Listening per rank',
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
                name: 'LISTENINGS',
                color: 'rgb(43, 144, 143)',
                data: [1, 2, 1, 4, 3, 6, 7, 3, 8, 6, 9],
            }
        ],
        chart: {
            backgroundColor: background,
        },
        xAxis: {
            title: {
                text: 'parity rank',
                style: {
                    color: "#7D7D9D",
                    fontSize: "14px",
                    textTransform: "uppercase",
                    // fontFamily: "Zen Kurenaido",
                }
            }
        },
        yAxis: {
            title: {
                text: 'price in eth',
                style: {
                    color: "#7D7D9D",
                    fontSize: "14px",
                    textTransform: "uppercase",
                    // fontFamily: "Zen Kurenaido",
                }
            }
        }
    }

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

    const handleModeChange = (event) => {
        setMode(event.target.checked);
    }

    const handleSpanChange = (event) => {
        setSpan(event.target.value);
    }

    return (
        <Box className="rarity-chart">
            <Box>
                <HighchartsReact
                    highcharts={Highcharts}
                    constructorType={'chart'}
                    options={options}
                />
            </Box>
            <Box className="data-controls">
                <FormControl className="span-control">
                    <Box>
                        <Typography variant='p'>Span</Typography>
                        <Box className="span-select-box">
                            <CustomizedSelect value={span} onChange={handleSpanChange} options={spanOptions} />
                        </Box>
                    </Box>
                </FormControl>
                <FormControl className="smart-mode-box">
                    <Box>
                        <Typography variant='p' className="q-label">Smart Mode</Typography>
                        <Switch
                            checked={mode}
                            onChange={handleModeChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    </Box>
                </FormControl>     
            </Box>
        </Box>
    );
}

export default RarityChart;