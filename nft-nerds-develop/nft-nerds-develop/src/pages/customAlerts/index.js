import React, { useState, useEffect } from "react";
import { Box, Badge, Button, Divider, Modal, Typography } from "@mui/material";
import "./style.scss";
import CustomAlertsItem from "../../components/CustomAlertsItem";
import CustomAlertsActiveCollectionItem from "../../components/CustomAlertsActiveCollectionItem";
import DetailModal from "../../components/modals/Detail";
import FilterModal from "../../components/modals/filter";
import AlertModal from "../../components/modals/alert";
import BuyAlertModal from "../../components/modals/buyAlert";
import Footer from "../../layout/Footer";
import Header from "../../layout/Header";
import { connect } from "react-redux";
import { CollectionAssetFetchData } from "../../actions/collections";
import {
  OpenSeaStreamClient,
  Network as StreamNetwork,
} from "@opensea/stream-js";
import { OrderSide } from "opensea-js/lib/types";
import { EventType } from "opensea-js";

import { authenticated } from "../../actions/login";

import axios from "axios";
import moment from "moment";

import * as Web3 from "web3";
import { OpenSeaPort, Network } from "opensea-js";

import detectEthereumProvider from "@metamask/detect-provider";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";

function mapStatetoProps(state) {
  return {
    authenticated: state.authenticated,
    collectionAsset: state.collectionAsset,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getAsset: (addr, id) => dispatch(CollectionAssetFetchData(addr, id)),
    setAuthenticate: (flag) => dispatch(authenticated(flag)),
  };
}

// get event from opensea
// const client = new OpenSeaStreamClient({
//     token: process.env.REACT_APP_OPENSEA_API_KEY,
//     apiUrl: StreamNetwork.TESTNET
// });

const client = new OpenSeaStreamClient({
  token: process.env.REACT_APP_OPENSEA_API_KEY,
  apiUrl: "wss://stream.openseabeta.com/socket",
});

client.connect();

// This example provider won't let you make transactions, only read-only calls:
// v3/871627b5d1014a5285fe468335dadb4d

