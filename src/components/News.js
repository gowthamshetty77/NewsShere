import React, { useEffect, useState } from "react";
import NewsItem from "../NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (val) => {
    return val.charAt(0).toUpperCase() + val.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);

    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `NewsSphere |  ${capitalizeFirstLetter(props.category)}`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  // const handlePrevClick = () => {
  //   setPage(page - 1);
  //   updateNews();
  // }
  // const handleNextClick = () => {
  //   setPage(page + 1);
  //   updateNews();
  // }

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apikey=${props.apiKey}&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    setPage(page + 1);
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setLoading(false);
  };

  return (
    <>
      <h1
        className="text-center"
        style={{ margin: "35px 0", marginTop: "90px" }}
      >
        NewsSphere - Top Headlines
      </h1>
      <h3 style={{ marginLeft: "80px" }}>
        Category: {capitalizeFirstLetter(props.category)}
      </h3>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((ele) => {
              return (
                <div className="col-md-4" key={ele.url}>
                  <NewsItem
                    title={
                      ele.title
                        ? ele.title
                        : "Meet Citadel partner Micah Nance,"
                    }
                    description={
                      ele.description
                        ? ele.description
                        : "The idea that ultra-high-net-worth individuals are more concerned"
                    }
                    imageUrl={
                      ele.urlToImage
                        ? ele.urlToImage
                        : "https://i.insider.com/67a3b0af7bb3f854015bdbec?width=1200&format=jpeg"
                    }
                    newsUrl={
                      ele.url
                        ? ele.url
                        : "https://www.businessinsider.com/how-wealthiest-investing-in-the-stock-market-2025-2025-2"
                    }
                    id={ele.source.id ? ele.source.id : "sourceID"}
                    author={ele.author ? ele.author : "James"}
                    publishedAt={
                      ele.publishedAt
                        ? new Date(ele.publishedAt).toGMTString()
                        : "2025-02-10"
                    }
                    source={ele.source.name ? ele.source.name : "NPR"}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>

      {/* <div className="container d-flex justify-content-between">
          <button
            disabled={page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              page + 1 >
              Math.ceil(totalResults / props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
    </>
  );
};

News.defaultProps = {
  country: "us",
  pageSize: 6,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
