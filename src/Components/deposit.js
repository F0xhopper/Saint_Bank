import React, { useState } from "react";

/**
 * Component for depositing articles
 * @param {Object} props - The component props
 * @param {Function} props.setDepositing - Function to set the depositing state
 * @returns {JSX.Element} The Deposit component
 */
const Deposit = (props) => {
  // State variables for input fields
  const [saintInput, setSaintInput] = useState("");
  const [typeInput, setTypeInput] = useState("Work");
  const [referenceInput, setReferenceInput] = useState("");
  const [contentInput, setContentInput] = useState("");

  // Function to handle article submission
  const handlePost = () => {
    // Sends article inputted to depo database
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

    // Reset input fields after submission
    setSaintInput("");
    setReferenceInput("");
    setContentInput("");
  };

  return (
    <div className="depositContainer">
      <div
        className="depositBackButton"
        onClick={() => props.setDepositing(false)}
      >
        Back
      </div>
      <div className="depositSelectorContainer">
        <select
          className="depositSelector"
          value={typeInput}
          onChange={(e) => setTypeInput(e.target.value)}
        >
          <option value="Work">Work</option>
          <option value="Quote">Quote</option>
          <option value="Story">Story</option>
        </select>
      </div>
      <div className="depositInsideContainer">
        <div className="depositSaintInputContainer">
          <input
            className="depositSaintInput"
            value={saintInput}
            placeholder="Saint"
            onChange={(e) => setSaintInput(e.target.value)}
          />
        </div>
        {typeInput !== "Quote" && (
          <div className="depositReferenceInputContainer">
            <input
              className="depositReferenceInput"
              value={referenceInput}
              placeholder="Reference"
              onChange={(e) => setReferenceInput(e.target.value)}
            />
          </div>
        )}
        <div className="depositContentInputContainer">
          <textarea
            className="depositContentInput"
            value={contentInput}
            placeholder="Content"
            onChange={(e) => setContentInput(e.target.value)}
          />
        </div>
        <div className="depositDepositButtonContainer">
          <div className="depositDepositButton" onClick={handlePost}>
            Deposit
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
