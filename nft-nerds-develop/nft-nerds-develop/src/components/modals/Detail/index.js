import React, { memo, useMemo, useState } from "react";
import {
  Box,
  Button,
  Link,
  Paper,
  Modal,
  SvgIcon,
  Tooltip,
  Typography,
  Divider,
  Backdrop,
} from "@mui/material";
import TransactionModal from "../transaction";
import { getUtcToLocal, getLocalToUtc, getTimeDiff } from "../../../constant";
import { buyFunction } from "../../../constant";

import ethIcon from "../../../assets/eth-icon.svg";
import rarityIcon from "../../../assets/rarity.svg";
// import LineChart from './LineChart';
import "./style.scss";
import Property from "./Property";

const DetailModal = (props) => {
  console.log("DetailModal", props);
  const item = props.modalData;
  const traitsData = item.traits;
  const collection = item.collection;
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const buyPrice =
    item.orders != null
      ? parseFloat(
          (
            item.orders[item.orders.length - 1].base_price / 1000000000000000000
          ).toFixed(3)
        )
      : null;
  const lastTradeData = useMemo(() => {
    if (item.last_sale != null) {
      const lastTime = item.last_sale.event_timestamp;
      const convertedLocal = getUtcToLocal(lastTime);
      const timeDiff = getTimeDiff(convertedLocal);
      const price = parseFloat(
        (item.last_sale.total_price / 1000000000000000000).toFixed(3)
      );
      return { price, timeDiff };
    } else return null;
  }, [item]);

  const buyAction = async () => {
    let data = { asset: item };
    handleOpen();
    let result = await buyFunction(data);
    handleClose();
    console.log("result", result);
  };

  return (
    <>
      <Modal className="css-8ndowl" open={props.open} onClose={props.onClose}>
        <Box className="css-8ctru2" tabIndex="-1" sx={{ overflowY: "auto" }}>
          <Box className="css-hpgf8j">
            <Box className="css-jj7qqp">
              <Typography variant="h5" className="css-5k5zt3">
                <Link
                  color="inherit"
                  underline="always"
                  className="css-96wxre"
                  href={"/collection/" + item.asset_contract.address}
                >
                  {item.collection.name}
                </Link>{" "}
                {"| #" + item.token_id}
              </Typography>
              <Box className="css-70qvj9" onClick={props.onClose}>
                <SvgIcon
                  className="css-s6jlyw"
                  fontSize="medium"
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  data-testid="CloseIcon"
                >
                  <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </SvgIcon>
              </Box>
            </Box>
            <Box className="css-33tmyr">
              <Box className="css-1r10abh">
                <Box className="css-19idom">
                  <Box>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      className="css-1naeo5n"
                      href={item.permalink}
                    >
                      <img
                        width="100%"
                        alt=""
                        src={item.image_url}
                        style={{ borderRadius: "8px", verticalAlign: "middle" }}
                      />
                    </a>
                  </Box>
                </Box>
                <Paper className="css-1ro9fl1" variant="rounded" elevation={2}>
                  <Box className="css-bz1jdg">
                    <Box>
                      <Box className="css-5ax1kt">
                        <Typography variant="overline" className="css-16tu5fr">
                          Rank:
                        </Typography>
                        <Typography variant="overline" className="css-18el2b6">
                          2293
                        </Typography>

                        <Tooltip
                          title="Rarity ranks calculated by YakuzaTool. Might differ from official rarity, but should be close to popular rarity providers. To request official rarity support for this collection, join our discord."
                          enterDelay={200}
                          leaveDelay={70}
                        >
                          <Box className="css-dga6ti">
                            <img src={rarityIcon} />
                            <Typography
                              variant="body1"
                              className="css-6gsu0d"
                            ></Typography>
                          </Box>
                        </Tooltip>
                      </Box>
                    </Box>
                    <Box className="css-70qvj9">
                      <a
                        className="css-6jpeea"
                        target="_blank"
                        rel="noreferrer"
                        href="https://opensea.io/assets/0x8c3fb10693b228e8b976ff33ce88f97ce2ea9563/4008"
                      >
                        <img
                          src="assets/images/icons/opensea_dark.svg"
                          alt=""
                          height="19"
                        />
                      </a>
                      <a
                        className="css-6jpeea"
                        target="_blank"
                        rel="noreferrer"
                        href="https://etherscan.io/token/0x8c3fb10693b228e8b976ff33ce88f97ce2ea9563?a=4008"
                      >
                        <img
                          src="assets/images/icons/etherscan.svg"
                          alt=""
                          height="19"
                        />
                      </a>
                    </Box>
                  </Box>
                </Paper>
                <Box className="css-1l9fb58">
                  {buyPrice == null ? (
                    "THIS ITEM IS NOT LISTED"
                  ) : (
                    <Button
                      variant="outlined"
                      color="success"
                      size="small"
                      className="css-d1ovzs"
                      onClick={buyAction}
                    >
                      {"Buy at Ξ" + buyPrice}
                    </Button>
                  )}
                </Box>
              </Box>
              <Box className="css-1j6quqd">
                <Box>
                  <Box className="css-1dt1o3r">
                    <Box className="css-19midj6">
                      {traitsData.map((item, index) => (
                        <Property
                          key={index}
                          traitData={item}
                          collection={collection}
                        />
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box className="css-15ync0s">
                <Box>
                  <Paper
                    variant="rounded"
                    elevation={2}
                    className="css-19thxtu"
                  >
                    <Box className="css-3j0hen">
                      <Box className="css-k008qs">
                        <Tooltip
                          title="Circulating supply, should be equal to number of minted tokens. This feature is in beta, might be off for older collections."
                          enterDelay={200}
                          leaveDelay={70}
                        >
                          <Box className="css-1vbr399">
                            <Box className="css-9v5n1a">
                              <Box className="css-k008qs">
                                <Typography
                                  variant="body1"
                                  className="css-1gn1w7n"
                                >
                                  <span className="css-70qvj9">
                                    {collection.stats.total_supply}
                                  </span>
                                </Typography>
                              </Box>
                              <Typography
                                variant="body1"
                                className="css-t4duvh"
                              >
                                SUPPLY
                              </Typography>
                            </Box>
                          </Box>
                        </Tooltip>
                        <Tooltip
                          title="Current number of unique holders in the collection."
                          enterDelay={200}
                          leaveDelay={70}
                        >
                          <Box className="css-1vbr399">
                            <Box className="css-9v5n1a">
                              <Box className="css-k008qs">
                                <Typography
                                  variant="body1"
                                  className="css-1gn1w7n"
                                >
                                  <span className="css-70qvj9">
                                    {collection.stats.num_owners}
                                  </span>
                                </Typography>
                              </Box>
                              <Typography
                                variant="body1"
                                className="css-t4duvh"
                              >
                                HOLDERS
                              </Typography>
                            </Box>
                          </Box>
                        </Tooltip>
                        <Tooltip
                          title="Includes both 2.5% OpenSea royalty and collection owner royalty"
                          enterDelay={200}
                          leaveDelay={70}
                        >
                          <Box className="css-qe4sff">
                            <Box className="css-9v5n1a">
                              <Box className="css-k008qs">
                                <Typography
                                  variant="body1"
                                  className="css-1gn1w7n"
                                >
                                  <span className="css-70qvj9">-</span>
                                </Typography>
                              </Box>
                              <Typography
                                variant="body1"
                                className="css-t4duvh"
                              >
                                ROYALTY
                              </Typography>
                            </Box>
                          </Box>
                        </Tooltip>
                      </Box>
                      <Divider
                        orientation="vertical"
                        flexItem
                        className="css-1rpfmfj"
                      />
                      <Box className="css-k008qs">
                        <Box className="css-3cyd2n">
                          <Box className="css-9v5n1a">
                            <Box className="css-k008qs">
                              <Typography
                                variant="body1"
                                className="css-1gn1w7n"
                              >
                                <span className="css-70qvj9">
                                  {collection.stats.one_day_sales}
                                </span>
                              </Typography>
                            </Box>
                            <Typography variant="body1" className="css-t4duvh">
                              1D SALES
                            </Typography>
                          </Box>
                        </Box>
                        <Box className="css-3cyd2n">
                          <Box className="css-9v5n1a">
                            <Box className="css-k008qs">
                              <Typography
                                variant="body1"
                                className="css-1gn1w7n"
                              >
                                <span className="css-70qvj9">-</span>
                              </Typography>
                            </Box>
                            <Typography variant="body1" className="css-t4duvh">
                              1H SALES
                            </Typography>
                          </Box>
                        </Box>
                        <Box className="css-3cyd2n">
                          <Box className="css-9v5n1a">
                            <Box className="css-k008qs">
                              <Typography
                                variant="body1"
                                className="css-1gn1w7n"
                              >
                                <span className="css-70qvj9">-</span>
                              </Typography>
                            </Box>
                            <Typography variant="body1" className="css-t4duvh">
                              10MIN SALES
                            </Typography>
                          </Box>
                        </Box>
                        <Box className="css-jipda8">
                          <Box className="css-9v5n1a">
                            <Box className="css-k008qs">
                              <Typography
                                variant="body1"
                                className="css-1gn1w7n"
                              >
                                <span className="css-70qvj9">
                                  <img
                                    src={ethIcon}
                                    alt="ETH"
                                    style={{
                                      verticalAlign: "middle",
                                      height: "16px",
                                      paddingRight: "5px",
                                    }}
                                  />
                                  -
                                </span>
                              </Typography>
                            </Box>
                            <Typography variant="body1" className="css-t4duvh">
                              1H FLOOR
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Divider
                        orientation="vertical"
                        flexItem
                        className="css-1rpfmfj"
                      />
                      <Box className="css-k008qs">
                        <Box className="css-3cyd2n">
                          <Box className="css-9v5n1a">
                            <Box className="css-k008qs">
                              <Typography
                                variant="body1"
                                className="css-1gn1w7n"
                              >
                                <span className="css-70qvj9">-</span>
                              </Typography>
                            </Box>
                            <Typography variant="body1" className="css-t4duvh">
                              LISTINGS
                            </Typography>
                          </Box>
                        </Box>
                        <Box className="css-3cyd2n">
                          <Box className="css-9v5n1a">
                            <Box className="css-k008qs">
                              <Typography
                                variant="body1"
                                className="css-1gn1w7n"
                              >
                                <span className="css-70qvj9">-</span>
                              </Typography>
                            </Box>
                            <Typography variant="body1" className="css-t4duvh">
                              NEW LISTINGS
                            </Typography>
                          </Box>
                        </Box>
                        <Box className="css-9v5n1a">
                          <Box className="css-k008qs">
                            <Typography variant="body1" className="css-1gn1w7n">
                              <span className="css-70qvj9">
                                <img
                                  src={ethIcon}
                                  alt="ETH"
                                  style={{
                                    verticalAlign: "middle",
                                    height: "16px",
                                    paddingRight: "5px",
                                  }}
                                />
                                -
                              </span>
                            </Typography>
                          </Box>
                          <Typography variant="body1" className="css-t4duvh">
                            FLOOR
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Paper>
                  <Divider className="css-1c7zk4h" />
                  <Box className="css-4m3rxx">
                    <Typography variant="body1" className="css-1aatlje">
                      {lastTradeData == null
                        ? "This item has not traded recently"
                        : "Last trade was at Ξ" +
                          lastTradeData.price +
                          ", " +
                          lastTradeData.timeDiff +
                          " ago"}
                    </Typography>
                  </Box>
                  <Divider className="css-1c7zk4h" />
                  <Box className="css-19idom"></Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
      <TransactionModal open={isOpen} close={handleClose} />
    </>
  );
};

export default memo(DetailModal);
