/**
 * Database config file
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
 * Database configuration constants
 */
const dbConfig = {
  connectionLimit: 30,
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306,
  debug: false,
  multipleStatements: true,
  dateStrings: true,
};

module.exports = dbConfig;
