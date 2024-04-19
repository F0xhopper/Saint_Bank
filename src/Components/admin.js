import { useEffect, useState } from "react";
/**
 * Renders an individual article component
 * @param {Object} props - The component props
 * @param {Object} props.article - The article object
 * @param {Function} props.approve - Function to approve the article.
 * @param {Function} props.disapprove - Function to disapprove the article
 * @returns {JSX.Element} An individual article component
 */
const IndividualArticle = ({ article, approve, disapprove }) => {
  return (
    <div className="individualArticleContainerAdmin">
      <h1 className="individualArticleTitle">
        {article.Saint} - {article.Reference}
      </h1>
      <p className="individualArticleContent">{article.Content}</p>
      <button
        className="individualApproveButton"
        onClick={() => approve(article)}
      >
        ✓
      </button>{" "}
      <button
        className="individualApproveButton"
        onClick={() => disapprove(article.Content)}
      >
        ✖
      </button>
    </div>
  );
};

/**
 * Renders the admin facility component.
 * @param {Object} props - The component props.
 * @param {Function} props.setLoggedIn - Function to set the logged-in state.
 * @returns {JSX.Element} The admin facility component.
 */
const AdminFacility = (props) => {
  // State hook to manage deposit display
  const [depositDisplay, setDepositDisplay] = useState();

  // Function to fetch deposited articles
  function getDeposited() {
    fetch("http://localhost:3001/depo")
      .then((response) => response.json())
      .then((response) => setDepositDisplay(response));
  }

  // Function to disapprove an article
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
    // Get new updated deposit data
    getDeposited();
  }

  // Function to approve an article
  function approve(approved) {
    // Deletes approved article from the depo database
    fetch("http://localhost:3001/delete", {
      method: "delete",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        content: approved.Content,
      }),
    });
    // Posts approved article to public database
    fetch("http://localhost:3001/public", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(approved),
    });
    // Get new updated deposit data
    getDeposited();
  }

  // Fetch deposited articles on component mount
  useEffect(() => {
    getDeposited();
  }, []);

  // Function to render articles based on type (Work, Story, Quote)
  const renderArticles = (type) => {
    return depositDisplay !== undefined
      ? depositDisplay.map((single) => {
          if (single.Type === type) {
            return (
              <IndividualArticle
                article={single}
                approve={approve}
                disapprove={disapprove}
              />
            );
          }
          return null;
        })
      : null;
  };

  return (
    <div className="depositContainer">
      <div
        className="depositBackButton"
        onClick={() => {
          props.setLoggedIn(false);
        }}
      >
        Log out
      </div>{" "}
      <div style={{ marginTop: "17px" }} className="allCollumnContainer">
        <div className="workCollumn">
          <div className="worksCollumnTitleContainer">
            <h1>Works</h1>
          </div>
          <div className="workArticleContainer">{renderArticles("Work")}</div>
        </div>
        <div className="storyCollumn">
          <div className="storysCollumnTitleContainer">
            <h1>Storys</h1>
          </div>
          {renderArticles("Story")}
        </div>
        <div className="quoteCollumn">
          <div className="quotesCollumnTitleContainer">
            <h1>Quotes</h1>
          </div>
          {renderArticles("Quote")}
        </div>
      </div>
    </div>
  );
};

export default AdminFacility;
