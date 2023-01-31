import React, { useState, useEffect } from "react";
import { Box, Container, Typography, ButtonGroup, Button } from "@mui/material";
import "./style.scss";
import CollectionTable from "../../components/utils/collectionTable";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { connect } from "react-redux";
import { CollectionFetchBackendData } from "../../actions/collections";
import moment from "moment";
import { authenticated } from "../../actions/login";

function mapStatetoProps(state) {
  return {
    authenticated: state.authenticated,
    collectionBackend: state.collectionBackend,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getCollectionBackend: (time) => dispatch(CollectionFetchBackendData(time)),
    setAuthenticate: (flag) => dispatch(authenticated(flag)),
  };
}

const Trending = (props) => {
  const [collectionData, setCollectionData] = useState([]);
  const [data] = useState([]);
  const [duration, setDuration] = useState(10080);
  const [visible, setVisible] = useState(3);
  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 3);
  };

  useEffect(() => {
    props.getCollectionBackend(duration);
    const auth = localStorage.getItem("authenticated");
    if (auth) {
      props.setAuthenticate(true);
      console.log("event", auth);
    }
  }, [duration]);

  useEffect(() => {
    let temp = props.collectionBackend;

    if (temp.length != 0) {
      if (temp.code != 500) setCollectionData(get_data(temp.data.contractList));
    }
  }, [props.collectionBackend]);

  const getRespondData = () => {};
  const get_data = (data) => {
    let temp = JSON.parse(JSON.stringify(data));
    let chart_data = [
      {
        floor: 0,
        volume: 0,
        date: moment().subtract(6, "days").format("YYYY-MM-DD"),
      },
      {
        floor: 0,
        volume: 0,
        date: moment().subtract(5, "days").format("YYYY-MM-DD"),
      },
      {
        floor: 0,
        volume: 0,
        date: moment().subtract(4, "days").format("YYYY-MM-DD"),
      },
      {
        floor: 0,
        volume: 0,
        date: moment().subtract(3, "days").format("YYYY-MM-DD"),
      },
      {
        floor: 0,
        volume: 0,
        date: moment().subtract(2, "days").format("YYYY-MM-DD"),
      },
      {
        floor: 0,
        volume: 0,
        date: moment().subtract(1, "days").format("YYYY-MM-DD"),
      },
      { floor: 0, volume: 0, date: moment().format("YYYY-MM-DD") },
    ];

    for (let i = 0; i < temp.length; i++) {
      let temp_chart_data = JSON.parse(JSON.stringify(chart_data));
      for (let j = 0; j < chart_data.length; j++) {
        let index = temp[i].d7_data.findIndex((item) => {
          return item.date == chart_data[j].date;
        });

        if (index >= 0) {
          let item = {
            ...temp_chart_data[j],
            floor: parseFloat(data[i].d7_data[index].d7_floor.toFixed(3)),
            volume: parseFloat(data[i].d7_data[index].d7_volume.toFixed(3)),
          };

          temp_chart_data[j] = item;
        }
      }
      temp[i].chart_data = temp_chart_data;
    }

    return temp;
  };

  return (
    <div>
      <Header {...props} />
      <Container className="trending_container">
        <Box className="sub_header">
          <Box>
            <Typography variant="h5" component="h5" className="sub_title">
              Trending collections
            </Typography>
            <Typography variant="p" component="p" className="sub_title_context">
              We have many more collections available. Use search at the top of
              the page to find them.
              <br />
              Collection missing? Visit our &nbsp;
              <a
                className="discord_link"
                href="https://discord.gg/yakuza"
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "none" }}
              >
                <b>discord</b>
              </a>{" "}
              if you'd like a new collection to be included.
            </Typography>
          </Box>
          <Box className="btn_group_container">
            <ButtonGroup
              className="btn_group"
              size="small"
              style={{ height: 26 }}
            >
              <Button
                className={duration === 1 ? "btn-selected" : "btn"}
                onClick={() => setDuration(1)}
              >
                1M
              </Button>
              <Button
                className={duration === 5 ? "btn-selected" : "btn"}
                onClick={() => setDuration(5)}
              >
                5M
              </Button>
              <Button
                className={duration === 15 ? "btn-selected" : "btn"}
                onClick={() => setDuration(15)}
              >
                15M
              </Button>
              <Button
                className={duration === 60 ? "btn-selected" : "btn"}
                onClick={() => setDuration(60)}
              >
                1H
              </Button>
              <Button
                className={duration === 240 ? "btn-selected" : "btn"}
                onClick={() => setDuration(240)}
              >
                4H
              </Button>
              <Button
                className={duration === 1440 ? "btn-selected" : "btn"}
                onClick={() => setDuration(1440)}
              >
                1D
              </Button>
              <Button
                className={duration === 10080 ? "btn-selected" : "btn"}
                onClick={() => setDuration(10080)}
              >
                7D
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
        <CollectionTable
          collectionData={collectionData}
          getRespondData={getRespondData}
        />
      </Container>
      <Footer />
    </div>
  );
};

export default connect(mapStatetoProps, mapDispatchToProps)(Trending);
