import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import etherLogo from "../../assets/etherLogo.svg";
import "./style.scss";
import { getLocalToUtc, getTimeDiff, getUtcToLocal } from "../../constant";

const CustomAlertsItem = (props) => {
  const item = props.data.payload;

  const eventType = props.data.event_type;
  const getMouseOver = props.getMouseOver;

  const index = props.index;
  const getClick = props.getChildClick;

  const [displayData, setDisplayData] = useState([]);
  const [isListingFlag, setIsListingFlag] = useState(true);
  let tempData = {};
  const makeData = () => {
    if (eventType == "item_listed") {
      setIsListingFlag(true);
      tempData.image_url = item.item.metadata.image_url;
      if (
        tempData.image_url == "" ||
        tempData.image_url == null ||
        tempData.image_url == "null"
      )
        tempData.image_url = etherLogo;
      let price_temp = item.base_price / 1000000000;
      tempData.price = price_temp / 1000000000;
      tempData.price = parseFloat(tempData.price.toFixed(3));
      let temp_name = "";

      if (item.item.metadata.name != null) {
        if (item.item.metadata.name.indexOf("#") >= 0) {
          temp_name = item.item.metadata.name.split("#");

          if (temp_name.length > 0) {
            if (temp_name[0].length > 20) {
              tempData.collectionName = temp_name[0].substr(0, 20) + "...";
            } else tempData.collectionName = temp_name[0];
            tempData.token_id = temp_name[1];
            if (tempData.token_id.indexOf(" ") >= 0) {
              tempData.token_id = tempData.token_id.split(" ")[1];
            }
          } else {
            if (item.item.metadata.name.length > 20) {
              tempData.collectionName =
                item.item.metadata.name.substr(0, 20) + "...";
            } else tempData.collectionName = item.item.metadata.name;
            tempData.token_id = "";
          }
        } else {
          if (item.item.metadata.name.length > 20) {
            tempData.collectionName =
              item.item.metadata.name.substr(0, 20) + "...";
          } else tempData.collectionName = item.item.metadata.name;
          tempData.token_id = "";
        }
      } else {
        tempData.collectionName = "Unknown";
        tempData.token_id = "";
      }

      let contract_address = item.item.nft_id.split("/")[1];

      tempData.openseaUrl = item.item.permalink;
      tempData.etherscanUrl =
        "https://etherscan.io/token/" +
        contract_address +
        "?a=" +
        tempData.token_id;
      // console.log('++++', tempData);
    } else if (eventType == "item_sold") {
      setIsListingFlag(false);
      tempData.image_url = item.item.metadata.image_url;
      if (
        tempData.image_url == "" ||
        tempData.image_url == null ||
        tempData.image_url == "null"
      )
        tempData.image_url = etherLogo;
      let price_temp = item.sale_price / 1000000000;
      tempData.price = price_temp / 1000000000;
      tempData.price = parseFloat(tempData.price.toFixed(3));
      let temp_name = "";

      if (item.item.metadata.name != null) {
        if (item.item.metadata.name.indexOf("#") >= 0) {
          temp_name = item.item.metadata.name.split("#");

          if (temp_name.length > 0) {
            if (temp_name[0].length > 20) {
              tempData.collectionName = temp_name[0].substr(0, 20) + "...";
            } else tempData.collectionName = temp_name[0];
            tempData.token_id = temp_name[1];
            if (tempData.token_id.indexOf(" ") >= 0) {
              tempData.token_id = tempData.token_id.split(" ")[1];
            }
          } else {
            if (item.item.metadata.name.length > 20) {
              tempData.collectionName =
                item.item.metadata.name.substr(0, 20) + "...";
            } else tempData.collectionName = item.item.metadata.name;
            tempData.token_id = "";
          }
        } else {
          if (item.item.metadata.name.length > 20) {
            tempData.collectionName =
              item.item.metadata.name.substr(0, 20) + "...";
          } else tempData.collectionName = item.item.metadata.name;
          tempData.token_id = "";
        }
      } else {
        tempData.collectionName = "Unknown";
        tempData.token_id = "";
      }

      let contract_address = item.item.nft_id.split("/")[1];

      tempData.openseaUrl = item.item.permalink;
      tempData.etherscanUrl =
        "https://etherscan.io/token/" +
        contract_address +
        "?a=" +
        tempData.token_id;
    }
    let eventTime = getUtcToLocal(item.event_timestamp);
    let timeDiff = getTimeDiff(eventTime);
    tempData.timeDiff = timeDiff;
    console.log("timediff", tempData.timeDiff);
    setDisplayData(tempData);
  };

  useEffect(() => {
    makeData();
  }, [props.data]);

  return (
    <Box
      sx={{
        height: "60px",
        left: "0px",
        position: "absolute",
        top: index * 60 + "px",
        width: "100%",
        paddingTop: "8px",
      }}
      onMouseOver={getMouseOver}
    >
      <Box>
        <Box className="customAlerts-item">
          <Box className="item-wrapper">
            <Box
              sx={{ display: "flex" }}
              onClick={() => getClick("modal", item)}
            >
              <img
                src={displayData.image_url}
                alt=""
                width="48"
                height="48"
                style={{ objectFit: "contain", borderRadius: "4px" }}
              />
              <Box className="description">
                <Typography variant="body2" className="title">
                  {displayData.collectionName}
                  <span className="id">
                    {displayData.token_id != ""
                      ? "# " + displayData.token_id
                      : ""}
                  </span>
                </Typography>
                <Box className="content">
                  <Box className="content">
                    <Typography
                      variant="body2"
                      className="rank"
                      aria-label="Rank 9909/10000, top 42%"
                    >
                      Rank:{" "}
                      <span
                        style={{ color: "rgb(153, 188, 175)", fontWeight: 600 }}
                      >
                        ?
                      </span>
                    </Typography>
                  </Box>
                  <Typography variant="subtitle2" className="symbol-add">
                    |
                  </Typography>
                  <Typography variant="subtitle2" className="time">
                    {displayData.timeDiff + "  ago"}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                webkitBoxAlign: "end",
                alignItems: "end",
              }}
            >
              <Box className="content" onClick={() => getClick("modal", item)}>
                <Box className="content">
                  <img
                    src="assets/images/icons/eth-icon.svg"
                    alt="ETH"
                    style={{ height: "11px", paddingRight: "5px" }}
                  />
                  <Typography variant="body2" className="quantity">
                    {displayData.price}
                  </Typography>
                </Box>
                <Box className="content">
                  <a
                    className="MuiTypography-root MuiTypography-inherit MuiLink-root MuiLink-underlineAlways css-6jpeea"
                    target="_blank"
                    rel="noreferrer"
                    href={displayData.openseaUrl}
                  >
                    <img
                      src="assets/images/icons/opensea_dark.svg"
                      alt=""
                      height="19"
                    />
                  </a>
                  <a
                    className="MuiTypography-root MuiTypography-inherit MuiLink-root MuiLink-underlineAlways css-lfh6tr"
                    target="_blank"
                    rel="noreferrer"
                    href={displayData.etherscanUrl}
                  >
                    <img
                      src="assets/images/icons/etherscan.svg"
                      alt=""
                      height="19"
                    />
                  </a>
                </Box>
              </Box>
              {isListingFlag && (
                <div
                  className="MuiButtonBase-root MuiChip-root MuiChip-outlined MuiChip-sizeSmall MuiChip-colorSuccess MuiChip-clickable MuiChip-clickableColorSuccess MuiChip-outlinedSuccess btn-buy"
                  tabIndex="0"
                  role="button"
                  onClick={() => getClick("buy", item)}
                >
                  <span className="MuiChip-label MuiChip-labelSmall label-buy">
                    BUY
                  </span>
                  <span className="MuiTouchRipple-root css-w0pj6f"></span>
                </div>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CustomAlertsItem;
