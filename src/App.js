import { useEffect, useState } from "react";
import Deposit from "./Components/deposit.js";
import AdminFacility from "./Components/admin.js";

function App() {
  return (
    <div className="App">
      <div>
        <h1>The Soul Bank</h1>
        <Deposit />
        <AdminFacility />
      </div>
    </div>
  );
}

export default App;
