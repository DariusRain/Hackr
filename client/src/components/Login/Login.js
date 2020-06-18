import React from "react";
function Login() {
  return (
    <div className="login">
    <div style={{margin:"0 auto"}}>
      <h1>Get latest tech news & meet other developers.</h1>
    </div>
      <div style={{margin:"0 auto", marginTop: "2rem", textAlign: "center"}} >
      <a href="/github" style={{ textDecoration:"none",}}>
        <img style={{height:"6rem"}} alt="Github Icon" src="https://cdn.iconscout.com/icon/free/png-256/github-1693585-1442626.png" />
        <br />
        <span  style={{color:"black", textAlign: "center"}}>
            Sign in
        </span>
      </a>
    </div>
    </div>
  );
}



export default Login;
