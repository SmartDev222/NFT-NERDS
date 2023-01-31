/**
 * Auth service file
 *
 * @package   backend/src/services
 * @author    Jose Cruz <topdeveloper1228@gmail.com>
 * @copyright 2022
 * @license   Turing License
 * @version   2.0
 * @link      https://turing.ly/api/auth/
 */

var contractModel = require("../../../models/web/contract/contract-model");
var transactionModel = require("../../../models/web/transaction/transaction-model");
var jwt = require("jsonwebtoken");
var message = require("../../../constants/message");
var code = require("../../../constants/code");
var key = require("../../../config/key-config");
var timer = require("../../../constants/timer");
var authHelper = require("../../../helper/authHelper");

var contractService = {
  getContractList: getContractList,
  getContractListPerPage: getContractListPerPage,
  getFirhoseListPerPage: getFirhoseListPerPage,
  searchContractList: searchContractList,
  createContract: createContract,
  getContract: getContract,
  updateContract: updateContract,
  updateContractStatus: updateContractStatus,
  deleteContract: deleteContract,
  deleteAllContract: deleteAllContract,
};

/**
 * Function that get contract list
 *
 * @author  Jose Cruz <topdeveloper1228@gmail.com>
 * @param   object authData
 * @return  json
 */
function getContractList(uid, userdata, data) {
  return new Promise((resolve, reject) => {
    // authHelper
    //   .hasProductPermission(userdata, [
    //     code.SEE_PERMISSION,
    //     code.EDIT_PERMISSION,
    //   ])
    //   .then((response) => {
    contractModel
      .getContractList(uid, data)
      .then((contractList) => {
        if (contractList) {
          resolve({
            code: code.OK,
            message: "",
            data: { contractList: contractList },
          });
        }
      })
      .catch((err) => {
        if (err.message === message.INTERNAL_SERVER_ERROR)
          reject({
            code: code.INTERNAL_SERVER_ERROR,
            message: err.message,
            data: {},
          });
        else
          reject({
            code: code.BAD_REQUEST,
            message: err.message,
            data: {},
          });
      });
    // })
    // .catch((error) => {
    //   reject({ code: code.BAD_REQUEST, message: error.message, data: {} });
    // });
  });
}

/**
 * Function that get contract list per page
 *
 * @author  Jose Cruz <topdeveloper1228@gmail.com>
 * @param   object authData
 * @return  json
 */
function getContractListPerPage(uid, userdata, data) {
  return new Promise((resolve, reject) => {
    // authHelper
    //   .hasProductPermission(userdata, [
    //     code.SEE_PERMISSION,
    //     code.EDIT_PERMISSION,
    //   ])
    //   .then((response) => {
    contractModel
      .getContractListPerPage(uid, data)
      .then(async (contractList) => {
        if (contractList) {
          // let token = jwt.sign(
          //   { uid: uid, userdata: userdata },
          //   key.JWT_SECRET_KEY,
          //   {
          //     expiresIn: timer.TOKEN_EXPIRATION,
          //   }
          // );
          let tempContractList = JSON.parse(JSON.stringify(contractList));
          const response = await Promise.all(
            tempContractList.map(async (contract) => {
              let transactionData = [];
              if (contract.trade_count != null) {
                transactionData = await transactionModel.getTransactionByD(
                  contract.contract_id,
                  data.duration
                );
              }
              let item = {
                ...contract,
                d7_data: transactionData,
              };
              return item;
            })
          );

          resolve({
            code: code.OK,
            message: "",
            data: {
              contractList: response,
            },
          });
        }
      })
      .catch((err) => {
        if (err.message === message.INTERNAL_SERVER_ERROR)
          reject({
            code: code.INTERNAL_SERVER_ERROR,
            message: err.message,
            data: {},
          });
        else
          reject({
            code: code.BAD_REQUEST,
            message: err.message,
            data: {},
          });
      });
    // })
    // .catch((error) => {
    //   reject({ code: code.BAD_REQUEST, message: error.message, data: {} });
    // });
  });
}

/**
 * Function that get contract list per page
 *
 * @author  Jose Cruz <topdeveloper1228@gmail.com>
 * @param   object authData
 * @return  json
 */
