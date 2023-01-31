import React, { Component, useEffect, userEffect } from "react";
import { connect } from "react-redux";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import SvgIcon from "@mui/material/SvgIcon";
import etherIcon from "../../assets/eth-icon.svg";
// import logo from '../../assets/logo.svg';
import metamaskIcon from "../../assets/metamask.svg";
import MetaMaskOnboarding from "@metamask/onboarding";
import "./style.scss";
import DefaultSnakeBar from "../../components/modals/snakebar";
import { Buffer } from "buffer";
import { metaMask } from "../../actions/login";
import { authenticated } from "../../actions/login";
import SignOutModal from "../../components/modals/signout";
import { withRouter } from "react-router";
import logo from "../../assets/logo.png";

// redux

import { CollectionSearchData } from "../../actions/collections";

function mapStatetoProps(state) {
  return {
    authenticated: state.authenticated,
    metaMask: state.metaMask,
    searchResult: state.collectionSearch.searchResultData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setMetaMask: (info) => dispatch(metaMask(info)),
    setAuthenticate: (flag) => dispatch(authenticated(flag)),
    getSearchResult: (key) => dispatch(CollectionSearchData(key)),
  };
}

const filter = createFilterOptions();

const { isMetaMaskInstalled } = MetaMaskOnboarding;

