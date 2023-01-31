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

var contractModel = {
  getContractList: getContractList,
  getContractListPerPage: getContractListPerPage,
  getFirhoseListPerPage: getFirhoseListPerPage,
  searchContractList: searchContractList,
  getCountContractList: getCountContractList,
  createContract: createContract,
  getContract: getContract,
  getContractByContractAddress: getContractByContractAddress,
  updateContract: updateContract,
  deleteContract: deleteContract,
  deleteAllContract: deleteAllContract,
};

/**
 * get contract list
 *
 * @author  Jose Cruz <topdeveloper1228@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getContractList(uid, data) {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM contracts WHERE is_active = true`;

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
 * get contract list per page with filter
 *
 * @author  Jose Cruz <topdeveloper1228@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getContractListPerPage(uid, data) {
  return new Promise((resolve, reject) => {
    let from = moment()
      .subtract(data.duration, "minutes")
      .format("YYYY-MM-DD HH:mm:ss");
    let to = moment().format("YYYY-MM-DD HH:mm:ss");
    let sort_column = data.sort_column;
    let sort_method = data.sort_method;
    let row_count = Number(data.row_count);
    let page_num = Number(data.page_num);
    let search_key = "%" + data.search_key + "%";

    let query = `SELECT contract_id, contract_address, image_url, name, slug, COUNT(*) as trade_count, SUM(price) as volume, AVG(price) as avg_price FROM transactions WHERE created_date BETWEEN '${from}' AND '${to}' GROUP BY contract_address ORDER BY ${sort_column} ${sort_method} LIMIT ${page_num}, ${row_count};`;

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
 * get firehose list per page with filter
 *
 * @author  Jose Cruz <topdeveloper1228@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getFirhoseListPerPage(uid, data) {
  return new Promise((resolve, reject) => {
    let from = moment().subtract(5, "minutes").format("YYYY-MM-DD HH:mm:ss");
    let to = moment().format("YYYY-MM-DD HH:mm:ss");
    let sort_column = data.sort_column;
    let sort_method = data.sort_method;
    let row_count = Number(data.row_count);
    let page_num = Number(data.page_num);

    let query = `SELECT contract_id, contract_address, image_url, name, slug, COUNT(*) as trade_count, SUM(price) as volume, AVG(price) as avg_price FROM transactions WHERE created_date BETWEEN '${from}' AND '${to}' GROUP BY contract_address ORDER BY ${sort_column} ${sort_method} LIMIT ${page_num}, ${row_count};`;

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
 * get contract list per page with filter
 *
 * @author  Jose Cruz <topdeveloper1228@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function searchContractList(uid, search_key) {
  return new Promise((resolve, reject) => {
    let query = "";
    if (search_key.search("0x") == 0) {
      query = `SELECT * FROM contracts WHERE (contract_address LIKE '${search_key}%') LIMIT 0, 7`;
    } else {
      query = `SELECT * FROM contracts WHERE (name LIKE '%${search_key}%' OR slug LIKE '%${search_key}%') LIMIT 0, 7`;
    }

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
 * get count for contract list for search filter
 *
 * @author  Jose Cruz <topdeveloper1228@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getCountContractList(uid, data) {
  return new Promise((resolve, reject) => {
    let query = `SELECT count(*) count FROM contracts`;

    db.query(query, (error, rows, fields) => {
      if (error) {
        reject({ message: message.INTERNAL_SERVER_ERROR });
      } else {
        resolve(rows[0].count);
      }
    });
  });
}

/**
 * create contracts only contract table
 *
 * @author  Jose Cruz <topdeveloper1228@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function createContract(uid, data) {
  return new Promise((resolve, reject) => {
    let query = `Insert into ${
      table.CONTRACTS
    } (contract_address, block_number, image_url, name, slug, created_date) values ('${
      data.contract_address
    }', '${data.block_number}', '${data.image_url}', '${data.name}', '${
      data.slug
    }', '${timeHelper.getCurrentTime()}');`;

    db.query(query, function (error, result, fields) {
      if (error) {
        reject({ message: message.INTERNAL_SERVER_ERROR });
      } else {
        resolve({ status: "ok", result: result });
      }
    });
  });
}

/**
 * get contract
 *
 * @author  Jose Cruz <topdeveloper1228@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getContract(uid, id) {
  return new Promise((resolve, reject) => {
    let query = "Select * from " + table.CONTRACTS + " where id = ?";

    db.query(query, [id], (error, rows, fields) => {
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
 * get contract by contract address
 *
 * @author  Jose Cruz <topdeveloper1228@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function getContractByContractAddress(uid, contract_address) {
  return new Promise((resolve, reject) => {
    let query =
      "Select * from " + table.CONTRACTS + " where contract_address = ?";

    db.query(query, [contract_address], (error, rows, fields) => {
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
 * update block only contract table
 *
 * @author  Jose Cruz <topdeveloper1228@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function updateContract(id, data) {
  return new Promise(async (resolve, reject) => {
    let query =
      `Update ` +
      table.CONTRACTS +
      ` set count = ?, updated_date = ? where id = ? `;
    db.query(
      query,
      [data.count, timeHelper.getCurrentTime(), id],
      function (error, result, fields) {
        if (error) {
          reject({ message: message.INTERNAL_SERVER_ERROR });
        } else {
          resolve("ok");
        }
      }
    );
  });
}

/**
 * delete contract
 *
 * @author  Jose Cruz <topdeveloper1228@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function deleteContract(uid, id, data) {
  return new Promise((resolve, reject) => {
    let query = `UPDATE ` + table.CONTRACTS + ` SET is_active = 'false' WHERE`;
    for (let i = 0; i < data.length; i++) {
      if (i === 0) {
        query += ` id = ${data[i].id}`;
      } else {
        query += ` OR id = ${data[i].id}`;
      }
    }

    db.query(query, (error, rows, fields) => {
      if (error) {
        reject({ message: message.INTERNAL_SERVER_ERROR });
      } else {
        resolve("ok");
      }
    });
  });
}

/**
 * delete all contract
 *
 * @author  Jose Cruz <topdeveloper1228@gmail.com>
 * @param   object authData
 * @return  object If success returns object else returns message
 */
function deleteAllContract() {
  return new Promise((resolve, reject) => {
    let query = `UPDATE ` + table.CONTRACTS + ` SET is_active = 'false'`;

    db.query(query, [], (error, rows, fields) => {
      if (error) {
        reject({ message: message.INTERNAL_SERVER_ERROR });
      } else {
        resolve("ok");
      }
    });
  });
}

module.exports = contractModel;
