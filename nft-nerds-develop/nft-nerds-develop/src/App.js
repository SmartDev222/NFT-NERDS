import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Logout from "./components/auth/Logout";
import Trending from "./pages/trending";
import Asset from "./pages/asset";
import Faq from "./pages/faq";
import Collection from "./pages/collection/main";
import CustomAlerts from "./pages/customAlerts";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import TopHeader from "./layout/TopHeader";
import main from "./pages/main";
// Import HOC MiddleWares
import requireAuth from "./components/hoc/require_auth";
import noRequireAuth from "./components/hoc/no_require_auth";
import SignIn from "./pages/SignIn";

function App() {
  
  return (
    <div className="MuiBox-root css-zf0iqh">
      
      <Switch>
        <Route path="/" exact component={noRequireAuth(main)} />
        <Route path="/trending" exact component={requireAuth(Trending)} />
        <Route
          path="/collection/:address"
          exact
          component={requireAuth(Collection)}
        />
        <Route path="/login" exact component={noRequireAuth(Login)} />
        <Route path="/register" exact component={noRequireAuth(Register)} />
        <Route path="/logout" exact component={noRequireAuth(Logout)} />
        <Route path="/asset" exact component={noRequireAuth(Asset)} />
        <Route path="/faq" exact component={noRequireAuth(Faq)} />
        <Route
          path="/customAlerts"
          exact
          component={requireAuth(CustomAlerts)}
        />
        <Route path="/signin" exact component={noRequireAuth(SignIn)} />
      </Switch>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