const CustomAlerts = (props) => {
  const [filterValue, setFilterValue] = useState("both");

  // open and close function and state for Detail Modal
  const [modalData, setModalData] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = (addr, id) => {
    console.log("event", addr, id);
    props.getAsset(addr, id);
  };

  const handleClose = () => setOpen(false);

  const [openFilter, setOpenFilter] = useState(false);
  const handleOpenFilter = () => setOpenFilter(true);
  const handleCloseFilter = () => setOpenFilter(false);

  const [openAlert, setOpenAlert] = useState(false);
  const handleOpenAlert = () => setOpenAlert(true);
  const handleCloseAlert = () => setOpenAlert(false);

  const [openBuyAlert, setOpenBuyAlert] = useState(false);
  const handleOpenBuyAlert = () => setOpenBuyAlert(true);
  const handleCloseBuyAlert = () => setOpenBuyAlert(false);

  const [totalBuffer, setTotalBuffer] = useState([]);
  const [listingBuffer, setListingBuffer] = useState([]);
  const [tradesBuffer, setTradesBuffer] = useState([]);
  const [displayBuffer, setDisplayBuffer] = useState([]);
  const [mostActiveCollection, setMostActiveCollection] = useState([]);
  const [bufferLimite, setBufferLimite] = useState(100);
  const [activeCol, setActiveCol] = useState([]);
  const [isMouseEnter, setIsMouseEnter] = useState(false);
  const [alertData, setAlertData] = useState([]);
  const [buyAlertData, setBuyAlertData] = useState({});

  let tempSoldColBuffer = [];
  let activeData = [];

  // mouse over and out event
  const handleMouseEnter = (event) => {
    setIsMouseEnter(true);
  };
  const handleMouseLeave = () => {
    setIsMouseEnter(false);
  };

  const getFilterValue = (isListing, isTrades) => {
    if (isListing && isTrades) setFilterValue("both");
    else {
      if (isListing) setFilterValue("item_listed");
      else setFilterValue("item_sold");
    }
    handleCloseFilter();
  };

  const getDuplicateCheck = (address, volume) => {
    let flag = false;
    for (let i = 0; i < activeData.length; i++) {
      if (address == activeData[i].address) {
        activeData[i].count++;
        let price_temp = activeData[i].volume + volume;
        activeData[i].volume = price_temp;
        flag = true;
      }
    }
    return flag;
  };

  const buyAction = async (data) => {
    let tokenAddress = data.item.nft_id.split("/")[1];
    let tokenId = data.item.nft_id.split("/")[2];
    let temp = {
      state: false,
      data: data,
    };

    try {
      if (window.ethereum.isMetaMask) {
        window.ethereum.request({ method: "eth_requestAccounts" });
      }
      const provider = await detectEthereumProvider();
      const seaport = new OpenSeaPort(provider, {
        networkName: Network.Main,
        apiKey: process.env.REACT_APP_OPENSEA_API_KEY,
      });

      const [accountAddress] =
        (await window.ethereum?.request({
          method: "eth_accounts",
        })) || [];

      const { orders } = await seaport.api.getOrders({
        asset_contract_address: tokenAddress,
        token_id: tokenId,
        side: OrderSide.Sell,
      });

      const order = orders[orders.length - 1];
      setIsMouseEnter(true);
      setBuyAlertData(temp);
      handleOpenBuyAlert();

      const transactionHash = await seaport.fulfillOrder({
        order,
        accountAddress,
      });

      console.log("fulfillOrder:", transactionHash);
      temp.state = true;
      setBuyAlertData(temp);
      setIsMouseEnter(false);
    } catch (error) {
      console.error(error);
      handleCloseBuyAlert();
      window.alert(error);
    }
  };

  //   console.log("ethereum:", window.ethereum);

  const getChildClick = (isClick, data) => {
    if (isClick == "modal") {
      console.log("modaldata", data);
      if (data.length != 0 && data != null) {
        const addr = data.item.nft_id.split("/")[1];
        const token_id = data.item.nft_id.split("/")[2];
        console.log("addr, token_id", addr, token_id);
        props.getAsset(addr, token_id);
      }
    } else {
      buyAction(data);
    }
  };

  const TableProgress = () => {
    return (
      <Stack sx={{ width: "100%", color: "grey.500" }}>
        <LinearProgress color="inherit" />
      </Stack>
    );
  };

  useEffect(() => {
    const auth = localStorage.getItem("authenticated");
    if (auth) {
      props.setAuthenticate(true);
    }

    let tempTotalBuffer = [];
    let tempListingBuffer = [];
    let tempTradesBuffer = [];

    axios
      .get(`${process.env.REACT_APP_BACKEND_API_URL}contract/firehose-per-page`)
      .then((res) => {
        console.log("res", res.data);
        let data = res.data;
        if (data.code == 200) {
          setMostActiveCollection(res.data.data.contractList);
        } else {
          if (data.code == 500) window.alert(data.message);
          setMostActiveCollection(null);
        }
      });

    client.onItemListed("*", (event) => {
      if (event.payload.item.chain.name === "ethereum") {
        if (filterValue == "both" || filterValue == "item_listed") {
          tempTotalBuffer.push(event);
          tempListingBuffer.push(event);

          if (tempTotalBuffer.length > bufferLimite) {
            tempTotalBuffer.splice(bufferLimite, tempTotalBuffer.length);
            setTotalBuffer(tempTotalBuffer);
            tempTotalBuffer = [];
          }
          if (tempListingBuffer.length > bufferLimite) {
            tempListingBuffer.splice(bufferLimite, tempListingBuffer.length);
            setListingBuffer(tempListingBuffer);
            tempListingBuffer = [];
          }
        }
      }
    });

    client.onItemSold("*", (event) => {
      if (event.payload.item.chain.name === "ethereum") {
        tempTotalBuffer.push(event);
        tempTradesBuffer.push(event);

        if (tempTotalBuffer.length < bufferLimite) {
          if (tempTotalBuffer.length - tradesBuffer.length > 30) {
            setTradesBuffer(tempTradesBuffer);
          }
        } else if (tempTradesBuffer.length >= bufferLimite) {
          tempTradesBuffer.splice(0, tempTradesBuffer.length - bufferLimite);
          setTradesBuffer(tempTradesBuffer);
        }
      }
    });

    return () => {
      client.disconnect();
    };
  }, []);

  useEffect(() => {
    if (props.collectionAsset.length != 0) {
      setOpen(true);
      setModalData(props.collectionAsset);
    }
  }, [props.collectionAsset]);

  useEffect(() => {
    console.log("event", isMouseEnter);
    if (!isMouseEnter) {
      if (filterValue == "both") setDisplayBuffer(totalBuffer);
      else if (filterValue == "item_list") setDisplayBuffer(listingBuffer);
      else if (filterValue == "item_sold") setDisplayBuffer(tradesBuffer);
    } else {
      if (displayBuffer.length == 0) {
        if (filterValue == "both") setDisplayBuffer(totalBuffer);
        else if (filterValue == "item_list") setDisplayBuffer(listingBuffer);
        else if (filterValue == "item_sold") setDisplayBuffer(tradesBuffer);
      }
    }
  }, [totalBuffer, listingBuffer, tradesBuffer]);

  return (
    <div>
      <Header {...props} />
      <Box className="customAlerts-body">
        <Box className="sub-header">
          <Badge variant="dot" color="primary" invisible={true}>
            <Button
              variant="outlined"
              size="small"
              className="btn-filters"
              onClick={handleOpenFilter}
            >
              MANAGE FILTERS
            </Button>
          </Badge>
          <Box className="sub-header">
            <Badge
              variant="standard"
              color="secondary"
              invisible={true}
              onClick={handleOpenAlert}
            >
              <Button variant="outlined" size="small" className="btn-filters">
                MANAGE ALERTS
              </Button>
            </Badge>
          </Box>
        </Box>
        <Divider className="divider1" />
        <Box className="main" sx={{ position: "relative" }}>
          <Box className="wrapper">
            <Box className="customAlerts-list">
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="h5" component="div">
                  Custom Alerts
                </Typography>
                <div
                  aria-label="grid"
                  aria-readonly="true"
                  className="ReactVirtualized__Grid ReactVirtualized__List yakuza-no-scroll"
                  role="grid"
                  tabIndex="0"
                  style={{
                    boxSizing: "border-box",
                    direction: "ltr",
                    position: "relative",
                    width: "450px",
                    willChange: "transform",
                    overflow: "auto",
                  }}
                >
                  <div
                    className="ReactVirtualized__Grid__innerScrollContainer"
                    role="rowgroup"
                    style={{
                      width: "auto",
                      height: "12000px",
                      maxWidth: "450px",
                      maxHeight: "12000px",
                      overflow: "hidden",
                      position: "relative",
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {displayBuffer.length > 0 ? (
                      displayBuffer.map((item, index) => (
                        <div key={index}>
                          <CustomAlertsItem
                            index={index}
                            data={item}
                            filterValue={filterValue}
                            getChildClick={getChildClick}
                          />
                        </div>
                      ))
                    ) : (
                      <TableProgress />
                    )}
                  </div>
                </div>
              </Box>
            </Box>
            <Divider orientation="vertical" className="divider2" />
            <Box className="mostActive-list" sx={{ overflow: "hidden" }}>
              <Typography variant="h5" component="div">
                Most active collections (last 5min)
              </Typography>
              <Box
                className="yakuza-no-scroll"
                sx={{ position: "relative", overflow: "auto" }}
              >
                <Box sx={{ width: "100%" }}>
                  {mostActiveCollection.length > 0 ? (
                    mostActiveCollection != null &&
                    mostActiveCollection.map((item, index) => (
                      <CustomAlertsActiveCollectionItem
                        key={index}
                        data={item}
                      />
                    ))
                  ) : (
                    <TableProgress />
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className="resize-triggers">
            <Box className="expand-trigger">
              <Box></Box>
            </Box>
            <Box className="contract-trigger"></Box>
          </Box>
        </Box>

        {open && (
          <DetailModal
            open={open}
            onClose={handleClose}
            modalData={modalData}
          />
        )}
        <FilterModal
          open={openFilter}
          onClose={handleCloseFilter}
          filter={filterValue}
          getFilterValue={getFilterValue}
        />
        <AlertModal
          open={openAlert}
          onClose={handleCloseAlert}
          data={alertData}
        />
        {openBuyAlert && (
          <BuyAlertModal
            open={openBuyAlert}
            onClose={handleCloseBuyAlert}
            data={buyAlertData}
          />
        )}
      </Box>
      <Footer />
    </div>
  );
};

export default connect(mapStatetoProps, mapDispatchToProps)(CustomAlerts);
