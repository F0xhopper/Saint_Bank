import React, { useState } from "react";

/**
 * Login component for user authentication.
 * @param {Object} props - Component props.
 * @param {function} props.setLoggedIn - Function to set the login state.
 * @returns {JSX.Element} Login component JSX.
 */
const Login = (props) => {
  const [usernameInput, setUsernameInput] = useState(""); // State for username input
  const [passwordInput, setPasswordInput] = useState(""); // State for password input

  /**
   * Function to handle login action.
   * If username and password match, setLoggedIn is called to update login state.
   */
  function login() {
    if (usernameInput === "admin" && passwordInput === "123") {
      props.setLoggedIn(true);
      // Reset inputs only after successful login
      setUsernameInput("");
      setPasswordInput("");
    }
  }

  return (
    <div className="adminLoginContainer">
      <div className="usernameInputContainer">
        <input
          className="usernameInput"
          value={usernameInput}
          placeholder="Username"
          onChange={(e) => setUsernameInput(e.target.value)}
        />
      </div>
      <div className="passwordInputContainer">
        <input
          className="passwordInput"
          value={passwordInput}
          placeholder="Password"
          type="password"
          onChange={(e) => setPasswordInput(e.target.value)}
        />
      </div>
      <div className="loginButton" onClick={login}>
        Login →
      </div>
    </div>
  );
};

export default Login;
