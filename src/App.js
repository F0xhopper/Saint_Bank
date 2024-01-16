import saintImage from "./Images//tumblr_nj7pdo0cWa1sknvnko2_r1_1280.png";
import title from "./Images/New Project (7).png";
import { useEffect, useState } from "react";
import Deposit from "./Components/deposit.js";
import AdminFacility from "./Components/admin.js";
import Public from "./Components/public.js";
import Login from "./Components/login.js";
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [depositing, setDepositing] = useState(false);
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
          <div className="imageContainer">
            <img className="image" src={saintImage}></img>
          </div>
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
