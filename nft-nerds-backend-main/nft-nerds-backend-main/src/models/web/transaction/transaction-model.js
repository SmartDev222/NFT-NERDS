/**
 * Auth model file
 *
 * @package   backend/src/models
 * @author    Jose Cruz <topdeveloper1228@gmail.com>
 * @copyright 2022
 * @license   Turing License
 * @version   2.0
 * @link      https://turing.ly/
 */

var db = require("../../../database/database");
var message = require("../../../constants/message");
var bcrypt = require("bcrypt-nodejs");
var table = require("../../../constants/table");
const s3Helper = require("../../../helper/s3helper");
const s3buckets = require("../../../constants/s3buckets");
const timeHelper = require("../../../helper/timeHelper");
const { sendMail } = require("../../../helper/mailHelper");
var mail = require("../../../constants/mail");
var randtoken = require("rand-token");
var code = require("../../../constants/code");
const moment = require("moment");

var transactionModel = {
  createTransaction: createTransaction,
  getTransactionByTransactionHash: getTransactionByTransactionHash,
  getTransactionByD: getTransactionByD,
  getTransactionByM: getTransactionByM,
  deleteTransaction: deleteTransaction,
};

/**
 * create transaction only transactiona table
 *
 * @author  Jose Cruz <topdeveloper1228@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function createTransaction(uid, data) {
  return new Promise((resolve, reject) => {
    let query = `Insert into ${
      table.TRANSACTIONS
    } (contract_id, contract_address, image_url, name, slug, transaction_hash, price, created_date) values ('${uid}', '${
      data.contract_address
    }', '${data.image_url}', '${data.name}', '${data.slug}', '${
      data.transaction_hash
    }', '${parseFloat(data.price / 1000000000000000000)}', '${moment(
      data.event_timestamp
    ).format("YYYY-MM-DD HH:mm:ss")}');`;
    db.query(query, function (error, result, fields) {
      if (error) {
        reject({ message: message.INTERNAL_SERVER_ERROR });
      } else {
        resolve("ok");
      }
    });
  });
}

/**
 * get transaction by transaction hash
 *
 * @author  Jose Cruz <topdeveloper1228@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getTransactionByTransactionHash(uid, transaction_hash) {
  return new Promise((resolve, reject) => {
    let query =
      "Select * from " + table.TRANSACTIONS + " where transaction_hash = ?";

    db.query(query, [transaction_hash], (error, rows, fields) => {
      if (error) {
        reject({ message: message.INTERNAL_SERVER_ERROR });
      } else {
        if (rows.length == 0) {
          resolve({ message: message.DATA_NOT_EXIST });
        } else {
          resolve(rows[0]);
        }
      }
    });
  });
}

/**
 * get 7d vloume, 7d floor
 *
 * @author  Jose Cruz <topdeveloper1228@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getTransactionByD(uid, duration) {
  return new Promise((resolve, reject) => {
    let from = moment()
      .subtract(duration, "minutes")
      .format("YYYY-MM-DD HH:mm:ss");
    let to = moment().format("YYYY-MM-DD HH:mm:ss");

    let query = `SELECT MIN(price) as d7_floor, SUM(price) as d7_volume, date FROM (SELECT price, DATE(created_date) as date FROM transactions WHERE created_date BETWEEN '${from}' AND '${to}' AND contract_id = ${uid}) as history GROUP BY date`;

    db.query(query, (error, rows, fields) => {
      if (error) {
        reject({ message: message.INTERNAL_SERVER_ERROR });
      } else {
        resolve(rows);
      }
    });
  });
}

/**
 * get 30m floor
 *
 * @author  Jose Cruz <topdeveloper1228@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getTransactionByM(uid, duration) {
  return new Promise((resolve, reject) => {
    let from = moment()
      .subtract(duration, "minutes")
      .format("YYYY-MM-DD HH:mm:ss");
    let to = moment().format("YYYY-MM-DD HH:mm:ss");

    let query = `SELECT MIN(price) as m30_floor, SUM(price) as m30_volume, created_date FROM (SELECT price, CAST(MINUTE(created_date) / 2  as UNSIGNED) as bi_min, created_date FROM transactions WHERE created_date BETWEEN '${from}' AND '${to}' AND contract_id = ${uid}) as history GROUP BY bi_min
`;

    db.query(query, (error, rows, fields) => {
      if (error) {
        reject({ message: message.INTERNAL_SERVER_ERROR });
      } else {
        resolve(rows);
      }
    });
  });
}

/**
 * delete transaction
 *
 * @author  Jose Cruz <topdeveloper1228@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function deleteTransaction(uid, duration) {
  return new Promise((resolve, reject) => {
    let before = moment()
      .subtract(duration, "days")
      .format("YYYY-MM-DD HH:mm:ss");

    let query =
      `DELETE FROM ` +
      table.TRANSACTIONS +
      ` WHERE created_date < '${before}';`;

    db.query(query, (error, rows, fields) => {
      if (error) {
        reject({ message: message.INTERNAL_SERVER_ERROR });
      } else {
        resolve("ok");
      }
    });
  });
}

module.exports = transactionModel;