const Header = (props) => {
  const [value, setValue] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [snakeOpen, setSnakeOpen] = React.useState(false);
  const [accounts, setAccounts] = React.useState(props.metaMask.accounts);
  const [hideSigninBtn, setHideSigninBtn] = React.useState(false);
  const [signOut, setSignOut] = React.useState(false);

  //search collection
  const [searchDataSource, setSearchDataSource] = React.useState([]);

  useEffect(async () => {
    if (localStorage.getItem("authenticated") == true) {
      props.setAuthenticate(true);
    } else if (!props.metaMask.connected) {
      try {
        const newAccounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        handleNewAccounts(newAccounts);
      } catch (err) {
        console.error("Error on init when getting accounts", err);
      }
    }
  }, []);

  useEffect(() => {
    let temp = props.searchResult;
    if (temp.length != 0) {
      for (let i = 0; i < temp.data.length; i++) {
        let addr = temp.data[i].contract_address;
        temp.data[i].display_address =
          addr.substr(0, 8) + "..." + addr.slice(-8);
      }

      setSearchDataSource(temp.data);
      // if(searchDataSource.length != 0) console.log('++++++++++', searchDataSource);
    }
  }, [props.searchResult]);

  useEffect(() => {
    console.log("ss", props.authenticated);
  }, [props.authenticated]);

  const onFavorite = (e) => {
    setModalOpen(true);
  };

  const handleSnakeClose = () => {
    setSnakeOpen(false);
  };

  const handleSignOutClose = () => {
    setSignOut(false);
  };

  const handleSignOut = () => {
    setSignOut(false);
    props.setAuthenticate(false);
    props.history.push("/signin");
  };

  const isMetaMaskConnected = () => accounts && accounts.length > 0;

  const getDisplayAddress = () => {
    let account;
    if (props.metaMask.accounts && props.metaMask.accounts.length > 0) {
      account = props.metaMask.accounts[0];
    } else if (localStorage.getItem("accounts")) {
      account = localStorage.getItem("accounts");
    } else {
      return "";
    }
    return (
      account.substring(0, 4) +
      "..." +
      account.substring(account.length - 4, account.length)
    );
  };

  function handleNewAccounts(newAccounts) {
    setAccounts(newAccounts);

    const connected = newAccounts && newAccounts.length > 0;
    props.setMetaMask({ connected: connected, accounts: newAccounts });
  }

  const personalSign = async () => {
    const generatedNonce = Math.floor(Math.random() * 1000000).toString();
    const message =
      'Welcome to YakuzaTool! \n Click "sign" to sign in. This request will not trigger a blockchain transaction or cost any gas fees.\n Nonce:\n ' +
      generatedNonce;
    try {
      const from = accounts[0];
      const msg = `0x${Buffer.from(message, "utf8").toString("hex")}`;

      const sign = await window.ethereum.request({
        method: "personal_sign",
        params: [msg, from, "Example password"],
      });
      console.log(sign);
    } catch (err) {
      console.error(err);
    }
  };

  const onSignin = async (e) => {
    if (isMetaMaskInstalled()) {
      console.log("installed metamask");
      console.log(accounts);
      if (isMetaMaskConnected()) {
        console.log("**** metamask connnected");
        console.log(accounts);
        if (!accounts) {
          try {
            const newAccounts = await window.ethereum.request({
              method: "eth_accounts",
            });
            console.log(newAccounts);
            handleNewAccounts(newAccounts);
          } catch (err) {
            console.error("Error on init when getting accounts", err);
          }
        } else {
          console.log("***** personal sign started");
          // go to signin page
          console.log(props);
          if (props.location.pathname == "/signin") {
            setHideSigninBtn(true);
          } else {
            props.history.push("/signin");
          }
          // personalSign();
        }
      } else {
        console.log("**** metamask not connected");
        try {
          const newAccounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          handleNewAccounts(newAccounts);
          console.log(newAccounts);
        } catch (error) {
          console.error(error);
        }
      }
    } else {
      setSnakeOpen(true);
    }
  };

  const onSignout = (e) => {
    // show signout modal
    setSignOut(true);
  };

  const [oldData, setOldData] = React.useState("");
  const searchCollectionData = (key) => {
    if (key != oldData) {
      props.getSearchResult(key);
      setOldData(key);
      setValue(key);
      console.log("++++++++++++++++++key", key);
    }
  };

  const gotoDetailPage = (data) => {
    props.history.push(`/collection/${data.contract_address}`);
    window.location.reload();
  };

  return (
    <Box className="header">
      <Link href="/" className="brand">
        <img src={logo} alt="YakuzaTool.ai logo" className="brand-logo" />
      </Link>
      <Box className="search-bar">
        <Autocomplete
          ListboxProps={{
            style: {
              backgroundColor: "rgb(34, 24, 75)",
              overflowY: "scroll",
              textOverflow: "ellipsis",
              borderBottomRightRadius: 8,
              borderBottomLeftRadius: 8,
            },
          }}
          value={value}
          onChange={(event, newValue, option) => {
            if (typeof newValue === "string") {
              setValue({
                name: newValue,
              });
            } else if (newValue && newValue.inputValue) {
              // Create a new value from the user input
              setValue({
                name: newValue.inputValue,
              });
            } else {
              setValue(newValue);
            }
            console.log("event", newValue);
            if (newValue) {
              gotoDetailPage(newValue);
            }
          }}
          // filterOptions={(options, params) => {
          //   const filtered = filter(options, params);
          //   return filtered;
          // }}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          id="free-solo-with-text-demo"
          options={searchDataSource}
          getOptionLabel={(option) => {
            // Value selected with enter, right from the input
            if (typeof option === "string") {
              return option;
            }
            // Add "xxx" option created dynamically
            if (option.inputValue) {
              return option.inputValue;
            }
            if (value != null && value.indexOf("0x") == 0) {
              return option.contract_address;
            }

            // Regular option
            return option.name;
          }}
          onInputChange={(event, value) => searchCollectionData(value)}
          renderOption={(props, option) => (
            <Link
              {...props}
              className="search-hint"
              style={{ textDecoration: "none" }}
              to={`/collection/${option.contract_address}`}
              key={option.contract_address}
            >
              <img
                src={
                  option.image_url == null ||
                  option.image_url == "" ||
                  option.image_url == "null"
                    ? etherIcon
                    : option.image_url
                }
                width={30}
                height={30}
                style={{ borderRadius: "50%" }}
              />
              <Box className="details">
                <h6>{option.name}</h6>
                <span>{option.display_address}</span>
              </Box>
            </Link>
          )}
          sx={{ width: 300 }}
          freeSolo
          renderInput={(params) => (
            <TextField
              {...params}
              style={{ color: "rgb(255,255,255" }}
              placeholder="Search by address, name or slug..."
            />
          )}
        />
      </Box>

      <Box className="breadcrum">
        <a href="/customAlerts">CUSTOM ALERTS</a>
        <a href="/trending">WHAT'S HOT</a>
        <a href="/asset">ASSET</a>
        <a href="/faq">FAQ</a>
        <Box onClick={onFavorite} className="favorite-btn">
          <SvgIcon>
            <path d="M15 7v12.97l-4.21-1.81-.79-.34-.79.34L5 19.97V7h10m4-6H8.99C7.89 1 7 1.9 7 3h10c1.1 0 2 .9 2 2v13l2 1V3c0-1.1-.9-2-2-2zm-4 4H5c-1.1 0-2 .9-2 2v16l7-3 7 3V7c0-1.1-.9-2-2-2z"></path>
          </SvgIcon>
          <SvgIcon>
            <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
          </SvgIcon>
        </Box>
      </Box>
      {!hideSigninBtn && (
        <Button
          variant="outlined"
          className="auth-btn"
          onClick={props.authenticated ? onSignout : onSignin}
        >
          <img src={metamaskIcon} alt="Metamask logo"></img>
          {props.authenticated ? (
            <p>{getDisplayAddress()}</p>
          ) : (
            <p>{props.metaMask.connected ? "Sign in" : "Connect"}</p>
          )}
        </Button>
      )}
      <DefaultSnakeBar
        open={snakeOpen}
        handleClose={handleSnakeClose}
        vertical="top"
        horizontal="left"
      />
      <SignOutModal
        open={signOut}
        handleClose={handleSignOutClose}
        address={
          props.metaMask.accounts && props.metaMask.accounts.length > 0
            ? props.metaMask.accounts[0]
            : localStorage.getItem("accounts")
            ? localStorage.getItem("accounts")
            : ""
        }
        handleSignOut={handleSignOut}
      />
    </Box>
  );
};

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Header));
