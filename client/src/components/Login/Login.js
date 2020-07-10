import React from "react";
import { Link } from "react-router-dom";
import Card from "../common/Card";
export const Login = () => {
  return (
    <Link className={"no-decoration center-element "} to="/auth/github">
      <Card
        classNames={
          "center-element width-50 theme-grey-background center-text cursor-pointer"
        }
      >
        <img
          className={"center-element"}
          style={{ width: "10rem" }}
          alt="Github-Icon"
          src="https://cdn.iconscout.com/icon/free/png-256/github-1693585-1442626.png"
        ></img>
      </Card>
    </Link>
  );
};

export default Login;