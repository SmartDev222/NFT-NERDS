/**
 * Key config file
 *
 * @package   backend/src/config
 * @author    Jose Cruz <topdeveloper1228@gmail.com>
 * @copyright 2022
 * @license   Turing License
 * @version   2.0
 * @link      https://turing.ly/
 */
const dotenv = require("dotenv");
dotenv.config();

/**
 * Key configuration constants
 */

module.exports = {
  JWT_SECRET_KEY: process.env.JWT_SECRET,
  CRYPTR_SECRET_KEY: process.env.CRYPTR_SECRET,
};