function getFirhoseListPerPage(uid, userdata, data) {
  return new Promise((resolve, reject) => {
    // authHelper
    //   .hasProductPermission(userdata, [
    //     code.SEE_PERMISSION,
    //     code.EDIT_PERMISSION,
    //   ])
    //   .then((response) => {
    contractModel
      .getFirhoseListPerPage(uid, data)
      .then(async (contractList) => {
        if (contractList) {
          // let token = jwt.sign(
          //   { uid: uid, userdata: userdata },
          //   key.JWT_SECRET_KEY,
          //   {
          //     expiresIn: timer.TOKEN_EXPIRATION,
          //   }
          // );
          let tempContractList = JSON.parse(JSON.stringify(contractList));
          const response = await Promise.all(
            tempContractList.map(async (contract) => {
              let transactionData = [];
              if (contract.trade_count != null) {
                transactionData = await transactionModel.getTransactionByM(
                  contract.contract_id,
                  60
                );
              }
              let item = {
                ...contract,
                d7_data: transactionData,
              };
              return item;
            })
          );

          resolve({
            code: code.OK,
            message: "",
            data: {
              contractList: response,
            },
          });
        }
      })
      .catch((err) => {
        if (err.message === message.INTERNAL_SERVER_ERROR)
          reject({
            code: code.INTERNAL_SERVER_ERROR,
            message: err.message,
            data: {},
          });
        else
          reject({
            code: code.BAD_REQUEST,
            message: err.message,
            data: {},
          });
      });
    // })
    // .catch((error) => {
    //   reject({ code: code.BAD_REQUEST, message: error.message, data: {} });
    // });
  });
}

/**
 * Function that search contract list
 *
 * @author  Jose Cruz <topdeveloper1228@gmail.com>
 * @param   object authData
 * @return  json
 */
function searchContractList(uid, userdata, search_key) {
  return new Promise((resolve, reject) => {
    // authHelper
    //   .hasProductPermission(userdata, [
    //     code.SEE_PERMISSION,
    //     code.EDIT_PERMISSION,
    //   ])
    //   .then((response) => {
    contractModel
      .searchContractList(uid, search_key)
      .then(async (contractList) => {
        if (contractList) {
          resolve({
            code: code.OK,
            message: "",
            data: contractList,
          });
        }
      })
      .catch((err) => {
        if (err.message === message.INTERNAL_SERVER_ERROR)
          reject({
            code: code.INTERNAL_SERVER_ERROR,
            message: err.message,
            data: {},
          });
        else
          reject({
            code: code.BAD_REQUEST,
            message: err.message,
            data: {},
          });
      });
    // })
    // .catch((error) => {
    //   reject({ code: code.BAD_REQUEST, message: error.message, data: {} });
    // });
  });
}

/**
 * Function that create contract
 *
 * @author  Jose Cruz <topdeveloper1228@gmail.com>
 * @param   object authData
 * @return  json
 */
function createContract(uid, userdata, data) {
  return new Promise((resolve, reject) => {
    // authHelper
    //   .hasProductPermission(userdata, [code.EDIT_PERMISSION])
    //   .then((response) => {
    contractModel
      .createContract(uid, data)
      .then((response) => {
        // let token = jwt.sign(
        //   { uid: uid, userdata: userdata },
        //   key.JWT_SECRET_KEY,
        //   {
        //     expiresIn: timer.TOKEN_EXPIRATION,
        //   }
        // );
        resolve({ code: code.OK, message: "" });
      })
      .catch((err) => {
        if (err.message === message.INTERNAL_SERVER_ERROR)
          reject({
            code: code.INTERNAL_SERVER_ERROR,
            message: err.message,
            data: {},
          });
        else
          reject({
            code: code.BAD_REQUEST,
            message: err.message,
            data: {},
          });
      });
    // })
    // .catch((error) => {
    //   reject({ code: code.BAD_REQUEST, message: error.message, data: {} });
    // });
  });
}

/**
 * Function that get contract
 *
 * @author  Jose Cruz <topdeveloper1228@gmail.com>
 * @param   object authData
 * @return  json
 */
function getContract(uid, userdata, id) {
  return new Promise((resolve, reject) => {
    // authHelper
    //   .hasProductPermission(userdata, [
    //     code.EDIT_PERMISSION,
    //     code.SEE_PERMISSION,
    //   ])
    //   .then((response) => {
    contractModel
      .getContract(uid, id)
      .then((contract) => {
        if (contract) {
          // let token = jwt.sign(
          //   { uid: uid, userdata: userdata },
          //   key.JWT_SECRET_KEY,
          //   {
          //     expiresIn: timer.TOKEN_EXPIRATION,
          //   }
          // );
          resolve({
            code: code.OK,
            message: "",
            data: { contract: contract },
          });
        }
      })
      .catch((err) => {
        if (err.message === message.INTERNAL_SERVER_ERROR)
          reject({
            code: code.INTERNAL_SERVER_ERROR,
            message: err.message,
            data: {},
          });
        else
          reject({
            code: code.BAD_REQUEST,
            message: err.message,
            data: {},
          });
      });
    // })
    // .catch((error) => {
    //   reject({ code: code.BAD_REQUEST, message: error.message, data: {} });
    // });
  });
}

/**
 * Function that update contract
 *
 * @author  Jose Cruz <topdeveloper1228@gmail.com>
 * @param   object authData
 * @return  json
 */
