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

const apiAuthRouter = require("./auth");
const webRouter = require("./web");

/**
 * Authentication page API router
 */
router.use("/auth", apiAuthRouter);

/**
 * Web API router
 */
router.use("/web", webRouter);

module.exports = router;
