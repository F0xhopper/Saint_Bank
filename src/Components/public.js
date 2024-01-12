import { render } from "@testing-library/react";
import { useEffect, useState } from "react";

const Public = (props) => {
  const [publicDisplay, setPublicDisplay] = useState();
  const [articleInView, setArticleInView] = useState();
  const [searchInput, setSearchInput] = useState();
  const [saints, setSaints] = useState();
  const [selectedSaint, setSelectedSaint] = useState("All saint's");
  function getPublic() {
    fetch("http://localhost:3001/public")
      .then((response) => response.json())
      .then((response) => {
        setPublicDisplay(response);
        const saintsForDrop = [];
        response.forEach((article) => {
          if (saintsForDrop.includes(article.Saint)) {
          } else saintsForDrop.push(article.Saint);
        });
        setSaints(saintsForDrop);
      });
  }
  function displayRandom() {
    setArticleInView(
      publicDisplay[Math.floor(Math.random() * publicDisplay.length)]
    );
  }

  function setArticleInViewFunction(e) {
    const articleClicked = publicDisplay.find((x) => x.Content === e);
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
            <div className="randomButton" onClick={displayRandom}>
              Surprise
            </div>
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
          <div className="saintDropdownContainer">
            <select
              onChange={(e) => {
                if (e.target.value !== "All saint's") {
                  setSearchInput(e.target.value);
                } else {
                  setSearchInput(undefined);
                }
              }}
            >
              <option>All saint's</option>
              {saints !== undefined
                ? saints.map((saint) => {
                    return <option>{saint}</option>;
                  })
                : null}
            </select>
          </div>
          <div className="depositButtonContainer">
            <div
              className="depositButton"
              onClick={() => {
                props.setDepositing(true);
              }}
            >
              Deposit
            </div>
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
                              onClick={() => {
                                setArticleInViewFunction(article.Content);
                              }}
                            >
                              <h1 className="individualArticleTitle">
                                {article.Saint} - {article.Reference}
                              </h1>

                              <p className="individualArticleContent">
                                "{article.Content.slice(0, 280)}..."
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
                <h1>Storys</h1>
              </div>{" "}
              <div className="storyArticleContainer">
                {publicDisplay !== undefined
                  ? publicDisplay.map((article) => {
                      if (article.Type == "Story") {
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
                                setArticleInViewFunction(article.Content);
                              }}
                            >
                              <h1 className="individualArticleTitle">
                                {article.Saint} - {article.Reference}
                              </h1>

                              <p className="individualArticleContent">
                                "{article.Content.slice(0, 280)}..."
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
                <h1>Quotes</h1>
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
                            <div
                              className="individualArticleContainer"
                              onClick={() => {
                                setArticleInViewFunction(article.Content);
                              }}
                            >
                              <h1 className="individualArticleTitle">
                                {article.Saint}
                              </h1>
                              <p className="individualArticleContent">
                                "{article.Content}"
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
          <div
            onClick={() => {
              setArticleInView(undefined);
            }}
            className="articleInViewButton"
          >
            Back
          </div>
          <div className="articleInViewDisplayArticleContainer">
            {articleInView.Type == "Quote" ? (
              <h1>{articleInView.Saint}</h1>
            ) : (
              <h1>
                {articleInView.Saint} - {articleInView.Reference}
              </h1>
            )}
            <div className="articleInViewContentContainer">
              <p className="articleInViewContent">{articleInView.Content}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Public;
