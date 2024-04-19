import title from "./Images/no bg.png";
import { useState } from "react";
import Deposit from "./Components/deposit.js";
import AdminFacility from "./Components/admin.js";
import Public from "./Components/public.js";
import Login from "./Components/login.js";
/**
 * Main component representing the application.
 * @returns {JSX.Element} The rendered App component.
 */
function App() {
  const [loggedIn, setLoggedIn] = useState(false);// If logged in state
  const [depositing, setDepositing] = useState(false);// If deposting state
  return (
    <div className="App">
      <div>
        {" "}
        <div className="topContainer">
          <Login setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
          <div className="titleContainer">
            <img className="titleImage" src={title}></img>
          </div>
        </div>
        <div className="bottomContainer">
          <div className="interactiveContainer">
            {loggedIn == true ? (
              <AdminFacility setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
            ) : (
              <>
                {depositing == true ? (
                  <Deposit setDepositing={setDepositing} />
                ) : (
                  <Public setDepositing={setDepositing} />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
