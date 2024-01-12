import { useEffect, useState } from "react";
const AdminFacility = (props) => {
  const [depositDisplay, setDepositDisplay] = useState();

  function getDeposited() {
    fetch("http://localhost:3001/depo")
      .then((response) => response.json())
      .then((response) => setDepositDisplay(response));
  }
  function disapprove(content) {
    fetch("http://localhost:3001/delete", {
      method: "delete",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        content: content,
      }),
    });
  }
  function approve(approved) {
    fetch("http://localhost:3001/delete", {
      method: "delete",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        content: approved.Content,
      }),
    });
    fetch("http://localhost:3001/public", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(approved),
    });
    console.log(JSON.stringify(approved));
  }
  useEffect(() => {
    getDeposited();
  });
  return (
    <div className="depositContainer">
      {" "}
      <button
        onClick={() => {
          props.setLoggedIn(false);
        }}
      >
        Log Out
      </button>
      <div className="workCollumn">
        {" "}
        <h1>work</h1>
        {depositDisplay !== undefined
          ? depositDisplay.map((single) => {
              if (single.Type == "Work") {
                return (
                  <div className="saintTypeContentContainer">
                    <h1 className="saintTypeContentH1">{single.Saint}</h1>
                    <h1 className="saintTypeContentH1">{single.Reference}</h1>
                    <h1 className="saintTypeContentH1">{single.Content}</h1>
                    <button
                      value={single}
                      onClick={(e) => {
                        approve(single);
                      }}
                    >
                      ✓
                    </button>{" "}
                    <button
                      value={single.Content}
                      onClick={(e) => {
                        disapprove(e.target.value);
                      }}
                    >
                      ✖
                    </button>
                  </div>
                );
              }
            })
          : null}
      </div>
      <div className="storyCollumn">
        <h1>Story</h1>{" "}
        {depositDisplay !== undefined
          ? depositDisplay.map((single) => {
              if (single.Type == "Story") {
                return (
                  <div className="saintTypeContentContainer">
                    <h1 className="saintTypeContentH1">{single.Saint}</h1>
                    <h1 className="saintTypeContentH1">{single.Reference}</h1>
                    <h1 className="saintTypeContentH1">{single.Content}</h1>
                    <button
                      value={single}
                      onClick={(e) => {
                        approve(single);
                      }}
                    >
                      ✓
                    </button>{" "}
                    <button
                      value={single.Content}
                      onClick={(e) => {
                        disapprove(e.target.value);
                      }}
                    >
                      ✖
                    </button>
                  </div>
                );
              }
            })
          : null}
      </div>
      <div className="quoteCollumn">
        {" "}
        <h1>quote</h1>
        {depositDisplay !== undefined
          ? depositDisplay.map((single) => {
              if (single.Type == "Quote") {
                return (
                  <div className="saintTypeContentContainer">
                    <h1 className="saintTypeContentH1">{single.Saint}</h1>
                    <h1 className="saintTypeContentH1">{single.Content}</h1>
                    <button
                      value={single}
                      onClick={(e) => {
                        approve(single);
                        console.log(single);
                      }}
                    >
                      ✓
                    </button>{" "}
                    <button
                      value={single.Content}
                      onClick={(e) => {
                        disapprove(e.target.value);
                      }}
                    >
                      ✖
                    </button>
                  </div>
                );
              }
            })
          : null}
      </div>
    </div>
  );
};

export default AdminFacility;
