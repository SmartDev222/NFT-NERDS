import * as React from "react";
import {
  Box,
  Modal,
  Typography,
  Backdrop,
  Fade,
  CircularProgress,
} from "@mui/material";

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

const TransactionModal = (props) => {
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={props.close}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
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
export default TransactionModal;
