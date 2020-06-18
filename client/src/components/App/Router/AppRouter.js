import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "../Home/Home";

function index() {
  return (
    <Switch>
      <Router exact path="/">
          <Home />
      </Router>
    </Switch>
  );
}
export default index;
