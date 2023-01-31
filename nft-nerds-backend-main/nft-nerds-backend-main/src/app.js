/**
 * Init file
 *
 * @package    src
 * @author     Jose Cruz <topdeveloper1228@gmail.com>
 * @copyright  2022
 * @license    Turing License
 * @version    2.0
 * @link       https://turing.ly
 */

var express = require("express");
var path = require("path");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
const dotenv = require("dotenv");
var apiRouter = require("./routes/index");
const cron = require("node-cron");
const axios = require("axios");
var authMiddleware = require("./middleware/auth-middleware");
const { ValidationError } = require("express-validation");
var Web3 = require("web3");
const web3 = new Web3(
  new Web3.providers.WebsocketProvider(process.env.APP_NODE)
);
const Moralis = require("moralis/node");
const { OpenSeaStreamClient } = require("@opensea/stream-js");
const { WebSocket } = require("ws");
const client = new OpenSeaStreamClient({
  token: "df585c90219b49cfacc006eb0b0ea9ea",
  connectOptions: {
    transport: WebSocket,
  },
  apiUrl: "wss://stream.openseabeta.com/socket",
});
const moment = require("moment");
const contractModel = require("./models/web/contract/contract-model");
const transactionModel = require("./models/web/transaction/transaction-model");
const tokenHelper = require("./helper/tokenHelper");
const message = require("./constants/message");

dotenv.config();
const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "../public/upload")));
app.use(express.static(path.join(__dirname, "assets")));
app.set("views", path.join(__dirname, "views"));
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

app.use("/api", apiRouter);

// connect the opensea event web socket
client.connect();

/**
 * Function that create new transactions with opensea stream js (SOLD)
 *
 * @author  Jose Cruz <topdeveloper1228@gmail.com>
 */
client.onItemSold("*", async (event) => {
  try {
    if (event.payload.item.chain.name === "ethereum") {
      const address = event.payload.item.nft_id.split("/")[1];

      const collection = await axios.get(
        `https://api.opensea.io/api/v1/asset_contract/${address}`,
        {
          Accept: "application/json",
          headers: {
            "X-API-KEY": "df585c90219b49cfacc006eb0b0ea9ea",
          },
        }
      );

      // save the data to contracts table
      const contract = await contractModel.getContractByContractAddress(
        "",
        address
      );
      if (contract.message && contract.message === message.DATA_NOT_EXIST) {
        const data = {
          contract_address: address,
          block_number: 0,
          image_url:
            collection.data.collection.image_url != undefined &&
            collection.data.collection.image_url != null
              ? collection.data.collection.image_url
              : "",
          name:
            collection.data.collection.name != undefined &&
            collection.data.collection.name != null
              ? collection.data.collection.name
              : "",
          slug: event.payload.collection.slug,
        };

        const resInsert = await contractModel.createContract("", data);

        // save the data to transactions table
        const transactionData = {
          contract_id: resInsert.result.insertId,
          contract_address: address,
          image_url:
            collection.data.collection.image_url != undefined &&
            collection.data.collection.image_url != null
              ? collection.data.collection.image_url
              : "",
          name:
            collection.data.collection.name != undefined &&
            collection.data.collection.name != null
              ? collection.data.collection.name
              : "",
          slug: event.payload.collection.slug,
          transaction_hash: event.payload.transaction.hash,
          price: event.payload.sale_price,
          event_timestamp: event.payload.event_timestamp,
        };

        await transactionModel.createTransaction(
          resInsert.result.insertId,
          transactionData
        );
      } else {
        // save the data to transactions table
        const transactionData = {
          contract_id: contract.id,
          contract_address: address,
          image_url:
            collection.data.collection.image_url != undefined &&
            collection.data.collection.image_url != null
              ? collection.data.collection.image_url
              : "",
          name:
            collection.data.collection.name != undefined &&
            collection.data.collection.name != null
              ? collection.data.collection.name
              : "",
          slug: event.payload.collection.slug,
          transaction_hash: event.payload.transaction.hash,
          price: event.payload.sale_price,
          event_timestamp: event.payload.event_timestamp,
        };

        await transactionModel.createTransaction(contract.id, transactionData);
      }
    }
  } catch (err) {
    // console.log("err", err);
  }
});

/**
 * Function that remove transactions before 7 days with cron schedule
 *
 * @author  Jose Cruz <topdeveloper1228@gmail.com>
 */
cron.schedule("0 0 0 * * *", async () => {
  try {
    await transactionModel.deleteTransaction("", 7);
  } catch (err) {
    // console.log("err", err);
  }
});

module.exports = app;
