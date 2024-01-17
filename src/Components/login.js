import { useState } from "react";

const Login = (props) => {
  const [usernameInput, setUsernameInput] = useState();
  const [passwordInput, setpasswordInput] = useState();
  function login() {
    // if (usernameInput == "admin" && passwordInput == "admin") {
    props.setLoggedIn(true);
    // }
    setUsernameInput("");
    setpasswordInput("");
  }
  return (
    <div className="adminLoginContainer">
      <div className="usernameInputContainer">
        <input
          className="usernameInput"
          value={usernameInput}
          placeholder="Username"
          onChange={(e) => {
            setUsernameInput(e.target.value);
          }}
        ></input>
      </div>
      <div className="passwordInputContainer">
        <input
          className="passwordInput"
          value={passwordInput}
          placeholder="Password"
          onChange={(e) => {
            setpasswordInput(e.target.value);
          }}
        ></input>
      </div>
      <div className="loginButton" onClick={login}>
        Login →
      </div>
    </div>
  );
};

export default Login;
