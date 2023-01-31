import React, {
  useEffect,
  useMemo,
  useReducer,
  useState,
  memo,
  useRef,
} from "react";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import ToggleButton from "@mui/material/ToggleButton";
import Formcontrol from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import InputUnstyled from "@mui/base/InputUnstyled";
import PriceButton from "../../../components/form";
import Checkbox from "@mui/material/Checkbox";
import TradesChart from "../../../components/utils/tradesChart";
import RarityChart from "../../../components/utils/RarityChart";
import Switch from "@mui/material/Switch";
import ThresholdChart from "../../../components/utils/thresholdChart";
import HorizontalTraitsInput from "../../../components/utils/TraitsInput/horizontal";
import VerticalTraitsInput from "../../../components/utils/TraitsInput/vertical";
import DetailModal from "../../../components/modals/Detail";
import moment from "moment";
import momentTz from "moment-timezone";
import * as Web3 from "web3";
import { OpenSeaPort, Network } from "opensea-js";
import { OrderSide } from "opensea-js/lib/types";

import detectEthereumProvider from "@metamask/detect-provider";

//icons
import SortIcon from "@mui/icons-material/Sort";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

//style
import styled from "styled-components";
import "./style.scss";

//images
import ethIcon from "../../../assets/eth-icon.svg";
import ListingsCard from "../../../components/listingsCard";
import TradesCrad from "../../../components/tradesCard";
import ListeningBarChart from "../../../components/utils/ListeningBarChart";

// redux
import { connect } from "react-redux";
import {
  CollectionAssetFetchData,
  CollectionEventFetchData,
  CollectionOrderFetchData,
} from "../../../actions/collections";
import { collectionEvent } from "../../../reducers/collections";
import axios from "axios";

import { getLocalToUtc, getTimeDiff, getUtcToLocal } from "../../../constant";
import { off } from "process";

const ModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  boxShadow: 24,
  color: "white",
  p: 4,
  borderRadius: "5px",
  backgroundColor: "rgb(34, 24, 75)",
};
const TriatsInputStyle = {
  width: "70px",
  fontSize: "13px",
  fontWeight: 600,
  backgroundColor: "rgb(38, 38, 51)",
  padding: "20px 14px",
  borderRadius: "5px",
};

const listContainerStyle = {
  boxSizing: "border-box",
  direction: "ltr",
  height: "873px",
  position: "relative",
  width: "292px",
  willChange: "transform",
  overflow: "auto",
};

const listStyle = {
  width: "auto",
  height: "3000px",
  maxWidth: "292px",
  maxHeight: "3000px",
  overflow: "hidden",
  position: "relative",
};

function mapStatetoProps(state) {
  return {
    authenticated: state.authenticated,
    collectionEvent: state.collectionEvent,
    collectionAsset: state.collectionAsset,
    collectionOrder: state.collectionOrder,
    collectionEventError: state.collectionEventFetchHasErrored,
    collectionOrderError: state.collectionOrderFetchHasErrored,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getEvent: (addr, event_type, from_date, next_page) =>
      dispatch(
        CollectionEventFetchData(addr, event_type, from_date, next_page)
      ),
    getAsset: (addr, id) => dispatch(CollectionAssetFetchData(addr, id)),
    getOrders: (addr, ids) => dispatch(CollectionOrderFetchData(addr, ids)),
  };
}

