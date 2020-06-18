import React from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "../Home/Home";
import Login from "../Login/Login";

function index() {
  return (
    <Router>
    <Switch>
      <Route exact path="/">
          <Home />
      </Route>
      <Route path="/login">
          <Login />
      </Route>
    </Switch>
  </Router>
  );
}
export default index;
