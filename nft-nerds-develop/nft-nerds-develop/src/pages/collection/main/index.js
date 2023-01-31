import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import { Link } from "react-router-dom";

//tags

import {
  Typography,
  Paper,
  Grid,
  Tab,
  Tabs,
  styled,
  Box,
  Button,
} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

//icons
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

//pages
import LiveView from "../liveView";
import Summary from "../summary";
import Holders from "../holders";
import Tokens from "../tokens";

// images
import rarityIcon from "../../../assets/rarity.svg";
import openSeaDarkIcon from "../../../assets/opensea_dark.svg";
import lookSrareIcon from "../../../assets/looksrare_dark.svg";
import etherScanIcon from "../../../assets/etherscan.svg";
import discordIcon from "../../../assets/discord_dark.svg";

import "./style.scss";
import Header from "../../../layout/Header";
import Footer from "../../../layout/Footer";

// redux
import { connect } from "react-redux";
import {
  ContractFetchData,
  CollectionAssetFetchData,
  CollectionStatsFetchData,
} from "../../../actions/collections";

//modal
import DetailModal from "../../../components/modals/Detail";
import { isOptionGroup } from "@mui/base";

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "black",
  },
  "& .MuiTabs-indicatorSpan": {
    width: "100%",
    backgroundColor: "#635ee7",
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: "rgb(134, 134, 160)",
    "&.Mui-selected": {
      color: "#8965d3",
      outline: "none",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#8965d3",
    },
  })
);

const tokenIdInputStyle = {
  width: "70px",
  fontSize: "13px",
  fontWeight: 600,
  height: "6px",
  backgroundColor: "rgb(18, 18, 18)",
  borderWidth: "0px",
  padding: "14px",
  bordeRadius: "4px",
};

function mapStatetoProps(state) {
  return {
    authenticated: state.authenticated,
    collectionDetail: state.contract,
    collectionAsset: state.collectionAsset,
    collectionStats: state.collectionStats,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getCollection: (addr) => dispatch(ContractFetchData(addr)),
    getAsset: (addr, id) => dispatch(CollectionAssetFetchData(addr, id)),
    getStats: (slug) => dispatch(CollectionStatsFetchData(slug)),
  };
}

