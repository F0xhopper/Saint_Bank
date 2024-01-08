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
          <div className="workCollumn">
            {" "}
            <button
              onClick={() => {
                props.setDepositing(true);
              }}
            >
              Deposit
            </button>
            <input
              placeholder="Search"
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
            ></input>
            <h1>work</h1>
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
                          className="saintTypeContentContainer"
                          onClick={(e) => {
                            setArticleInViewFunction(
                              e.currentTarget.childNodes[1].textContent
                            );
                          }}
                        >
                          <h1 className="saintTypeContentH1">
                            {article.Saint}
                          </h1>
                          <h1 className="saintTypeContentH1">
                            {article.Reference}
                          </h1>
                          <p className="saintTypeContentH1">
                            {article.Content}
                          </p>
                        </div>
                      );
                    }
                  }
                })
              : null}
          </div>
          <div className="storyCollumn">
            <h1>Story</h1>{" "}
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
                          className="saintTypeContentContainer"
                          onClick={(e) => {
                            setArticleInViewFunction(
                              e.currentTarget.childNodes[1].textContent
                            );
                          }}
                        >
                          <h1 className="saintTypeContentH1">
                            {article.Saint}
                          </h1>
                          <h1 className="saintTypeContentH1">
                            {article.Reference}
                          </h1>
                          <p className="saintTypeContentH1">
                            {article.Content}
                          </p>
                        </div>
                      );
                    }
                  }
                })
              : null}
          </div>
          <div className="quoteCollumn">
            {" "}
            <h1>quote</h1>
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
                        <div className="saintTypeContentContainer">
                          <h1 className="saintTypeContentH1">
                            {article.Saint}
                          </h1>
                          <h1 className="saintTypeContentH1">
                            {article.Content}
                          </h1>
                        </div>
                      );
                    }
                  }
                })
              : null}
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
