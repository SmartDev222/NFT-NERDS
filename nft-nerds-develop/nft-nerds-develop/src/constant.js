import momentTz from "moment-timezone";
import moment from "moment";
import * as Web3 from "web3";
import { OpenSeaPort, Network } from "opensea-js";
import { OrderSide } from "opensea-js/lib/types";
import detectEthereumProvider from "@metamask/detect-provider";

export const getLocalToUtc = (time) => {
  let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  let currentDate = momentTz.tz(time, timezone);
  currentDate.format();
  let convertedDate = momentTz
    .tz(currentDate, "UTC")
    .format("YYYY-MM-DD HH:mm:ss");

  return convertedDate;
};
export const getUtcToLocal = (time) => {
  let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  let currentDate = momentTz.tz(time, "UTC");
  currentDate.format();
  let convertedDate = momentTz
    .tz(currentDate, timezone)
    .format("YYYY-MM-DD HH:mm:ss");
  return convertedDate;
};
export const getTimeDiff = (time) => {
  let localTime = moment(new Date(), "YYYY-MM-DD HH:mm:ss");
  let eventTime = moment(time, "YYYY-MM-DD HH:mm:ss");

  let duration = moment.duration(localTime.diff(eventTime));
  let days = duration.get("day");
  let hours = duration.get("hours");
  let minutes = duration.get("minutes");
  let seconds = duration.get("seconds");
  if (days == 0) {
    if (hours == 0) {
      if (minutes == 0) return seconds + " sec";
      else return minutes + " min";
    } else return hours + " hour";
  } else return days == 1 ? "a day" : days + " day";
};
export const buyFunction = async (data) => {
  console.log("data", data);
  let tokenAddress = data.asset.asset_contract.address;
  let tokenId = data.asset.token_id;
  let flag = false;
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
    flag = true;
  } catch (error) {
    console.error("sss", error);
    window.alert(error);
  }
  return flag;
};
