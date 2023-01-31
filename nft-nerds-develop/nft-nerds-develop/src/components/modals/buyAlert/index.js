import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Modal,
  SvgIcon,
  InputBase,
  Typography,
  Checkbox,
} from "@mui/material";

import "./style.scss";

const BuyAlertModal = (props) => {
  const data = props.data;

  const state = data.state;
  const disData = data.data;
  const nftId = disData.item.nft_id;
  const address = nftId.split("/")[1];
  const id = nftId.split("/")[2];
  const etherscanUrl = "https://etherscan.io/token/" + address + "?a=" + id;
  return (
    <Modal className="css-8ndowl" open={props.open} onClose={props.onClose}>
      <Box className="css-1q1z580" tabIndex="-1">
        <Box className="css-14vpl0g yakuza-no-scroll">
          <Box className="css-jj7qqp">
            <Typography variant="h5" className="css-1k3est7">
              {state == true ? "Successful" : "Pending..."}
            </Typography>
            <SvgIcon
              onClick={props.onClose}
              className="css-s6jlyw"
              fontSize="medium"
              focusable="false"
              viewBox="0 0 24 24"
              aria-hidden="true"
              data-testid="CloseIcon"
            >
              <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </SvgIcon>
          </Box>
          <Box className="css-1g1z99s">
            <img src={disData.item.metadata.image_url} />
            <Typography
              className="css-10snf7b"
              style={{ marginLeft: "10px", marginTop: "-210px" }}
            >
              {disData.item.metadata.name}
            </Typography>
          </Box>
          <Box className="css-1m9fqvd" style={{ justifyContent: "end" }}>
            <a href={disData.item.permalink} target="_blank">
              <Button
                variant="contained"
                size="medium"
                color="primary"
                className="css-1xnig12"
              >
                Opensea
              </Button>
            </a>
            <a href={etherscanUrl} target="_blank">
              <Button
                variant="contained"
                size="medium"
                color="secondary"
                className="css-1xnig12"
                style={{ marginLeft: "10px" }}
              >
                etherscan
              </Button>
            </a>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default BuyAlertModal;
