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
      <div
        className="depositBackButton"
        onClick={() => {
          props.setLoggedIn(false);
        }}
      >
        Log out
      </div>{" "}
      <div className="allCollumnContainer">
        <div className="workCollumn">
          {" "}
          <div className="worksCollumnTitleContainer">
            <h1>Works</h1>
          </div>{" "}
          <div className="workArticleContainer">
            {depositDisplay !== undefined
              ? depositDisplay.map((single) => {
                  if (single.Type == "Work") {
                    return (
                      <div className="individualArticleContainerAdmin">
                        <h1 className="individualArticleTitle">
                          {single.Saint} - {single.Reference}
                        </h1>
                        <p className="individualArticleContent">
                          {single.Content}
                        </p>
                        <button
                          className="individualApproveButton"
                          value={single}
                          onClick={(e) => {
                            approve(single);
                          }}
                        >
                          ✓
                        </button>{" "}
                        <button
                          className="individualApproveButton"
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
        <div className="storyCollumn">
          <div className="storysCollumnTitleContainer">
            <h1>Storys</h1>
          </div>{" "}
          {depositDisplay !== undefined
            ? depositDisplay.map((single) => {
                if (single.Type == "Story") {
                  return (
                    <div className="individualArticleContainerAdmin">
                      <h1 className="individualArticleTitle">
                        {single.Saint} - {single.Reference}
                      </h1>
                      <p className="individualArticleContent">
                        {single.Content}
                      </p>
                      <button
                        className="individualApproveButton"
                        value={single}
                        onClick={(e) => {
                          approve(single);
                        }}
                      >
                        ✓
                      </button>{" "}
                      <button
                        className="individualApproveButton"
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
          <div className="quotesCollumnTitleContainer">
            <h1>Quotes</h1>
          </div>
          {depositDisplay !== undefined
            ? depositDisplay.map((single) => {
                if (single.Type == "Quote") {
                  return (
                    <div className="individualArticleContainerAdmin">
                      <h1 className="individualArticleTitle">
                        {single.Saint} - {single.Reference}
                      </h1>
                      <p className="individualArticleContent">
                        {single.Content}
                      </p>
                      <button
                        className="individualApproveButton"
                        value={single}
                        onClick={(e) => {
                          approve(single);
                          console.log(single);
                        }}
                      >
                        ✓
                      </button>{" "}
                      <button
                        className="individualApproveButton"
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
    </div>
  );
};

export default AdminFacility;
