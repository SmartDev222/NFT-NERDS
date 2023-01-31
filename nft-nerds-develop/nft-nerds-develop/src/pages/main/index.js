import React, { Component } from "react";
import { connect } from "react-redux";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typewriter from "typewriter-effect";
import { ContractFetchData } from "../../actions/collections";
import "./style.scss";
import { Button } from "@mui/material";
import Footer from "../../layout/Footer";
import Header from "../../layout/Header";

function mapStatetoProps(state) {
  return {
    posts: state.posts,
    hasErrored: state.postsHasErrored,
    isLoading: state.postsIsLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchData: (address) => dispatch(ContractFetchData(address)),
  };
}

class MainPage extends Component {
  componentDidMount() {
    // this.props.fetchData("0x34d85c9cdeb23fa97cb08333b511ac86e1c4e258");
  }

  render() {
    return (
      <div>
        <Header {...this.props} />
        <div className="main-page">
          <Container maxWidth="xl" className="main-page-container">
            <Grid container spacing={2} className="main-page-grid">
              <Grid item xs={12} className="grid-1">
                <h3>Trading NFTs? Welcome home</h3>
                <Box>
                  <Typewriter
                    onInit={(typewriter) => {
                      typewriter
                        .typeString("Discover")
                        .pauseFor(1500)
                        .deleteAll()
                        .typeString("Analyse")
                        .pauseFor(1500)
                        .deleteAll()
                        .typeString("Instantly buy")
                        .pauseFor(1500)
                        .start();
                    }}
                    options={{ loop: true }}
                  />
                  <h6>the best NFTs on the market</h6>
                </Box>
              </Grid>
              <Grid item xs={12} md={4} className="grid-2">
                <h4>Speedy Buy Functions!</h4>
                <p>Find the best deal and place your order at record speeds.</p>
                <p>
                  Alerts with
                  <span style={{ color: "white", fontWeight: "500" }}>
                    &nbsp;buy auto-triggers&nbsp;
                  </span>
                  when a token matches your filter criteria.
                </p>
                <Button href="/customAlerts">Set up alerts</Button>
              </Grid>
              <Grid item xs={12} md={8} className="grid-3">
                <Box>
                  <img
                    src="https://d354yzmfb4qqsa.cloudfront.net/static/new-alert-fg.png"
                    alt="buying"
                    width="100%"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={8} className="grid-4">
                <Box>
                  <img
                    src="https://d354yzmfb4qqsa.cloudfront.net/static/new-alert-fg.png"
                    alt="live"
                    width="100%"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={4} className="grid-5 grid-2">
                <h4>Track Listings & Sales Quickly</h4>
                <p>
                  Get up to date info on
                  <span style={{ color: "white", fontWeight: "500" }}>
                    &nbsp;all listings and sales&nbsp;
                  </span>
                  by the second.
                </p>
                <p>
                  Setup <a href="/customAlerts">Custom Alerts</a>for a better
                  experience.
                </p>
              </Grid>
              <Grid item xs={12} md={4} className="grid-6 grid-2">
                <h4>Rarity Sniping</h4>
                <p>
                  Find the best rank at the best price with accurate and{" "}
                  <span style={{ color: "white", fontWeight: "500" }}>
                    official rankings
                  </span>
                </p>
                <p>
                  No more cross-checking of multiple sites,
                  <span style={{ color: "white", fontWeight: "500" }}>
                    &nbsp;all data available in a single place
                  </span>
                  .
                </p>
                <Button href="/faq">read more</Button>
              </Grid>
              <Grid item xs={12} md={8} className="grid-7 grid-4">
                <Box>
                  <img
                    src="https://d354yzmfb4qqsa.cloudfront.net/static/rare-v3.png"
                    alt="rarity"
                    width="100%"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={8} className="grid-8 grid-4">
                <Box>
                  <img
                    src="https://d354yzmfb4qqsa.cloudfront.net/static/trending.png"
                    alt="trending"
                    width="100%"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={4} className="grid-9 grid-2">
                <h4>See What's Hot</h4>
                <p>
                  Find the next hot project with volume , raising floor prices,
                  and up to{" "}
                  <span style={{ color: "white", fontWeight: "500" }}>
                    date sales.
                  </span>
                  .
                </p>
                <Button href="/trending">See What's Hot</Button>
              </Grid>
            </Grid>
          </Container>
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(MainPage);
