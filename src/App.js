import { useState } from "react";

function App() {
  const [saintInput, setSaintInput] = useState();
  const [typeInput, setTypeInput] = useState();
  const [contentInput, setContentInput] = useState();

  function post() {
    fetch("http://localhost:3001/depo", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        saint: saintInput,
        type: typeInput,
        content: contentInput,
      }),
    });
  }
  function getDeposited() {}
  return (
    <div className="App">
      <div>
        <h1>The Soul Bank</h1>
        <div>
          <input
            placeholder="Saint"
            onChange={(e) => {
              setSaintInput(e.target.value);
            }}
          ></input>
          <select
            onChange={(e) => {
              setTypeInput(e.target.value);
            }}
          >
            <option>Quote</option>
            <option>Work</option>
            <option>Story</option>
          </select>
          <textarea
            placeholder="Content"
            onChange={(e) => {
              setContentInput(e.target.value);
            }}
          ></textarea>
          <button onClick={post}>Deposit</button>
        </div>
      </div>
    </div>
  );
}

export default App;
