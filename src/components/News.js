import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(''); // For search functionality
  const [domain, setDomain] = useState(''); // For domain filtering

  const capitalise = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const fetchNews = async (pageToFetch) => {
    const baseUrl = 'https://api.currentsapi.services/v1/search?';
    const apiKey = `apiKey=${props.apiKey}`;
    const params = [
      `language=en`, // Default to English
      query && `keywords=${query}`,
      // (!query&&props.category) &&`keywords=${props.category}` ,                           // Add keywords if provided
      domain && `domain=${domain}`, // Add domain if provided
      props.country&&`country=${props.country}`, // Example country code
    ]
      .filter(Boolean)
      .join('&');

    const url = `${baseUrl}${params}&${apiKey}`;

    try {
      const req = new Request(url);
      const response = await fetch(req);
      const parsedData = await response.json();
      if (pageToFetch === 1) {
        setArticles(parsedData.news); // Replace articles on initial load or new query
      } else {
        setArticles((prevArticles) => [...prevArticles, ...parsedData.news]); // Append for infinite scroll
      }
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch news:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = `${capitalise(props.category)} - NewsMonkey`;
    setLoading(true);
    fetchNews(1);
    // eslint-disable-next-line
  }, [query, domain]);
  useEffect(()=>{
    setQuery(props.category)
  },[props.category])
  const fetchMoreData = async () => {
    setPage((prevPage) => {
      const nextPage = prevPage + 1;
      fetchNews(nextPage);
      return nextPage;
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchNews(1);
  };

  return (
    <>
      <h2 className="text-center" style={{ marginTop: '90px' }}>
        NewsMonkey - Top headlines from {capitalise(props.category)}
      </h2>
      <div className="container my-3">
        <form className="d-flex" onSubmit={handleSearch}>
          <input
            type="text"
            className="form-control me-2"
            placeholder="Search for news..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <input
            type="text"
            className="form-control me-2"
            placeholder="Filter by domain (e.g., zdnet.com)"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />
          <button className="btn btn-dark" type="submit">
            Search
          </button>
        </form>
      </div>

      {loading ? <Spinner />:

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={true} // Assuming no total results property in Currents API
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => (
              <div className="col-md-4" key={element.id}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ''}
                  description={
                    element.description
                      ? element.description.slice(0, 88)
                      : ''
                  }
                  imageurl={
                    element.image
                      ? element.image
                      : 'https://via.placeholder.com/150'
                  }
                  newsurl={element.url}
                  author={element.author || 'Unknown'}
                  date={element.published || 'Not available'}
                  source={element.source || 'Unknown'}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>}
    </>
  );
};

News.defaultProps = {
  apiKey: 'baENdS0-5BiA_3gvpQ7D51tAI5yc1pxyHKfYeUzrVtNF22Rp',
  pageSize: 8,
  category: 'general',
};

News.propTypes = {
  apiKey: PropTypes.string.isRequired,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
