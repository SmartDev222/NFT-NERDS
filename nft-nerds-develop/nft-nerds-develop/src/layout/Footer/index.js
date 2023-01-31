import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import SvgIcon from "@mui/material/SvgIcon";
import {
  useCryptoPrices,
  CryptoPriceProvider,
} from "react-realtime-crypto-prices";
import axios from "axios";
import "./style.scss";

const Footer = (props) => {
  const [rank, setRanks] = React.useState(() => ["norm", "count"]);
  const [fastGasPrice, setFastGasPrice] = React.useState(0);

  // useEffect(() => {
  //   const intervalId = setInterval(() =>  {
  //     axios.get(`https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`)
  //     .then(res => {

  //       if(res && res.data && res.data.result) {
  //         setFastGasPrice(res.data.result.FastGasPrice);
  //       }
  //     })
  //   },15000);
  //   return () => clearInterval(intervalId);
  // },[]);

  const handleRank = (event, newRank) => {
    setRanks(newRank);
  };

  const handleMode = (event, newMode) => {};

  const GetCryptoPrices = () => {
    const prices = useCryptoPrices(["eth"]);
    return <span>${prices && prices.eth ? prices.eth : 0}</span>;
  };

  return (
    <Box className="footer">
      <Box className="social-icons">
        <a
          href="https://twitter.com/NFTyakuzaAI"
          target="_blank"
          rel="noreferrer"
        >
          <svg
            className="twitter"
            focusable="false"
            viewBox="0 0 24 24"
            aria-hidden="true"
            data-testid="TwitterIcon"
          >
            <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"></path>
          </svg>
        </a>
        <a href="https://discord.gg/yakuza" target="_blank" rel="noreferrer">
          <svg
            className="discord"
            focusable="false"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <svg viewBox="0 0 71 55" xmlns="http://www.w3.org/2000/svg">
              <g>
                <path
                  d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"
                  fill="currentColor"
                ></path>
              </g>
            </svg>
          </svg>
        </a>
      </Box>
      <Box className="right-side">
        <Box sx={{ display: "flex" }}>
          <Button className="iconBtn">
            <Tooltip title="Settings">
              <SvgIcon>
                <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"></path>
              </SvgIcon>
            </Tooltip>
          </Button>
        </Box>
        <Divider orientation="vertical" flexItem className="vDivider" />
        <Box sx={{ display: "flex" }}>
          <Button className="iconBtn">
            <Tooltip title="Reveal Calendar">
              <SvgIcon>
                <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"></path>
              </SvgIcon>
            </Tooltip>
          </Button>
        </Box>
        <Divider orientation="vertical" flexItem className="vDivider" />
        <Box>
          <ToggleButtonGroup
            value={rank}
            onChange={handleRank}
            aria-label="rank"
            className="rank-setting"
          >
            <ToggleButton value="norm" aria-label="norm" className="ranks_btn">
              <Tooltip title="Normalize traits when calculating rarity ranks">
                <div
                  className=""
                  aria-label="Normalize traits when calculating rarity ranks"
                >
                  Norm
                </div>
              </Tooltip>
            </ToggleButton>
            <ToggleButton
              value="count"
              aria-label="count"
              className="ranks_btn"
            >
              <Tooltip title="Normalize traits when calculating rarity ranks">
                <div
                  className=""
                  aria-label="Include trait count when calculating rarity ranks"
                >
                  Count
                </div>
              </Tooltip>
            </ToggleButton>
          </ToggleButtonGroup>
          <Button className="iconBtn">
            <Tooltip title="Pick parameters of rarity calculation algorithm. This setting doesn't affect collections with official rarity or events in customAlerts">
              <SvgIcon>
                <path d="M17 10.43V2H7v8.43c0 .35.18.68.49.86l4.18 2.51-.99 2.34-3.41.29 2.59 2.24L9.07 22 12 20.23 14.93 22l-.78-3.33 2.59-2.24-3.41-.29-.99-2.34 4.18-2.51c.3-.18.48-.5.48-.86zm-4 1.8-1 .6-1-.6V3h2v9.23z"></path>
              </SvgIcon>
            </Tooltip>
          </Button>
        </Box>
        <Divider orientation="vertical" flexItem className="vDivider" />
        <Box className="gas-settings">
          <Box>
            <Box className="gas-determine-info">
              <Tooltip title="Gas will be determined by MetaMask">
                <p>default</p>
              </Tooltip>
            </Box>
            <Box className="mode-setting">
              <ToggleButtonGroup
                value={rank}
                onChange={handleMode}
                aria-label="mode"
              >
                <ToggleButton value="rapid" aria-label="rapid" className="">
                  <Tooltip title="Rapid mode:fase + 5gwei">
                    <SvgIcon>
                      <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9 1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z"></path>
                    </SvgIcon>
                  </Tooltip>
                </ToggleButton>
                <ToggleButton value="insane" aria-label="insane" className="">
                  <Tooltip title="Insane mode:fase + 25gwei">
                    <SvgIcon>
                      <path d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z"></path>
                    </SvgIcon>
                  </Tooltip>
                </ToggleButton>
                <ToggleButton value="preset1" aria-label="preset1" className="">
                  <Tooltip title="To define presets, click gas pump icon on the right">
                    <SvgIcon>
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14h-2V9h-2V7h4v10z"></path>
                    </SvgIcon>
                  </Tooltip>
                </ToggleButton>
                <ToggleButton value="preset2" aria-label="preset2" className="">
                  <Tooltip title="To define presets, click gas pump icon on the right">
                    <SvgIcon>
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4 8c0 1.11-.9 2-2 2h-2v2h4v2H9v-4c0-1.11.9-2 2-2h2V9H9V7h4c1.1 0 2 .89 2 2v2z"></path>
                    </SvgIcon>
                  </Tooltip>
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <Box className="custom-presets">
              <Tooltip title="Custom Gas presets (available only to premium users)">
                <SvgIcon>
                  <path d="m19.77 7.23.01-.01-3.72-3.72L15 4.56l2.11 2.11c-.94.36-1.61 1.26-1.61 2.33 0 1.38 1.12 2.5 2.5 2.5.36 0 .69-.08 1-.21v7.21c0 .55-.45 1-1 1s-1-.45-1-1V14c0-1.1-.9-2-2-2h-1V5c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v16h10v-7.5h1.5v5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V9c0-.69-.28-1.32-.73-1.77zM12 10H6V5h6v5zm6 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"></path>
                </SvgIcon>
              </Tooltip>
            </Box>
          </Box>
        </Box>
        <Divider orientation="vertical" flexItem className="vDivider" />
        <Box className="gas-price">
          <Tooltip title="Fast gas estimate from Etherscan">
            <Box>
              <span>{fastGasPrice}</span>
              <p>gwei</p>
            </Box>
          </Tooltip>
        </Box>
        <Box className="eth-price-box">
          {/* <Divider orientation="vertical" flexItem className="vDivider"/>
            <Tooltip title={`ETH price at ${new Date().toDateString()}`}>
                <CryptoPriceProvider cryptoCompareApiKey={process.env.REACT_APP_CRYPTOCOMPARE_API_Key}>
                  <GetCryptoPrices/>
                </CryptoPriceProvider>
            </Tooltip> */}
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
