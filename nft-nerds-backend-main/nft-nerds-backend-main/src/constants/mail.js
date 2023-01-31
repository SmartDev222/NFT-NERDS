/**
 * Mail constant file
 *
 * @package   backend/src/constants
 * @author    Jose Cruz <topdeveloper1228@gmail.com>
 * @copyright 2022
 * @license   Turing License
 * @version   2.0
 * @link      https://turing.ly
 */
const dotenv = require("dotenv");
dotenv.config();
/**
 * API constants
 */
const mail = {
  TYPE_FORGOT_PASSWORD: 1,
  TYPE_SUBACCOUNT_INVITE: 2,
  TYPE_ADMIN_CREATE: 3,
  TYPE_MANAGER_CREATE: 4,
  TYPE_OWNER_CREATE: 5,
  TITLE_FORGOT_PASSWORD: "Recovery your password",
  TITLE_SUBACCOUNT_INVITE: "You're invited as an agency",
  TITLE_ADMIN_CREATE: "You're invited as an admin",
  TITLE_MANAGER_CREATE: "You're invited as a manager",
  TITLE_OWNER_CREATE: "You're invited as an owner",
};

module.exports = mail;
