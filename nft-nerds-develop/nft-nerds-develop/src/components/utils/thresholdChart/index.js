import React from 'react';
import { Box, FormControl, Typography, Select, MenuItem, Switch, Button, ButtonGroup } from '@mui/material';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import CustomizedSelect from '../CustomizedSelect';
import PriceButton from '../../../components/form';
import IcecreamIcon from '@mui/icons-material/Icecream';
import SnatcherIcon from '../../../assets/snatcher.svg';
import HistoryIcon from '../../../assets/history.svg';
import MomentumIcon from '../../../assets/momentum.svg';
import './style.scss';
const background = "#0a0522";
const ThresholdChart = props => {

    const [mode, setMode] = React.useState(true);
    const [span, setSpan] = React.useState(15);

    const options = {
        title: {
          text: '',
          align: 'left',
          style: {
            color: "#8686A0",
            fontSize: "12px",
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
        <Box className="listing-chart-container">
            
            <Box className="listing-chart-2-box">
                <Box className="threshold">
                    <Typography variant='p' className="q-label">Threshold</Typography>
                    <PriceButton item={["Ξ0.01", "Ξ0.02", "Ξ0.05", "Ξ0.1", "Ξ0.2", "Ξ0.5", "Ξ1", "Ξ2", "5"]}/>
                </Box>
                <Box className="listing-chart-2-history">
                    <ButtonGroup className='history-group' variant="outlined" aria-label="outlined button group">
                        <Button className='listing-chart-btn'>
                            <svg class="threshold-icons" focusable="false" viewBox="0 0 24 24" aria-hidden="true" data-testid="BubbleChartIcon" aria-label="Snatcher"><circle cx="7.2" cy="14.4" r="3.2"></circle><circle cx="14.8" cy="18" r="2"></circle><circle cx="15.2" cy="8.8" r="4.8"></circle></svg>
                        </Button>
                        <Button className='listing-chart-btn'>
                            <svg class="threshold-icons" focusable="false" viewBox="0 0 24 24" aria-hidden="true" data-testid="BarChartIcon" aria-label="Listing History"><path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"></path></svg>
                        </Button>
                        <Button className='listing-chart-btn'>
                            <svg class="threshold-icons" focusable="false" viewBox="0 0 24 24" aria-hidden="true" data-testid="ShowChartIcon" aria-label="Momentum"><path d="m3.5 18.49 6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"></path></svg>
                        </Button>
                    </ButtonGroup>
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

export default ThresholdChart;