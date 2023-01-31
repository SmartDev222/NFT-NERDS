import React from 'react';
import { Box, FormControl, Typography, Select, MenuItem, Switch } from '@mui/material';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import CustomizedSelect from '../CustomizedSelect';
import PriceButton from '../../../components/form';
import './style.scss';

const background = "#0a0522";
const ListeningBarChart = props => {

    const [mode, setMode] = React.useState(true);
    const [span, setSpan] = React.useState(0.01);

    const options = {
        title: {
          text: '',
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
                name: 'LISTENINGS',
                color: 'rgb(137, 101, 211)',
                data: [1, 2, 1, 4, 3, 6, 7, 3, 8, 6, 9],
            }
        ],
        chart: {
            backgroundColor: background,
            type: 'column',
        },
        xAxis: {
            title: {
                text: 'count',
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
                text: 'price',
                style: {
                    color: "#7D7D9D",
                    fontSize: "14px",
                    textTransform: "uppercase",
                    // fontFamily: "Zen Kurenaido",
                }
            }
        },
        plotOptions: {
            column: {
                pointWidth: '10',
                borderWidth: '0',
            }
        }
    }

    const spanOptions = [
        {value: 0.01, text: 'Ξ0.01'},
        {value: 0.02, text: 'Ξ0.02'},
        {value: 0.05, text: 'Ξ0.05'},
        {value: 0.1, text: 'Ξ0.1'},
        {value: 0.2, text: 'Ξ0.2'},
        {value: 0.5, text: 'Ξ0.5'},
        {value: 1, text: 'Ξ1'},
        {value: 2, text: 'Ξ2'},
        {value: 5, text: '5'},
    ];

    const handleModeChange = (event) => {
        setMode(event.target.checked);
    }

    const handleSpanChange = (event) => {
        setSpan(event.target.value);
    }

    return (
        <Box className="listening-bar-chart">
            <Box className="listing-chart-2-box">
                <Box className="threshold">
                    <Typography variant='p' className="q-label">Group Size</Typography>
                    <PriceButton item={["Ξ0.01", "Ξ0.02", "Ξ0.05", "Ξ0.1", "Ξ0.2", "Ξ0.5", "Ξ1", "Ξ2", "5"]}/>
                </Box>
                <Box className="listing-chart-2-history">
                    <Typography variant='p' className="q-label">Ladder</Typography>
                    <Switch
                        className='ladder'
                        checked={mode}
                        onChange={handleModeChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                    
                </Box>
                
                <Box className="listing-chart-2">
                    <Box className='listing-chart-2-box'>
                        <HighchartsReact
                            highcharts={Highcharts}
                            constructorType={'chart'}
                            options={options}
                        />
                    </Box>
                   
                </Box>
            </Box>
        </Box>
    );
}

export default ListeningBarChart;

