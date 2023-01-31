/**
 * Timer constant file
 *
 * @package   backend/src/constants
 * @author    Jose Cruz <topdeveloper1228@gmail.com>
 * @copyright 2022
 * @license   Turing License
 * @version   2.0
 * @link      https://turing.ly/
 */
const dotenv = require("dotenv");
dotenv.config();

/**
 * Code constants
 */
const timer = {
  VISIT_SESSION_MINS: process.env.VISIT_SESSION_TIME,
  TOKEN_EXPIRATION: process.env.TOKEN_EXPIRATION,
  SMS_TOKEN_EXPIRATION: process.env.SMS_TOKEN_EXPIRATION,
};

module.exports = timer;
