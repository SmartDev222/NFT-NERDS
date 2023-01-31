import * as React from "react";
import { useState, useEffect } from "react";
import { withRouter } from "react-router";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, SvgIcon } from "@mui/material";
import etherIcon from "../../../assets/eth-icon.svg";
import etherLogoSvg from "../../../assets/etherLogo.svg";
import { LineChart, Line, Tooltip, BarChart, Bar } from "recharts";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import axios from "axios";
import "./style.scss";

function createData(
  name,
  url,
  address,
  trades,
  volume,
  price,
  floors,
  volumes
) {
  return { name, url, address, trades, volume, price, floors, volumes };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function CollectionTable(props) {
  const getRespondData = props.getRespondData;
  const orderByTrade = "trade_count";
  const orderByVolume = "volume";
  const orderByAvgPrice = "avg_price";
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("trade_count");
  const [data, setData] = useState([]);
  let [barGraphData, setBarGraphData] = React.useState({});

  useEffect(() => {
    let temp = props.collectionData;
    for (let i = 0; i < temp.length; i++) {
      temp[i].volume = parseFloat(temp[i].volume.toFixed(3));
      temp[i].avg_price = parseFloat(temp[i].avg_price.toFixed(3));
    }
    console.log("modified", temp);
    setData(temp);
  }, [props.collectionData]);

  function handleSort(e, orderType) {
    setOrderBy(orderType);

    if (order == "asc") {
      setOrder("desc");
    } else {
      setOrder("asc");
    }
  }

  const CustomTooltip = ({ active, payload, label }) => {
    let index = 0;
    if (active) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${payload[index].value} ETH`}</p>
        </div>
      );
    }
    return null;
  };

  const TableProgress = () => {
    return (
      <Stack sx={{ width: "100%", color: "grey.500" }}>
        <LinearProgress color="secondary" />
      </Stack>
    );
  };

  return (
    <TableContainer component={Paper} className="collection-table-container">
      <Table sx={{ minWidth: 650 }} aria-label="collection table">
        <TableHead className="table-header">
          <TableRow>
            <TableCell>Collection</TableCell>
            <TableCell align="right">
              {orderBy == "trade_count" ? (
                <a
                  className="sort-header"
                  onClick={(e) => handleSort(e, orderByTrade)}
                >
                  <Box>
                    <span># of trades</span>

                    {order == "asc" ? (
                      <SvgIcon>
                        <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
                      </SvgIcon>
                    ) : (
                      <SvgIcon>
                        <path d="M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path>
                      </SvgIcon>
                    )}
                  </Box>
                </a>
              ) : (
                <a
                  className="un-sort-header"
                  onClick={(e) => handleSort(e, orderByTrade)}
                >
                  <Box>
                    <span># of trades</span>
                  </Box>
                </a>
              )}
            </TableCell>
            <TableCell align="right">
              {orderBy == "volume" ? (
                <a
                  className="sort-header"
                  onClick={(e) => handleSort(e, orderByVolume)}
                >
                  <Box>
                    <span>volume</span>

                    {order == "asc" ? (
                      <SvgIcon>
                        <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
                      </SvgIcon>
                    ) : (
                      <SvgIcon>
                        <path d="M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path>
                      </SvgIcon>
                    )}
                  </Box>
                </a>
              ) : (
                <a
                  className="un-sort-header"
                  onClick={(e) => handleSort(e, orderByVolume)}
                >
                  <Box>
                    <span>volume</span>
                  </Box>
                </a>
              )}
            </TableCell>
            <TableCell align="right">
              {orderBy == "avg_price" ? (
                <a
                  className="sort-header"
                  onClick={(e) => handleSort(e, orderByAvgPrice)}
                >
                  <Box>
                    <span>avg_price</span>

                    {order == "asc" ? (
                      <SvgIcon>
                        <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
                      </SvgIcon>
                    ) : (
                      <SvgIcon>
                        <path d="M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path>
                      </SvgIcon>
                    )}
                  </Box>
                </a>
              ) : (
                <a
                  className="un-sort-header"
                  onClick={(e) => handleSort(e, orderByAvgPrice)}
                >
                  <Box>
                    <span>avg price</span>
                  </Box>
                </a>
              )}
            </TableCell>
            <TableCell align="right">7d floor</TableCell>
            <TableCell align="right">7d volume</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="table-body">
          {data.length > 0 ? (
            stableSort(data, getComparator(order, orderBy)).map(
              (row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    onClick={() =>
                      props.history.push(`/collection/${row.contract_address}`)
                    }
                  >
                    <a>
                      <Box>
                        {row.image_url == "null" || row.image_url == "" ? (
                          <img src={etherLogoSvg} />
                        ) : (
                          <img src={row.image_url} />
                        )}
                        <span>{row.name}</span>
                      </Box>
                    </a>
                  </TableCell>
                  <TableCell
                    align="right"
                    onClick={() =>
                      props.history.push(`/collection/${row.contract_address}`)
                    }
                  >
                    <a>{row.trade_count == null ? 0 : row.trade_count}</a>
                  </TableCell>
                  <TableCell
                    align="right"
                    onClick={() =>
                      props.history.push(`/collection/${row.contract_address}`)
                    }
                  >
                    <a>
                      <Box>
                        <img src={etherIcon} />
                        <span>
                          {row.volume == null ? 0 : row.volume.toFixed(4)}
                        </span>
                      </Box>
                    </a>
                  </TableCell>
                  <TableCell
                    align="right"
                    onClick={() =>
                      props.history.push(`/collection/${row.contract_address}`)
                    }
                  >
                    <a>
                      <Box>
                        <img src={etherIcon} />
                        <span>
                          {row.avg_price == null ? 0 : row.avg_price.toFixed(4)}
                        </span>
                      </Box>
                    </a>
                  </TableCell>
                  <TableCell
                    align="right"
                    onClick={() =>
                      props.history.push(`/collection/${row.contract_address}`)
                    }
                  >
                    <a>
                      <LineChart
                        width={120}
                        height={60}
                        data={row.chart_data}
                        margin={{ top: 30, right: 10, left: 50, bottom: 10 }}
                      >
                        <Tooltip
                          content={CustomTooltip}
                          cursor={false}
                          // itemStyle={{ color: "#fff" }}
                          // position={{y: -10}}
                          // position={{ x: barGraphData.x, y: barGraphData.y - 40 }}
                          allowEscapeViewBox={{ x: true, y: true }}
                        />
                        <Line
                          strokeWidth="1"
                          dataKey="floor"
                          stroke="rgb(137, 101, 211)"
                          dot={{
                            fill: "rgb(137, 101, 211)",
                            r: 3,
                          }}
                          activeDot={{
                            stroke: "rgb(137, 101, 211)",
                            fill: "rgba(137, 101, 211, 0.5)",
                            strokeWidth: 1,
                            r: 7,
                            strokeDasharray: "",
                          }}
                          onMouseOver={(data) => {
                            setBarGraphData(data);
                          }}
                        />
                      </LineChart>
                    </a>
                  </TableCell>
                  <TableCell
                    align="right"
                    onClick={() =>
                      props.history.push(`/collection/${row.contract_address}`)
                    }
                  >
                    <a>
                      <Box>
                        <BarChart width={120} height={60} data={row.chart_data}>
                          <Tooltip
                            content={<CustomTooltip />}
                            //viewBox={{ x: 100, y: 140, width: 400, height: 400 }}
                            cursor={false}
                            position={{
                              x: barGraphData.x,
                              y: barGraphData.y - 40,
                            }}
                          />
                          <Bar
                            dataKey="volume"
                            fill="rgba(137, 101, 211, 0.5)"
                            onMouseOver={(data) => {
                              setBarGraphData(data);
                            }}
                            strokeWidth="1"
                          ></Bar>
                        </BarChart>
                      </Box>
                    </a>
                  </TableCell>
                </TableRow>
              )
            )
          ) : (
            <></>
          )}
        </TableBody>
      </Table>
      {data.length == 0 && <TableProgress />}
    </TableContainer>
  );
}

export default withRouter(CollectionTable);