const Collection = (props) => {
  const tabName = ["LIVE VIEW", "SUMMARY", "HOLDERS", "TOKENS"];

  const [metaProgress, setmetaProgress] = useState(100);
  const [rankProgress, setrankProgress] = useState(100);
  const [currentPage, setCurrentPage] = useState("LIVE VIEW");
  const [value, setValue] = useState("0");

  const [collectionData, setCollectionData] = useState([]);
  const [contractAddr, setContractAddr] = useState("");
  const tokenIdInputElement = useRef();

  const handleChange = (event, value) => {
    setValue(value);
    let num = parseInt(value);
    setCurrentPage(tabName[num]);
  };

  const quickLookup = () => {
    const inputValue = tokenIdInputElement.current.value;
    props.getAsset(contractAddr, inputValue);
  };

  const quickLookupEnterKeyDown = (e) => {
    const key = e.key;
    if (key == "Enter") quickLookup();
  };

  useEffect(() => {
    let addr = props.match.params.address;
    setContractAddr(addr);
    props.getCollection(addr);

    return () => {
      setContractAddr("");
    };
  }, []);

  useEffect(() => {
    let temp = props.collectionDetail;

    if (temp.length != 0) {
      temp.display_address =
        temp.address.substr(0, 8) + "..." + temp.address.slice(-8);
      temp.slug = temp.collection.slug;
      props.getStats(temp.slug);
      setCollectionData(temp);
    }
  }, [props.collectionDetail]);

  const collectionStatsData = useMemo(() => {
    return props.collectionStats;
  }, [props.collectionStats]);

  return (
    <div>
      <Header {...props} />
      <Box className="collection_container">
        <Box className="header_container">
          <Box className="sub_container">
            <Box className="name_info_container">
              <img
                height="80"
                style={{ borderRadius: "50%" }}
                alt
                src={collectionData.image_url}
              />
              <Box className="info1_container">
                <Box className="info11_container">
                  <BookmarkBorderIcon className="info_bookmarkicon" />
                  <h5 className="info_title">{collectionData.name}</h5>
                  <Box className="info_box"></Box>
                  <Box className="info_rarity">
                    <Box className="rarity_box">
                      <img className="rarity_image" src={rarityIcon} />
                      <Typography
                        className="rarity_under"
                        variant="p"
                      ></Typography>
                    </Box>
                  </Box>
                  <Box className="rarity_by"></Box>
                </Box>
                <Box
                  className="info12_container"
                  onClick={() =>
                    navigator.clipboard.writeText(collectionData.address)
                  }
                >
                  <h6 className="address">{collectionData.display_address}</h6>
                  <ContentCopyIcon className="content_copy_icon" />
                </Box>
                <Box className="info13_container">
                  <Typography
                    className="opensea_link"
                    component="a"
                    href={
                      "https://opensea.io/collection/" + collectionData.slug
                    }
                  >
                    <img src={openSeaDarkIcon} height="20" />
                  </Typography>
                  <Typography
                    className="link_style"
                    component="a"
                    href={
                      "https://looksrare.org/collections/" +
                      collectionData.address
                    }
                  >
                    <img src={lookSrareIcon} height="20" />
                  </Typography>
                  <Typography
                    className="link_style"
                    component="a"
                    href={
                      "https://etherscan.io/address/" + collectionData.address
                    }
                  >
                    <img src={etherScanIcon} height="20" />
                  </Typography>
                  <Typography
                    className="link_style"
                    component="a"
                    href="https://discord.gg/EqHZJztTRz"
                  >
                    <img src={discordIcon} height="20" />
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box className="token_id_container">
              <Box className="progress_container">
                <Box className="progress_container_box">
                  <Box className="pro_box">
                    <Box aria-label="All 9284 ranks available.">
                      <Typography className="pro_title" variant="p">
                        Metadata fetched
                      </Typography>
                      <Box className="pro_in_box">
                        <Box className="pro_value_box">
                          <LinearProgress
                            className="pro_style"
                            variant="determinate"
                            value={metaProgress}
                            color="error"
                          />
                        </Box>
                        <Box>
                          <Typography className="pro_label" component="span">
                            {metaProgress + "%"}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box className="pro_box">
                    <Box aria-label="All 9284 ranks available.">
                      <Typography className="pro_title" variant="p">
                        Ranks variety
                      </Typography>
                      <Box className="pro_in_box">
                        <Box className="pro_value_box">
                          <LinearProgress
                            className="pro_style"
                            variant="determinate"
                            value={rankProgress}
                            color="warning"
                          />
                        </Box>
                        <Box>
                          <Typography className="pro_label" component="span">
                            {rankProgress + "%"}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Paper className="token_id_paper">
                <Box className="token_id_form">
                  <Box className="token_id_form_box">
                    <Box className="token_id_input_box">
                      <input
                        name="tokenId"
                        className="token_id_input"
                        placeholder="Token ID..."
                        type="text"
                        style={tokenIdInputStyle}
                        ref={tokenIdInputElement}
                        onKeyDown={(e) => quickLookupEnterKeyDown(e)}
                      />
                    </Box>
                    <Button
                      className="quick_lookup_btn"
                      variant="text"
                      tabIndex="0"
                      size="small"
                      onClick={quickLookup}
                    >
                      Quick&nbsp;lookup
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Box>
        </Box>

        <hr class="underline" />
        <Box className="tabs_container" sx={{ width: "100%" }}>
          <StyledTabs
            className="StyledTabs"
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="full width tabs example"
            variant="fullWidth"
          >
            <StyledTab value="0" label="LIVE VIEW">
              <div className="css-1r5lo7v"></div>
            </StyledTab>
            <StyledTab value="1" label="SUMMARY" />
            <StyledTab value="2" label="HOLDERS" />
            <StyledTab value="3" label="TOKENS" />
          </StyledTabs>
        </Box>
        <Box className="switch_container">
          {currentPage == "LIVE VIEW" && (
            <LiveView
              address={contractAddr}
              collectionStats={collectionStatsData}
            />
          )}
          {currentPage == "SUMMARY" && <Summary />}
          {currentPage == "HOLDERS" && <Holders />}
          {currentPage == "TOKENS" && <Tokens />}
        </Box>
      </Box>
      <Footer />
    </div>
  );
};
export default connect(mapStatetoProps, mapDispatchToProps)(Collection);
