import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { LineChart, Line, Tooltip } from "recharts";
import "./style.scss";
import etherLogo from "../../assets/etherLogo.svg";
import "../../theme/global.scss";
import moment from "moment";

const chartFillColor = "rgb(137, 101, 211)";
const chartDotColor = "rgb(137, 101, 211, 0.5)";

const CustomAlertsActiveCollectionItem = (props) => {
  const item = props.data;

  const d7_data = props.data.d7_data;
  const [chartData, setChartData] = useState([]);

  const [maxValue, setMaxValue] = useState();
  const [minValue, setMinValue] = useState();

  const getMaxMin = (array) => {
    let temp = JSON.parse(JSON.stringify(array));
    temp.sort(function (a, b) {
      return b.floor - a.floor;
    });
    setMaxValue(parseFloat(temp[0].floor.toFixed(3)));
    setMinValue(parseFloat(temp[29].floor.toFixed(3)));
  };

  const getNum = (length) => {
    let numArray = [];
    for (let i = 0; i < length; i++) {
      let temp = 0;
      let checkRes = false;
      do {
        temp = Math.floor(Math.random() * 29);
        checkRes = duplicateCheck(temp, numArray);
      } while (checkRes);
      numArray.push(temp);
    }
    return numArray;
  };
  const duplicateCheck = (num, array) => {
    let flag = false;
    for (let i = 0; i < array.length; i++) {
      if (array[i] == num) flag = true;
    }
    return flag;
  };
  const getIniteData = () => {
    let tempData = [];
    for (let i = 0; i < 30; i++) {
      let gmtTime = moment()
        .subtract(60 - i * 2, "minutes")
        .format("YYYY-MM-DD HH:mm:ss");
      let sdata = { floor: 0, volume: 0, date: gmtTime };
      tempData.push(sdata);
    }
    return tempData;
  };

  const updataIniteData = (iData, nums, rData) => {
    for (let i = 0; i < nums.length; i++) {
      iData[nums[i]].floor = parseFloat(rData[i].m30_floor.toFixed(3));
      iData[nums[i]].volume = parseFloat(rData[i].m30_volume.toFixed(3));
    }
    return iData;
  };

  const getChartData = (data) => {
    let finalData = [];
    if (data.length < 30) {
      console.log("data", data);
      let numArray = getNum(data.length);
      let initeData = getIniteData();
      finalData = updataIniteData(initeData, numArray, data);
    } else {
      for (let i = 0; i < data.length; i++) {
        let temp = {
          floor: parseFloat(data[i].m30_floor.toFixed(3)),
          volume: parseFloat(data[i].m30_volume.toFixed(3)),
          date: data[i].create_date,
        };
        finalData.push(temp);
      }
    }
    setChartData(finalData);
    getMaxMin(finalData);
  };

  useEffect(() => {
    getChartData(d7_data);
  }, [props.data]);
  return (
    <div style={{ width: "100%" }}>
      <div className="MuiBox-root css-164r41r">
        <div className="MuiBox-root css-13izq8f">
          <div className="MuiBox-root css-7fn19k">
            <div className="MuiBox-root css-1n2mv2k">
              <img
                src={
                  item.image_url == null ||
                  item.image_url == "null" ||
                  item.image_url == ""
                    ? etherLogo
                    : item.image_url
                }
                alt="tnail"
                height="36"
                style={{ borderRadius: "50%" }}
              />
              <a
                className="MuiTypography-root MuiTypography-body2 MuiLink-root MuiLink-underlineHover css-whbpg8"
                rel="nooreferrer"
                target="_blank"
                href={"/collection/" + item.contract_address}
              >
                {item.name.length > 20
                  ? item.name.substr(0, 20) + "..."
                  : item.name}
              </a>
            </div>
            <div className="MuiBox-root css-1n2mv2k">
              <div className="MuiBox-root css-u6v8er">
                <p className="MuiTypography-root MuiTypography-body1 css-1f7zjgf">
                  <img
                    src="assets/images/icons/eth-icon.svg"
                    alt="ETH"
                    style={{ height: "14px", paddingRight: "5px" }}
                  />
                  {item.volume.toFixed(3)}
                </p>
                <p className="MuiTypography-root MuiTypography-body1 css-clrxkr">
                  VOLUME 5MIN
                </p>
              </div>
            </div>
            <div className="MuiBox-root css-1n2mv2k">
              <div className="MuiBox-root css-u6v8er">
                <p className="MuiTypography-root MuiTypography-body1 css-1f7zjgf">
                  {item.trade_count}
                </p>
                <p className="MuiTypography-root MuiTypography-body1 css-clrxkr">
                  SALES 5MIN
                </p>
              </div>
            </div>
          </div>
          <div className="MuiBox-root css-mifb2i">
            <div data-highcharts-chart="111" style={{ overflow: "hidden" }}>
              <div
                id="highcharts-kmq6272-333504"
                dir="ltr"
                className="highcharts-container "
                style={{
                  position: "relative",
                  overflow: "hidden",
                  width: "600px",
                  height: "113px",
                  textAlign: "left",
                  lineHeight: "normal",
                  zIndex: 0,
                  WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                  userSelect: "none",
                  touchAction: "manipulation",
                  outline: "none",
                  fontFamily: "Zen Kurenaido",
                }}
              >
                <div style={{ fontSize: "12px" }}>{maxValue}</div>
                <Divider
                  sx={{
                    backgroundColor: "rgb(134, 134, 160)",
                    marginTop: "2px",
                  }}
                />
                <LineChart
                  width={600}
                  height={70}
                  data={chartData}
                  margin={{ top: 30, right: 30, left: 20, bottom: 5 }}
                >
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#000",
                      color: "#fff",
                      borderColor: chartFillColor,
                    }}
                    cursor={false}
                    itemStyle={{ color: "#fff" }}
                  />
                  <Line
                    strokeWidth="2"
                    dataKey="floor"
                    stroke={chartFillColor}
                    dot={{
                      fill: chartFillColor,
                      r: 3,
                    }}
                    activeDot={{
                      stroke: chartFillColor,
                      fill: chartDotColor,
                      strokeWidth: 1,
                      r: 7,
                      strokeDasharray: "",
                    }}
                  />
                </LineChart>
                <Divider
                  sx={{
                    backgroundColor: "rgb(134, 134, 160)",
                    marginBottom: "2px",
                  }}
                />
                <div style={{ fontSize: "12px" }}>{minValue}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomAlertsActiveCollectionItem;
