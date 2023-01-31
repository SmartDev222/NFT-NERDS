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

const express = require("express");
const router = express.Router();
const apiBlockRouter = require("./contract");

/**
 * block API router
 */
router.use("/contract", apiBlockRouter);

module.exports = router;