const LiveView = (props) => {
  const [ladder, setLadder] = React.useState(true);
  const handleLadderChange = (event) => {
    setLadder(event.target.checked);
  };
  const [sortValue, setSortValue] = useState("Price");
  const [sortType, setSortType] = useState(true);

  const collectionStats = useMemo(() => {
    if (props.collectionStats.length != 0) return props.collectionStats.stats;
    else return null;
  }, [props.collectionStats]);

  const [contractAddr, setContractAddr] = useState("");
  //GET Data state
  const FIRST_GET_TRADES = "Frist_Get_Trades";
  const NEXT_GET_TRADES = "Next_Get_Trades";
  const FIRST_GET_LISTING_EVENT = "First_Get_Listing";
  const NEXT_GET_LISTING_EVENT = "Next_Get_Listing";
  const FIRST_GET_ORDER = "First_Get_Order";
  const NEXT_GET_ORDER = "Next_Get_Order";
  const getDataState = useRef(FIRST_GET_TRADES);

  const SOLD = "successful";
  const LISTINGS = "created";
  const [tradesData, setTradesData] = useState([]);
  const tradesDataBuffer = useRef([]);
  const [orderData, setOrderData] = useState([]);
  const orderDataBuffer = useRef([]);
  const queryArray = useRef([]);
  const queryOffset = useRef(0);
  const nextHistory = useRef(null);

  // open and close function and state for Detail Modal
  const [modalData, setModalData] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = (addr, id) => {
    console.log("id", addr, id);
    props.getAsset(addr, id);
  };
  const handleClose = () => setOpen(false);

  const [buyOpen, setBuyOpen] = useState(false);
  const handleBuyOpen = () => setBuyOpen(true);
  const handleBuyClose = () => setBuyOpen(false);

  const buyAction = async (data) => {
    handleBuyOpen();
    console.log("data", data);
    let tokenAddress = data.asset.asset_contract.address;
    let tokenId = data.asset.token_id;

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
      console.log("order", order);

      const transactionHash = await seaport.fulfillOrder({
        order,
        accountAddress,
      });
      handleBuyClose();
    } catch (error) {
      console.error("sss", error);
      handleBuyClose();
      window.alert(error);
    }
  };

  const getChildClick = (isClick, data) => {
    if (isClick == "modal") {
      const addr = data.asset.asset_contract.address;
      const token_id = data.asset.token_id;
      props.getAsset(addr, token_id);
    } else {
      buyAction(data);
    }
  };

  const getSelectedValue = async (value) => {
    setSortValue(value);
    setSortType(true);
  };

  const toggleSort = async () => {
    setSortType(!sortType);
  };

  const getEventTimeUTC = (offset) => {
    let temp = moment().subtract(offset, "hours").format("YYYY-MM-DD HH:mm:ss");
    let convertedDate = getLocalToUtc(temp);
    return convertedDate;
  };

  const pushTradesData = () => {
    let itemData = props.collectionEvent.asset_events;
    let next = props.collectionEvent.next;
    nextHistory.current = next;
    let tempData = tradesDataBuffer.current;

    for (let i = 0; i < itemData.length; i++) {
      let temp = itemData[i].total_price / 1e18;
      itemData[i].total_price = parseFloat(temp.toFixed(3));
      let timeTemp = itemData[i].event_timestamp;
      itemData[i].event_timestamp = new Date(getUtcToLocal(timeTemp));
      itemData[i].timeDiff = getTimeDiff(itemData[i].event_timestamp);
      if (itemData[i].asset != null) {
        tempData.push(itemData[i]);
      }
    }
    tradesDataBuffer.current = tempData;
    if (tempData.length >= 490) {
      setTradesData(tempData);
      tradesDataBuffer.current = [];
      nextHistory.current = null;
      getDataState.current = NEXT_GET_LISTING_EVENT;
      props.getEvent(contractAddr, LISTINGS);
    } else {
      if (next == null) {
        tradesDataBuffer.current = [];
        setTradesData(tempData);
        nextHistory.current = null;
        getDataState.current = NEXT_GET_LISTING_EVENT;
        props.getEvent(contractAddr, LISTINGS);
      } else {
        props.getEvent(contractAddr, SOLD, next);
      }
    }
  };

  const makeQuery = (offset, data) => {
    let str = "";
    let end = 0;
    if (data.length - offset > 30) end = offset + 30;
    else end = data.length;
    for (let i = offset; i < end; i++) str += data[i];
    return str;
  };

  const getTokenIdFromListingEvent = async () => {
    let temp = props.collectionEvent.asset_events;
    let next = props.collectionEvent.next;
    nextHistory.current = next;
    console.log("nextpage", next);
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].asset != null) {
        let id = temp[i].asset.token_id;
        let query = "&token_ids=" + id;

        let checked = duplicatedCheck(query, queryArray.current);
        if (checked == false) queryArray.current.push(query);
      }
    }
    console.log("listingData", queryArray);
    if (queryArray.current.length >= 500) {
      nextHistory.current = null;
      getDataState.current = NEXT_GET_ORDER;
      let queryString = await makeQuery(
        queryOffset.current,
        queryArray.current
      );
      props.getOrders(contractAddr, queryString);
    } else {
      if (next == null) {
        nextHistory.current = null;
        getDataState.current = NEXT_GET_ORDER;
        let queryString = await makeQuery(
          queryOffset.current,
          queryArray.current
        );
        props.getOrders(contractAddr, queryString);
      } else {
        props.getEvent(contractAddr, LISTINGS, next);
      }
    }
  };

  const duplicatedCheck = (query, array) => {
    let flag = false;
    for (let i = 0; i < array.length; i++) {
      if (query == array[i]) flag = true;
    }
    return flag;
  };

  const initialize = () => {
    queryArray.current = [];
    queryOffset.current = 0;
    nextHistory.current = null;
    getDataState.current = FIRST_GET_TRADES;
    orderDataBuffer.current = [];
    tradesDataBuffer.current = [];
  };

  const pushOrderData = async () => {
    let itemData = props.collectionOrder.orders;
    if (itemData != null) {
      let tempData = orderDataBuffer.current;
      for (let i = 0; i < itemData.length; i++) {
        let temp = itemData[i].base_price / 1e18;
        itemData[i].base_price = parseFloat(temp.toFixed(3));
        let timeTemp = itemData[i].created_date;
        itemData[i].created_date = new Date(getUtcToLocal(timeTemp));
        itemData[i].timeDiff = getTimeDiff(itemData[i].created_date);
        if (itemData[i].asset != null) {
          tempData.push(itemData[i]);
        }
      }
      console.log("tempData", tempData);
      orderDataBuffer.current = tempData;
      if (tempData.length >= 50) {
        setOrderData(tempData);
        setTimeout(() => {
          firstGetTrades();
          initialize();
        }, 10000);
      } else {
        queryOffset.current += 30;
        let query = await makeQuery(queryOffset.current, queryArray.current);
        if (query != "") props.getOrders(contractAddr, query);
        else {
          setTimeout(() => {
            setOrderData(tempData);
            firstGetTrades();
            initialize();
          }, 10000);
        }
      }
    }
  };

  const firstGetTrades = () => {
    props.getEvent(contractAddr, SOLD);
    getDataState.current = NEXT_GET_TRADES;
  };

  const listingDataToShow = useMemo(() => {
    console.log("data", orderData);
    let temp = orderData;
    if (temp.length != 0) {
      if (sortValue == "Price") {
        if (sortType) temp.sort((a, b) => b.base_price - a.base_price);
        else temp.sort((a, b) => a.base_price - b.base_price);
      } else if (sortValue == "Rank") {
        if (sortType) temp.sort((a, b) => b.asset.token_id - a.asset.token_id);
        else temp.sort((a, b) => a.asset.token_id - b.asset.token_id);
      } else if (sortValue == "Date") {
        if (sortType) temp.sort((a, b) => b.created_date - a.created_date);
        else temp.sort((a, b) => a.created_date - b.created_date);
      }
    }
    return temp;
  }, [sortValue, sortType, orderData]);

  useEffect(() => {
    if (contractAddr != "") {
      if (getDataState.current == FIRST_GET_TRADES) {
        firstGetTrades();
      } else if (getDataState.current == NEXT_GET_TRADES) {
        pushTradesData();
      } else if (getDataState.current == NEXT_GET_LISTING_EVENT) {
        getTokenIdFromListingEvent();
      } else if (getDataState.current == NEXT_GET_ORDER) {
        pushOrderData();
      }
    }
  }, [contractAddr, props.collectionEvent, props.collectionOrder]);

  useEffect(() => {
    if (props.address != undefined && props.address != "")
      setContractAddr(props.address);
    console.log("address update", props.address, tradesData, orderData);
    return () => {
      initialize();
      setTradesData([]);
      setOrderData([]);
      setContractAddr("");
      console.log("component unmount");
    };
  }, [props.address]);

  useEffect(() => {
    let eventError = props.collectionEventError;
    let orderError = props.collectionOrderError;
    if (eventError) {
      console.log("eventerror", eventError);
      setTimeout(() => {
        if (getDataState.current == NEXT_GET_TRADES) {
          if (nextHistory.current == null) props.getEvent(contractAddr, SOLD);
          else props.getEvent(contractAddr, SOLD, nextHistory.current);
        } else if (getDataState.current == NEXT_GET_LISTING_EVENT) {
          if (nextHistory.current == null)
            props.getEvent(contractAddr, LISTINGS);
          else props.getEvent(contractAddr, LISTINGS, nextHistory.current);
        }
      }, 1000);
    }
    if (orderError) {
      console.log("orderError", orderError);
      setTimeout(() => {
        if (getDataState.current == NEXT_GET_ORDER) {
          let query = makeQuery(queryOffset.current, queryArray.current);
          if (query != "") props.getOrders(contractAddr, query);
        }
      }, 1000);
    }
  }, [props.collectionEventError, props.collectionOrderError]);

  useEffect(() => {
    if (props.collectionAsset.length != 0) {
      setOpen(true);
      setModalData(props.collectionAsset);
      console.log("data", props.collectionAsset);
    }
  }, [props.collectionAsset]);

  return (
    <>
      <Box className="liveView_container">
        <Box className="notification">
          <Typography className="note" variant="h5" component="h5">
            Data is limited and delayed. For full access, unlock premium
          </Typography>
          <Box className="get_btn_container">
            <Box className="get_btn_1month_container">
              <Button>Get 1 month (Ξ0.15)</Button>
            </Box>
            <Button className="get_btn_6month">Get 6 months (Ξ0.5)</Button>
          </Box>
        </Box>
        <Grid className="traits_grid" xs={12}>
          <Box className="horizontal-traits">
            <HorizontalTraitsInput />
          </Box>
          <Box className="vertical-traits">
            <VerticalTraitsInput />
          </Box>
        </Grid>
        <Grid container className="" spacing={2}>
          <Grid item className="area1_grid_container" xs={12}>
            <Paper className="area1_paper" elevation={10}>
              <Box className="area1_box">
                <Box className="area11_box">
                  <Box className="text_box">
                    <Box className="text_box_container">
                      <Box className="text_in_box">
                        <Typography className="text_value_box" component="p">
                          <Box className="text_value">
                            {collectionStats == null
                              ? "-"
                              : collectionStats.total_supply}
                          </Box>
                        </Typography>
                      </Box>
                      <Typography className="text_title" component="p">
                        SUPPLY
                      </Typography>
                    </Box>
                  </Box>
                  <Box className="text_box">
                    <Box className="text_box_container">
                      <Box className="text_in_box">
                        <Typography className="text_value_box" component="p">
                          <Box className="text_value">
                            {collectionStats == null
                              ? "-"
                              : collectionStats.num_owners}
                          </Box>
                        </Typography>
                      </Box>
                      <Typography className="text_title" component="p">
                        HOLDERS
                      </Typography>
                    </Box>
                  </Box>
                  <Box className="text_box" style={{ marginRight: 0 }}>
                    <Box className="text_box_container">
                      <Box className="text_in_box">
                        <Typography className="text_value_box" component="p">
                          <Box className="text_value">{"-" + "%"}</Box>
                        </Typography>
                      </Box>
                      <Typography className="text_title" component="p">
                        ROYALTY
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <hr className="area_underline"></hr>
                <Box className="area11_box">
                  <Box className="text_box">
                    <Box className="text_box_container">
                      <Box className="text_in_box">
                        <Typography className="text_value_box" component="p">
                          <Box className="text_value">
                            {collectionStats == null
                              ? "-"
                              : collectionStats.one_day_sales}
                          </Box>
                        </Typography>
                      </Box>
                      <Typography className="text_title" component="p">
                        1D SALES
                      </Typography>
                    </Box>
                  </Box>
                  <Box className="text_box">
                    <Box className="text_box_container">
                      <Box className="text_in_box">
                        <Typography className="text_value_box" component="p">
                          <Box className="text_value">{"-"}</Box>
                        </Typography>
                      </Box>
                      <Typography className="text_title" component="p">
                        1H SALES
                      </Typography>
                    </Box>
                  </Box>
                  <Box className="text_box">
                    <Box className="text_box_container">
                      <Box className="text_in_box">
                        <Typography className="text_value_box" component="p">
                          <Box className="text_value">{"-"}</Box>
                        </Typography>
                      </Box>
                      <Typography className="text_title" component="p">
                        10MIN SALES
                      </Typography>
                    </Box>
                  </Box>
                  <Box className="text_box" style={{ marginRight: 0 }}>
                    <Box className="text_box_container">
                      <Box className="text_in_box">
                        <Typography className="text_value_box" component="p">
                          <Box className="text_value">
                            <img src={ethIcon} />
                            &nbsp;-
                          </Box>
                        </Typography>
                      </Box>
                      <Typography className="text_title" component="p">
                        1H FLOOR
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <hr className="area_underline"></hr>
                <Box className="area11_box">
                  <Box className="text_box">
                    <Box className="text_box_container">
                      <Box className="text_in_box">
                        <Typography className="text_value_box" component="p">
                          <Box className="text_value">{"-"}</Box>
                        </Typography>
                      </Box>
                      <Typography className="text_title" component="p">
                        LISTINGS
                      </Typography>
                    </Box>
                  </Box>
                  <Box className="text_box">
                    <Box className="text_box_container">
                      <Box className="text_in_box">
                        <Typography className="text_value_box" component="p">
                          <Box className="text_value">{"-"}</Box>
                        </Typography>
                      </Box>
                      <Typography className="text_title" component="p">
                        NEW LISTINGS
                      </Typography>
                    </Box>
                  </Box>
                  <Box className="text_box">
                    <Box className="text_box_container">
                      <Box className="text_in_box">
                        <Typography className="text_value_box" component="p">
                          <Box className="text_value">
                            <img src={ethIcon} />
                            &nbsp;
                            {collectionStats == null
                              ? "-"
                              : collectionStats.floor_price}
                          </Box>
                        </Typography>
                      </Box>
                      <Typography className="text_title" component="p">
                        FLOOR
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item className="area2_grid_container" xs={12} sm={6} lg={3}>
            <Box className="area_title_box">
              <Typography className="area_title" component="span">
                {"LISTINGS(" + orderData.length + ")"}
              </Typography>
              <Box className="area2_sort_box">
                <IconButton
                  aria-label="sort_icon"
                  className="sort_icon"
                  onClick={toggleSort}
                >
                  <SortIcon
                    style={
                      sortType
                        ? { transform: "rotate(0deg)" }
                        : { transform: "rotate(180deg)" }
                    }
                  />
                </IconButton>
                <PriceButton
                  item={["Price", "Rank", "Date"]}
                  getSelectedValue={getSelectedValue}
                />
                <hr className="listings_underline"></hr>
                <Checkbox className="listings_checkbox" />
              </Box>
            </Box>
            <Box className="area_card_list_box">
              <Box className="trades_item_box">
                <Box className="yakuza-no-scroll" sx={{ overflowY: "scroll" }}>
                  <Box
                    className="trades-item-box-in"
                    sx={{ position: "relative" }}
                  >
                    <Box sx={{ width: "100%" }}>
                      {listingDataToShow.length > 0 ? (
                        listingDataToShow.map((item, index) => (
                          <ListingsCard
                            key={index}
                            index={index}
                            data={item}
                            getChildClick={getChildClick}
                          />
                        ))
                      ) : (
                        <Stack
                          sx={{ width: "100%", color: "grey.500" }}
                          spacing={2}
                        >
                          <LinearProgress color="inherit" />
                        </Stack>
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
          </Grid>
          <Grid item className="area3_grid_container" xs={12} sm={6} lg={3}>
            <Box className="area_title_box">
              <Typography className="area_title" component="span">
                {"TRADES(" + tradesData.length + ")"}
              </Typography>
            </Box>
            <Box className="area_card_list_box">
              <Box className="trades_item_box">
                <Box className="yakuza-no-scroll" sx={{ overflowY: "scroll" }}>
                  <Box
                    className="trades-item-box-in"
                    sx={{ position: "relative" }}
                  >
                    <Box sx={{ width: "100%" }}>
                      {tradesData.length > 0 ? (
                        tradesData.map((item, index) => (
                          <TradesCrad
                            key={index}
                            index={index}
                            data={item}
                            getChildClick={getChildClick}
                          />
                        ))
                      ) : (
                        <Stack
                          sx={{ width: "100%", color: "grey.500" }}
                          spacing={2}
                        >
                          <LinearProgress color="inherit" />
                        </Stack>
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
          </Grid>
          <Grid
            item
            className="area4_grid_container"
            xs={12}
            sm={12}
            lg={6}
            style={{ marginBottom: 100 }}
          >
            <Box className="trades-chart-box">
              <TradesChart />
            </Box>
            <hr className="trades-underline" />
            <Grid container className="listing-chart-grid" whiteSpace={2}>
              <Grid item className="listing-chart-grid-item-1" xs={12} sm={6}>
                <ListeningBarChart />
              </Grid>
              <Grid item className="listing-chart-grid-item-2" xs={12} sm={6}>
                <ThresholdChart />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {open && (
          <DetailModal
            open={open}
            onClose={handleClose}
            modalData={modalData}
          />
        )}
      </Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={buyOpen}
        onClose={handleBuyClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={buyOpen}>
          <Box sx={ModalStyle}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Pelease Wait!
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Transaction is happen soon.
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};
export default memo(connect(mapStatetoProps, mapDispatchToProps)(LiveView));
