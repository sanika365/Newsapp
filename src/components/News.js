import React, { useEffect, useState } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const captilizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
           //  console.log("Calling updateNews function. API Key:", props.apiKey);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;

    const headers = new Headers({
      Authorization: `Bearer ${props.apiKey}`,
      // eslint-disable-next-line
    });

    try {
      props.setProgress(10);

      let data = await fetch(url, { headers });

      if (!data.ok) {
        throw new Error(`Failed to fetch data: ${data.status}`);
      }

      props.setProgress(30);
      let parsedData = await data.json();
      props.setProgress(70);

      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);

      props.setProgress(100);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle the error state here
      setLoading(false);
    }
  };
  useEffect(() => {
    document.title = `${captilizeFirstLetter(props.category)}-Newsmonkey`;
    updateNews();

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.country, props.category]);

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country
      }&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1
    }&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

  return (
    <>
      <h1
        className='text-center'
        style={{ margin: "35px 0px", marginTop: "90px" }}
      >
        Newsmonkey-Top {captilizeFirstLetter(props.category)} headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className='container'>
          <div className='row'>
            {articles.map((element) => {
              return (
                <div className='col-md-4' key={element.url}>
                  <NewsItems
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    NewsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};
News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
