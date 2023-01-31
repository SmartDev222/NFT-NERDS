/**
 * Index router file
 *
 * @package   backend/src/routes
 * @author    Jose Cruz <topdeveloper1228@gmail.com>
 * @copyright 2022
 * @license   Turing License
 * @version   2.0
 * @link      https://turing.ly
 */

const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const formidable = require("formidable");

const router = express.Router();
const authMiddleware = require("../../middleware/auth-middleware");
const contractService = require("../../services/web/contract/contract-service");

/**
 * block api
 */
router.get("/list", getContractList); // router.post("/list", authMiddleware.checkToken, getContractList);
router.get("/list-per-page", getContractListPerPage); // router.post("/list-per-page", authMiddleware.checkToken, getContractListPerPage);
router.get("/firehose-per-page", getFirhoseListPerPage); // router.post("/firehose-per-page", authMiddleware.checkToken, getFirhoseListPerPage);
router.get("/search", searchContractList); // router.post("/search", authMiddleware.checkToken, searchContractList);
router.post("/create", createContract); // router.post("/create", authMiddleware.checkToken, createContract);
router.get("/contract/:id", getContract); // router.get("/contract/:id", authMiddleware.checkToken, getContract);
router.put("/update/:id", updateContract); // router.put("/update/:id", authMiddleware.checkToken, updateContract);
router.put("/delete/:id", deleteContract); // router.post("/delete/:id", authMiddleware.checkToken, deleteContract);
router.put("/delete-all", deleteAllContract); // router.post("/delete/all", authMiddleware.checkToken, deleteAllContract);

//////////////////////////contract////////////////////////////
/**
 * Function that get the contract list
 *
 * @author  Jose Cruz <topdeveloper1228@gmail.com>
 * @param   object req
 * @param   object res
 * @return  json
 */
function getContractList(req, res) {
  let userId = ""; // req.decoded.uid;
  let userdata = ""; // req.decoded.userdata;
  let data = ""; // req.body;
  contractService
    .getContractList(userId, userdata, data)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
}

/**
 * Function that get the contract list per page
 *
 * @author  Jose Cruz <topdeveloper1228@gmail.com>
 * @param   object req
 * @param   object res
 * @return  json
 */
function getContractListPerPage(req, res) {
  let userId = ""; // req.decoded.uid;
  let userdata = ""; // req.decoded.userdata;
  let data = {
    duration:
      req.query.duration == undefined ? 10080 : parseInt(req.query.duration),
    search_key: req.query.search_key == undefined ? "" : req.query.search_key,
    page_num:
      req.query.page_num == undefined ? 0 : parseInt(req.query.page_num),
    row_count:
      req.query.row_count == undefined ? 50 : parseInt(req.query.row_count),
    sort_column:
      req.query.sort_column == undefined
        ? "trade_count"
        : req.query.sort_column,
    sort_method:
      req.query.sort_method == undefined ? "desc" : req.query.sort_method,
  };
  contractService
    .getContractListPerPage(userId, userdata, data)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
}

/**
 * Function that get the firehose list per page
 *
 * @author  Jose Cruz <topdeveloper1228@gmail.com>
 * @param   object req
 * @param   object res
 * @return  json
 */
function getFirhoseListPerPage(req, res) {
  let userId = ""; // req.decoded.uid;
  let userdata = ""; // req.decoded.userdata;
  let data = {
    duration: 5,
    page_num: 0,
    row_count: 5,
    sort_column: "trade_count",
    sort_method: "desc",
  };
  contractService
    .getFirhoseListPerPage(userId, userdata, data)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
}

/**
 * Function that search the contract list
 *
 * @author  Jose Cruz <topdeveloper1228@gmail.com>
 * @param   object req
 * @param   object res
 * @return  json
 */
function searchContractList(req, res) {
  let userId = ""; // req.decoded.uid;
  let userdata = ""; // req.decoded.userdata;
  let search_key =
    req.query.search_key == undefined ? "" : req.query.search_key;
  contractService
    .searchContractList(userId, userdata, search_key)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
}

/**
 * Function that create contract
 *
 * @author  Jose Cruz <topdeveloper1228@gmail.com>
 * @param   object req
 * @param   object res
 * @return  json
 */
function createContract(req, res) {
  let userId = ""; // req.decoded.uid;
  let userdata = ""; // req.decoded.userdata;
  let data = req.body;
  contractService
    .createContract(userId, userdata, data)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
}

/**
 * Function that get contract
 *
 * @author  Jose Cruz <topdeveloper1228@gmail.com>
 * @param   object req
 * @param   object res
 * @return  json
 */
function getContract(req, res) {
  let userId = ""; // req.decoded.uid;
  let userdata = ""; // req.decoded.userdata;
  let id = req.params.id;
  contractService
    .getContract(userId, userdata, id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
}

/**
 * Function that update contract
 *
 * @author  Jose Cruz <topdeveloper1228@gmail.com>
 * @param   object req
 * @param   object res
 * @return  json
 */
function updateContract(req, res) {
  let userId = ""; // req.decoded.uid;
  let userdata = ""; // req.decoded.userdata;
  let data = req.body;
  let id = req.params.id;
  contractService
    .updateContract(userId, userdata, data, id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
}

/**
 * Function that delete contract
 *
 * @author  Jose Cruz <topdeveloper1228@gmail.com>
 * @param   object req
 * @param   object res
 * @return  json
 */
function deleteContract(req, res) {
  let userId = ""; // req.decoded.uid;
  let userdata = ""; // req.decoded.userdata;
  let id = ""; // req.params.id;
  let data = [{ id: req.params.id }];
  contractService
    .deleteContract(userId, id, userdata, data)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
}

/**
 * Function that delete all trashed contract
 *
 * @author  Jose Cruz <topdeveloper1228@gmail.com>
 * @param   object req
 * @param   object res
 * @return  json
 */
function deleteAllContract(req, res) {
  let userId = ""; // req.decoded.uid;
  let userdata = ""; // req.decoded.userdata;
  contractService
    .deleteAllContract(userId, userdata)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
}

module.exports = router;
