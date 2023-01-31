import React, { Component } from "react";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
  Container,
  Typography,
  Button,
} from "@mui/material";
import "./style.scss";
import metaMaskSvg from "../../assets/metamask.svg";
import Footer from "../../layout/Footer";
import Header from "../../layout/Header";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Buffer } from "buffer";
import { authenticated } from "../../actions/login";

function mapStatetoProps(state) {
  return {
    // user: state.user,
    authenticated: state.authenticated,
    metaMask: state.metaMask,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setAuthenticate: (flag) => dispatch(authenticated(flag)),
  };
}

const SignIn = (props) => {
  const [state, setState] = React.useState({
    terms: false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const onSignin = async (event) => {
    if (props.metaMask.connected) {
      // signin
      const generatedNonce = Math.floor(Math.random() * 1000000).toString();
      const message =
        'Welcome to YakuzaTool! \n Click "sign" to sign in. This request will not trigger a blockchain transaction or cost any gas fees.\n Nonce:\n ' +
        generatedNonce;
      try {
        const from = props.metaMask.accounts[0];
        const msg = `0x${Buffer.from(message, "utf8").toString("hex")}`;

        const sign = await window.ethereum.request({
          method: "personal_sign",
          params: [msg, from, "Example password"],
        });
        console.log(sign);
        props.setAuthenticate(true);
      } catch (err) {
        console.error(err);
        props.setAuthenticate(false);
      }
    } else {
      // connect
    }
  };

  const { terms } = state;

  return (
    <div>
      <Header {...props} />
      {props.authenticated ? (
        <Box className="welcome_signin">
          <Container className="" maxWidth="lg">
            <Box className="welcome_signin_box">
              <h3>You are signed in</h3>
              <Link to="/trending">Show trending</Link>
            </Box>
          </Container>
        </Box>
      ) : (
        <Box className="connect_wallet">
          <Container maxWidth="xs">
            <Box
              sx={{
                marginTop: "40px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box sx={{ marginBottom: "16px" }}>
                <Typography variant="h4" className="title">
                  {props.metaMask.connected
                    ? "Welcome to YakuzaTool"
                    : "Connect your wallet"}
                </Typography>
              </Box>
              <Button
                variant="outlined"
                className="connectBtn"
                disabled={!terms && props.metaMaskConnected}
                onClick={onSignin}
              >
                <img src={metaMaskSvg} alt="symbol" height="14" />
                <div style={{ paddingLeft: "8px" }}>
                  {props.metaMask.connected ? "SIGN IN" : "CONNECT"}
                </div>
              </Button>
              <Box
                sx={{ width: "100%", marginTop: "24px", marginBottom: "40px" }}
              >
                <FormGroup sx={{ display: "flex", flexFlow: "column wrap" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={terms}
                        name="terms"
                        className="terms"
                        onChange={handleChange}
                      />
                    }
                    label={
                      <Typography className="readme">
                        I have read,understand and agree to NFTNerd's{" "}
                        <a href="/disclaimer" className="disclaimer">
                          Disclaimer
                        </a>{" "}
                        as well as{" "}
                        <a href="/tos" className="tos">
                          Terms of Service and Privacy Policy
                        </a>
                      </Typography>
                    }
                  />
                </FormGroup>
              </Box>
              <Link className="back_home_btn" to={"/"}>
                GO TO HOME PAGE
              </Link>
            </Box>
          </Container>
        </Box>
      )}

      <Footer />
    </div>
  );
};

export default connect(mapStatetoProps, mapDispatchToProps)(SignIn);
