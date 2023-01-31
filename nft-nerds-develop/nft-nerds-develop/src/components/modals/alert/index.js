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

const AlertModal = (props) => {
  return (
    <Modal className="css-8ndowl" open={props.open} onClose={props.onClose}>
      <Box className="css-1q1z580" tabIndex="-1">
        <Box className="css-14vpl0g yakuza-no-scroll">
          <Box className="css-jj7qqp">
            <Typography variant="h5" className="css-1k3est7">
              Your alerts
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
            <Typography className="css-10snf7b">No alerts added yet</Typography>
          </Box>
          <Box className="css-1m9fqvd">
            <Button
              variant="contained"
              size="medium"
              color="primary"
              className="css-1xnig12"
            >
              ADD NEW ALERT
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AlertModal;
