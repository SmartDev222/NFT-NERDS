/**
 * Token Price config file
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
 * Token Price configuration constants
 */
const tokenConfig = {
  ABI: [
    {
      inputs: [
        {
          internalType: "bytes4",
          name: "interfaceId",
          type: "bytes4",
        },
      ],
      name: "supportsInterface",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],
  INTERFACE_ID_ERC721: "0x80ac58cd",
};

module.exports = tokenConfig;
