import { useState } from "react";

const Login = (props) => {
  const [usernameInput, setUsernameInput] = useState();
  const [passwordInput, setpasswordInput] = useState();
  function login() {
    if (usernameInput == "admin" && passwordInput == "admin") {
      props.setLoggedIn(true);
    }
  }
  return (
    <div className="adminLoginContainer">
      <div className="usernameInputContainer">
        <input
          placeholder="Username"
          onChange={(e) => {
            setUsernameInput(e.target.value);
          }}
        ></input>
      </div>
      <div className="passwordInputContainer">
        <input
          className="Password"
          onChange={(e) => {
            setpasswordInput(e.target.value);
          }}
        ></input>
      </div>
      <button onClick={login}>Login</button>
    </div>
  );
};

export default Login;
