import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import etherIcon from "../../assets/eth-icon.svg";
import OpenseaIcon from "../../assets/opensea_dark.svg";
import etherLogo from "../../assets/etherLogo.svg";
import etherscanIcon from "../../assets/etherscan.svg";
import "./style.scss";

const ListingsCard = (props) => {
  const item = props.data;
  const index = props.index;
  const getClick = props.getChildClick;
  return (
    <>
      {item.asset != null && (
        <Box
          sx={{
            height: "60px",
            left: "0px",
            position: "absolute",
            top: index * 60 + "px",
            width: "100%",
            paddingTop: "8px",
          }}
        >
          <Box>
            <Box className="listings-item">
              <Box className="item-wrapper">
                <Box
                  sx={{ display: "flex" }}
                  onClick={() => getClick("modal", item)}
                >
                  <img
                    src={
                      item.asset.image_url == null
                        ? etherLogo
                        : item.asset.image_url
                    }
                    alt=""
                    width="48"
                    height="48"
                    style={{ objectFit: "contain", borderRadius: "4px" }}
                  />
                  <Box className="description">
                    <Typography variant="body2" className="title">
                      Rank<span className="id">{index}</span>
                    </Typography>
                    <Box className="content">
                      <Box className="content">
                        <Typography
                          variant="body2"
                          className="rank"
                          aria-label="Rank 9909/10000, top 42%"
                        >
                          <span
                            style={{
                              color: "rgb(153, 188, 175)",
                              fontWeight: 600,
                            }}
                          >
                            #
                            {item.asset.token_id.length < 10
                              ? item.asset.token_id
                              : item.asset.token_id.substr(0, 10) + "..."}
                          </span>
                        </Typography>
                      </Box>
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
                  <Box className="content">
                    <Box
                      className="content"
                      onClick={() => getClick("modal", item)}
                    >
                      <img
                        src={etherIcon}
                        alt="ETH"
                        style={{ height: "11px", paddingRight: "5px" }}
                      />
                      <Typography variant="body2" className="quantity">
                        {item.base_price}
                      </Typography>
                    </Box>
                    <Box className="content">
                      <Box
                        className="MuiButtonBase-root MuiChip-root MuiChip-outlined MuiChip-sizeSmall MuiChip-colorSuccess MuiChip-clickable MuiChip-clickableColorSuccess MuiChip-outlinedSuccess css-xuh3jd"
                        onClick={() => getClick("buy", item)}
                      >
                        <Typography
                          variant="span"
                          className="MuiChip-label MuiChip-labelSmall css-1pjtbja"
                        >
                          BUY
                        </Typography>
                        <Typography
                          variant="span"
                          className="MuiTouchRipple-root css-w0pj6f"
                        ></Typography>
                      </Box>
                      <a
                        className="MuiTypography-root MuiTypography-inherit MuiLink-root MuiLink-underlineAlways css-6jpeea"
                        target="_blank"
                        rel="noreferrer"
                        href={item.asset.permalink}
                      >
                        <img src={OpenseaIcon} alt="" height="19" />
                      </a>
                    </Box>
                  </Box>
                  <Typography className="btn-buy" variant="span">
                    {item.timeDiff + " ago"}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ListingsCard;
