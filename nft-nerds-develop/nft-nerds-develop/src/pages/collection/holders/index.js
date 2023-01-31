import React from "react";
import { styled } from '@mui/material/styles';
import { Box, Grid, Paper, Tooltip, Typography } from "@mui/material";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HolderCard from '../../../components/utils/holderCard';

import './style.scss';
const background = "#0a0522";
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'rgb(30, 30, 40)',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const chartOptions = {
    title: {
      text: 'unique holders',
      align: 'left',
      style: {
        color: "#8686A0",
        fontSize: "24px",
        textTransform: "uppercase",
        fontWeight: "400",
        lineHeight: "24px"
      }
    },
    series: [{
      data: [1, 2, 3]
    }],
    chart: {
        backgroundColor: background,
    },
    yAxis: {
        title: {
            text: 'count',
            style: {
                color: "#7D7D9D",
                fontSize: "14px",
                textTransform: "uppercase",
                fontFamily: "Zen Kurenaido",
            }
        }
    }
}

const Holders = () => {
    const data = [
        {name: "1"},
        {name: "2"},
        {name: "2"},
        {name: "2"},
        {name: "2"},
        {name: "2"},
        {name: "2"},
        {name: "2"},
        {name: "2"},
    ]

    const chartData = [];
    for (let i = 1; i < 20; i++)
        chartData.push({
            name: i,
            Iphone: Math.tanh(i)
        });

    return (
        <Box>
            <Grid container spacing={2} className="holder-container">
                <Grid item xs={12} md={5} className="grid-item-left">
                    <Box className="item-left-container" sx={{ position: "relative" }}>
                        <Item className="item-left-top">
                            <Box className="content">
                                <Box className="content-item">
                                    <Tooltip title="Number of wallets holding only 1 token from this collection.">
                                        <Box className="css-1ji7oyb">
                                            <Box className="css-k008qs">
                                                <Typography variant="body1" className="css-m8j16h">
                                                    <span className="css-70qvj9">17215</span>
                                                </Typography>
                                            </Box>
                                            <Typography variant="body1" className="css-1uf3gue">HOLDS 1</Typography>
                                        </Box>
                                    </Tooltip>
                                </Box>
                                <Box className="content-item">
                                    <Tooltip title="Number of wallets holding only 1 token from this collection.">
                                        <Box className="css-1ji7oyb">
                                            <Box className="css-k008qs">
                                                <Typography variant="body1" className="css-m8j16h">
                                                    <span className="css-70qvj9">13768</span>
                                                </Typography>
                                            </Box>
                                            <Typography variant="body1" className="css-1uf3gue">2-5</Typography>
                                        </Box>
                                    </Tooltip>
                                </Box>
                                <Box className="content-item">
                                    <Tooltip title="Number of wallets holding only 1 token from this collection.">
                                        <Box className="css-1ji7oyb">
                                            <Box className="css-k008qs">
                                                <Typography variant="body1" className="css-m8j16h">
                                                    <span className="css-70qvj9">1830</span>
                                                </Typography>
                                            </Box>
                                            <Typography variant="body1" className="css-1uf3gue">6-20</Typography>
                                        </Box>
                                    </Tooltip>
                                </Box>
                                <Box className="content-item">
                                    <Tooltip title="Number of wallets holding only 1 token from this collection.">
                                        <Box className="css-1ji7oyb">
                                            <Box className="css-k008qs">
                                                <Typography variant="body1" className="css-m8j16h">
                                                    <span className="css-70qvj9">210</span>
                                                </Typography>
                                            </Box>
                                            <Typography variant="body1" className="css-1uf3gue">21-50</Typography>
                                        </Box>
                                    </Tooltip>
                                </Box>
                                <Box className="css-k008qs">
                                    <Tooltip title="Number of wallets holding only 1 token from this collection.">
                                        <Box className="css-1ji7oyb">
                                            <Box className="css-k008qs">
                                                <Typography variant="body1" className="css-m8j16h">
                                                    <span className="css-70qvj9">68</span>
                                                </Typography>
                                            </Box>
                                            <Typography variant="body1" className="css-1uf3gue">OVER 50</Typography>
                                        </Box>
                                    </Tooltip>
                                </Box>
                            </Box>
                        </Item>
                        <Box className="item-left-sub-header">
                            <Typography variant="overline" className="css-18g4h3a">Holder</Typography>
                            <Typography variant="overline" className="css-pr9ua0">Owns</Typography>
                            <Typography variant="overline" className="css-c24zu3">% of supply</Typography>
                        </Box>
                        <Box className="holder-list">
                            <div aria-label="grid" aria-readonly="true" className="ReactVirtualized__Grid ReactVirtualized__List yakuza-no-scroll" role="grid" tabIndex="0" style={{ boxSizing: "border-box", direction: "ltr", height: "350px", position: "relative", willChange: "transform", overflow: "auto" }}>
                                <div className="ReactVirtualized__Grid__innerScrollContainer" role="rowgroup" style={{ width: "auto", height: "2.5159e+06px", maxHeight: "2.5159e+06px", overflow: "hidden", position: "relative" }}>
                                {
                                    data.map((item, index) => (
                                        <HolderCard key={index} index={index} data={item} />
                                    ))
                                }
                                </div>
                            </div>
                        </Box>
                        <div className="resize-triggers">
                            <div className="expand-trigger">
                                <div style={{ width: "580px", height: "351px" }}></div>
                            </div>
                            <div className="contract-trigger"></div>
                        </div>
                    </Box>
                </Grid>
                <Grid item xs={12} md={7} className="grid-item-right">
                    <Box className="css-19idom">
                        <Item className="css-ftuh8f">
                            <Box className="css-1bra6wo">
                                <Box className="css-k008qs">
                                    <Tooltip title="Circulating supply, should be equal to number of minted tokens. This feature is in beta, might be off for older collections.">
                                        <Box className="css-1rmkoeu">
                                            <Box className="css-1ji7oyb">
                                                <Box className="css-k008qs">
                                                    <p className="MuiTypography-root MuiTypography-body1 css-m8j16h">
                                                        <span className="css-70qvj9">96292</span>
                                                    </p>
                                                </Box>
                                                <p className="MuiTypography-root MuiTypography-body1 css-1uf3gue">SUPPLY</p>
                                            </Box>
                                        </Box>
                                    </Tooltip>
                                    <Tooltip title="Circulating supply, should be equal to number of minted tokens. This feature is in beta, might be off for older collections.">
                                        <Box className="css-1rmkoeu">
                                            <Box className="css-1ji7oyb">
                                                <Box className="css-k008qs">
                                                    <p className="MuiTypography-root MuiTypography-body1 css-m8j16h">
                                                        <span className="css-70qvj9">33095</span>
                                                    </p>
                                                </Box>
                                                <p className="MuiTypography-root MuiTypography-body1 css-1uf3gue">HOLDERS</p>
                                            </Box>
                                        </Box>
                                    </Tooltip>
                                    <Tooltip title="Circulating supply, should be equal to number of minted tokens. This feature is in beta, might be off for older collections.">
                                        <Box className="css-1rmkoeu">
                                            <Box className="css-1ji7oyb">
                                                <Box className="css-k008qs">
                                                    <p className="MuiTypography-root MuiTypography-body1 css-m8j16h">
                                                        <span className="css-70qvj9">2.9</span>
                                                    </p>
                                                </Box>
                                                <p className="MuiTypography-root MuiTypography-body1 css-1uf3gue">AVG OWNED</p>
                                            </Box>
                                        </Box>
                                    </Tooltip>
                                </Box>
                                <Box className="css-k008qs">
                                    <Tooltip title="Circulating supply, should be equal to number of minted tokens. This feature is in beta, might be off for older collections.">
                                        <Box className="css-1ji7oyb">
                                            <Box className="css-k008qs">
                                                <p className="MuiTypography-root MuiTypography-body1 css-m8j16h">
                                                    <span className="css-70qvj9">34%</span>
                                                </p>
                                            </Box>
                                            <p className="MuiTypography-root MuiTypography-body1 css-1uf3gue">UNIQUE HOLDERS</p>
                                        </Box>
                                    </Tooltip>
                                </Box>
                            </Box>
                        </Item>
                    </Box>
                    <Box className="css-ojqyia">
                        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
export default Holders