function updateContract(uid, userdata, data, id) {
  return new Promise((resolve, reject) => {
    // authHelper
    //   .hasProductPermission(userdata, [code.EDIT_PERMISSION])
    //   .then((response) => {
    contractModel
      .updateContract(id, data)
      .then((response) => {
        // let token = jwt.sign(
        //   { uid: uid, userdata: userdata },
        //   key.JWT_SECRET_KEY,
        //   {
        //     expiresIn: timer.TOKEN_EXPIRATION,
        //   }
        // );
        resolve({ code: code.OK, message: "" });
      })
      .catch((err) => {
        if (err.message === message.INTERNAL_SERVER_ERROR)
          reject({
            code: code.INTERNAL_SERVER_ERROR,
            message: err.message,
            data: {},
          });
        else
          reject({
            code: code.BAD_REQUEST,
            message: err.message,
            data: {},
          });
      });
    // })
    // .catch((error) => {
    //   reject({ code: code.BAD_REQUEST, message: error.message, data: {} });
    // });
  });
}

/**
 * Function that update contract status
 *
 * @author  Jose Cruz <topdeveloper1228@gmail.com>
 * @param   object authData
 * @return  json
 */
function updateContractStatus(uid, userdata, data, id) {
  return new Promise((resolve, reject) => {
    // authHelper
    //   .hasProductPermission(userdata, [code.EDIT_PERMISSION])
    //   .then((response) => {
    contractModel
      .updateContractStatus(id, data)
      .then((result) => {
        if (result) {
          // let token = jwt.sign(
          //   { uid: uid, userdata: userdata },
          //   key.JWT_SECRET_KEY,
          //   {
          //     expiresIn: timer.TOKEN_EXPIRATION,
          //   }
          // );

          resolve({ code: code.OK, message: "" });
        }
      })
      .catch((err) => {
        if (err.message === message.INTERNAL_SERVER_ERROR)
          reject({
            code: code.INTERNAL_SERVER_ERROR,
            message: err.message,
            data: {},
          });
        else
          reject({
            code: code.BAD_REQUEST,
            message: err.message,
            data: {},
          });
      });
    // })
    // .catch((error) => {
    //   reject({ code: code.BAD_REQUEST, message: error.message, data: {} });
    // });
  });
}

/**
 * Function that delete contract data
 *
 * @author  Jose Cruz <topdeveloper1228@gmail.com>
 * @param   object authData
 * @return  json
 */
function deleteContract(uid, id, userdata, data) {
  return new Promise((resolve, reject) => {
    // authHelper
    //   .hasProductPermission(userdata, [code.EDIT_PERMISSION])
    //   .then((response) => {
    contractModel
      .deleteContract(uid, id, data)
      .then((result) => {
        if (result) {
          // let token = jwt.sign(
          //   { uid: uid, userdata: userdata },
          //   key.JWT_SECRET_KEY,
          //   {
          //     expiresIn: timer.TOKEN_EXPIRATION,
          //   }
          // );

          resolve({ code: code.OK, message: "" });
        }
      })
      .catch((err) => {
        if (err.message === message.INTERNAL_SERVER_ERROR)
          reject({
            code: code.INTERNAL_SERVER_ERROR,
            message: err.message,
            data: {},
          });
        else
          reject({
            code: code.BAD_REQUEST,
            message: err.message,
            data: {},
          });
      });
    // })
    // .catch((error) => {
    //   reject({ code: code.BAD_REQUEST, message: error.message, data: {} });
    // });
  });
}

/**
 * Function that delete All trashed contract data
 *
 * @author  Jose Cruz <topdeveloper1228@gmail.com>
 * @param   object authData
 * @return  json
 */
function deleteAllContract(uid, userdata) {
  return new Promise((resolve, reject) => {
    // authHelper
    //   .hasProductPermission(userdata, [code.EDIT_PERMISSION])
    //   .then((response) => {
    contractModel
      .deleteAllContract()
      .then((result) => {
        if (result) {
          // let token = jwt.sign(
          //   { uid: uid, userdata: userdata },
          //   key.JWT_SECRET_KEY,
          //   {
          //     expiresIn: timer.TOKEN_EXPIRATION,
          //   }
          // );

          resolve({ code: code.OK, message: "" });
        }
      })
      .catch((err) => {
        if (err.message === message.INTERNAL_SERVER_ERROR)
          reject({
            code: code.INTERNAL_SERVER_ERROR,
            message: err.message,
            data: {},
          });
        else
          reject({
            code: code.BAD_REQUEST,
            message: err.message,
            data: {},
          });
      });
    // })
    // .catch((error) => {
    //   reject({ code: code.BAD_REQUEST, message: error.message, data: {} });
    // });
  });
}

module.exports = contractService;
