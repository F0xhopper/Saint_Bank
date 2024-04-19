import { useEffect, useState } from "react";

/**
 * Component for displaying individual articles
 * @param {Object} props - Component props
 * @param {Object} props.article - The article data to display
 * @param {Function} props.setArticleInViewFunction - Function to set the article in view
 * @returns {JSX.Element} IndividualArticle component JSX
 */
const IndividualArticle = ({ article, setArticleInViewFunction }) => {
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
};

/**
 * Component for displaying public articles
 * @param {Object} props - Component props
 * @param {Function} props.setDepositing - Function to set the depositing state
 * @returns {JSX.Element} Public component JSX
 */
const Public = (props) => {
  const [publicDisplay, setPublicDisplay] = useState([]);
  const [articleInView, setArticleInView] = useState();
  const [searchInput, setSearchInput] = useState("");
  const [saints, setSaints] = useState([]);

  // Fetch public articles from the database
  function getPublic() {
    fetch("http://localhost:3001/public")
      .then((response) => response.json())
      .then((response) => {
        setPublicDisplay(response);
        const saintsForDrop = response.map((article) => article.Saint);
        const uniqueSaints = [...new Set(saintsForDrop)];
        setSaints(uniqueSaints);
      });
  }


  // Display a random article
  function displayRandom() {
    setArticleInView(
      publicDisplay[Math.floor(Math.random() * publicDisplay.length)]
    );
  }

  /**
   * Set the article in view based on the clicked article content
   * @param {string} e - Content of the clicked article
   */
  function setArticleInViewFunction(e) {
    const articleClicked = publicDisplay.find((x) => x.Content === e);
    setArticleInView(articleClicked);
  }

  useEffect(() => {
    getPublic();
  }, []);

  /**
   * Render articles based on their type and search input
   * @param {string} type - Type of articles to render
   * @returns {JSX.Element[]} Array of JSX elements representing articles
   */
  const renderArticles = (type) => {
    return publicDisplay.map((article) => {
      if (article.Type === type) {
        if (
          !searchInput ||
          article.Saint.toUpperCase().includes(searchInput.toUpperCase()) ||
          article.Content.toUpperCase().includes(searchInput.toUpperCase())
        ) {
          return (
            <IndividualArticle
              key={article.Content}
              article={article}
              setArticleInViewFunction={setArticleInViewFunction}
            />
          );
        }
      }
      return null;
    });
  };

  return (
    <div className="publicContainer">
      {articleInView === undefined ? (
        <div className="overallViewContainer">
          <div className="searchContainer">
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
              ></input>{" "}
              <select
                className="saintDropdown"
                onChange={(e) => {
                  setSearchInput(
                    e.target.value !== "All saint's" ? e.target.value : ""
                  );
                }}
              >
                <option>All saint's</option>
                {saints.map((saint, index) => (
                  <option key={index}>{saint}</option>
                ))}
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
          </div>
          <div className="allCollumnContainer">
            <div className="workCollumn">
              <div className="worksCollumnTitleContainer">
                <h1>Works</h1>
              </div>
              <div className="workArticleContainer">
                {renderArticles("Work")}
              </div>
            </div>
            <div className="storyCollumn">
              <div className="storysCollumnTitleContainer">
                <h1>Storys</h1>
              </div>
              <div className="storyArticleContainer">
                {renderArticles("Story")}
              </div>
            </div>
            <div className="quoteCollumn">
              <div className="quotesCollumnTitleContainer">
                <h1>Quotes</h1>
              </div>
              <div className="quoteArticleContainer">
                {renderArticles("Quote")}
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
            <h1>
              {articleInView.Type === "Quote"
                ? articleInView.Saint
                : `${articleInView.Saint} - ${articleInView.Reference}`}
            </h1>
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
