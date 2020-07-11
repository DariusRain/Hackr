import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Navbar from "../Navbar/Navbar";
import { apiRoot } from "../../config";
function AppRouter() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route
          exact
          path="/auth/github"
          component={() => {
            window.location.href = `${apiRoot}/auth/github`;
            return null;
          }}
        />
        <Route path="/auth/github/callback" >
          {/* <User /> */}
        </Route>
      </Switch>
    </Router>
  );
}
export default AppRouter;
