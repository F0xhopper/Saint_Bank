import { useState } from "react";

const Deposit = (props) => {
  const [saintInput, setSaintInput] = useState();
  const [typeInput, setTypeInput] = useState("Work");
  const [referenceInput, setReferenceInput] = useState();
  const [contentInput, setContentInput] = useState();
  function post() {
    let changedRefernce = null;

    fetch("http://localhost:3001/depo", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        saint: saintInput,
        type: typeInput,
        reference: referenceInput,
        content: contentInput,
      }),
    });
    // props.setDepositing(false);
    setReferenceInput("");
    setSaintInput("");
    setContentInput("");
  }
  return (
    <div className="depositContainer">
      <div
        className="depositBackButton"
        onClick={() => {
          props.setDepositing(false);
        }}
      >
        Back
      </div>
      <div className="depositInsideContainer">
        <input
          className="depositSaintInput"
          value={saintInput}
          placeholder="Saint"
          onChange={(e) => {
            setSaintInput(e.target.value);
          }}
        ></input>
        <select
          className="depositSelector"
          onChange={(e) => {
            setTypeInput(e.target.value);
          }}
        >
          <option>Work</option> <option>Quote</option>
          <option>Story</option>
        </select>
        {typeInput !== "Quote" ? (
          <input
            className="depositReferenceInput"
            value={referenceInput}
            placeholder="Reference"
            onChange={(e) => {
              setReferenceInput(e.target.value);
            }}
          ></input>
        ) : null}
        <textarea
          className="depositContentInput"
          value={contentInput}
          placeholder="Content"
          onChange={(e) => {
            setContentInput(e.target.value);
          }}
        ></textarea>
        <button className="depositDepositButton" onClick={post}>
          Deposit
        </button>
      </div>
    </div>
  );
};

export default Deposit;
