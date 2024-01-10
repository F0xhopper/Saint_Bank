import { useEffect, useState } from "react";

const Public = (props) => {
  const [publicDisplay, setPublicDisplay] = useState();
  const [articleInView, setArticleInView] = useState();
  const [searchInput, setSearchInput] = useState();
  function getPublic() {
    fetch("http://localhost:3001/public")
      .then((response) => response.json())
      .then((response) => setPublicDisplay(response));
  }
  function displayRandom() {
    setArticleInView(
      publicDisplay[Math.floor(Math.random() * publicDisplay.length)]
    );
  }
  function setArticleInViewFunction(e) {
    const articleClicked = publicDisplay.find((x) => x.Reference === e);
    setArticleInView(articleClicked);
  }
  useEffect(() => {
    getPublic();
  });
  return (
    <div className="publicContainer">
      {articleInView == undefined ? (
        <div className="overallViewContainer">
          {" "}
          <div className="randomButtonContainer">
            <button onClick={displayRandom}>random</button>
          </div>
          <div className="searchBarContainer">
            <input
              className="searchBar"
              placeholder="Search"
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
            ></input>
          </div>
          <div className="depositButtonContainer">
            <button
              onClick={() => {
                props.setDepositing(true);
              }}
            >
              Deposit
            </button>
          </div>
          <div className="allCollumnContainer">
            <div className="workCollumn">
              <div className="worksCollumnTitleContainer">
                <h1>Works</h1>
              </div>
              <div className="workArticleContainer">
                {publicDisplay !== undefined
                  ? publicDisplay.map((article) => {
                      if (article.Type == "Work") {
                        if (
                          searchInput == undefined ||
                          article.Saint.toUpperCase().includes(
                            searchInput.toUpperCase()
                          ) ||
                          article.Reference.toUpperCase().includes(
                            searchInput.toUpperCase()
                          ) ||
                          article.Content.toUpperCase().includes(
                            searchInput.toUpperCase()
                          )
                        ) {
                          return (
                            <div
                              className="individualArticleContainer"
                              value={article.Reference}
                              onClick={() => {
                                setArticleInViewFunction(article.Reference);
                              }}
                            >
                              <h1 className="individualArticleTitle">
                                {article.Saint} - {article.Reference}
                              </h1>

                              <p className="individualArticleContent">
                                {article.Content}
                              </p>
                            </div>
                          );
                        }
                      }
                    })
                  : null}
              </div>
            </div>
            <div className="storyCollumn">
              {" "}
              <div className="storysCollumnTitleContainer">
                <h1>Story</h1>
              </div>{" "}
              <div className="storyArticleContainer">
                {publicDisplay !== undefined
                  ? publicDisplay.map((article) => {
                      if (article.Type == "Story's") {
                        if (
                          searchInput == undefined ||
                          article.Saint.toUpperCase().includes(
                            searchInput.toUpperCase()
                          ) ||
                          article.Reference.toUpperCase().includes(
                            searchInput.toUpperCase()
                          ) ||
                          article.Content.toUpperCase().includes(
                            searchInput.toUpperCase()
                          )
                        ) {
                          return (
                            <div
                              className="individualArticleContainer"
                              onClick={() => {
                                setArticleInViewFunction(article.Reference);
                              }}
                            >
                              <h1 className="individualArticleTitle">
                                {article.Saint} - {article.Reference}
                              </h1>

                              <p className="individualArticleContent">
                                {article.Content}
                              </p>
                            </div>
                          );
                        }
                      }
                    })
                  : null}
              </div>
            </div>
            <div className="quoteCollumn">
              {" "}
              <div className="quotesCollumnTitleContainer">
                <h1>quote</h1>
              </div>{" "}
              <div className="quoteArticleContainer">
                {publicDisplay !== undefined
                  ? publicDisplay.map((article) => {
                      if (article.Type == "Quote") {
                        if (
                          searchInput == undefined ||
                          article.Saint.toUpperCase().includes(
                            searchInput.toUpperCase()
                          ) ||
                          article.Content.toUpperCase().includes(
                            searchInput.toUpperCase()
                          )
                        ) {
                          return (
                            <div className="individualArticleContainer">
                              <h1 className="individualArticleTitle">
                                {article.Saint}
                              </h1>
                              <p className="individualArticleContent">
                                {article.Content}
                              </p>
                            </div>
                          );
                        }
                      }
                    })
                  : null}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="articleInViewContainer">
          <button
            onClick={() => {
              setArticleInView(undefined);
            }}
          >
            Back
          </button>
          <h1>{articleInView.Saint}</h1>
          <h1>{articleInView.Reference}</h1>
          <h1>{articleInView.Content}</h1>
        </div>
      )}
    </div>
  );
};

export default Public;
