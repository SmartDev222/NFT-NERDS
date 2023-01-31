/**
 * MAIL helper file
 *
 * @package   backend/src/helper
 * @author    Jose Cruz <topdeveloper1228@gmail.com>
 * @copyright 2022
 * @license   Turing License
 * @version   2.0
 * @link      https://turing.ly/
 */

const Web3 = require("web3");
const ethers = require("ethers");
const { Contract } = require("ethers");
const tokenConfig = require("../config/token-config");

const web3 = new Web3(
  new Web3.providers.WebsocketProvider(process.env.APP_NODE)
);

function useWeb3TokenContract(address) {
  return new web3.eth.Contract(tokenConfig.ABI, address);
}

function isCheckERC721(tokenAddress) {
  return new Promise(async (resolve, reject) => {
    try {
      const tokenContract = useWeb3TokenContract(tokenAddress);
      tokenContract.methods
        .supportsInterface(tokenConfig.INTERFACE_ID_ERC721)
        .call()
        .then((isERC721) => {
          resolve(isERC721);
        })
        .catch((err) => {
          console.log("Check ERC721 err", err);
          resolve(false);
        });
    } catch (err) {
      console.log("Check ERC721 err", err);
      resolve(false);
    }
  });
}

module.exports = {
  isCheckERC721: isCheckERC721,
};
