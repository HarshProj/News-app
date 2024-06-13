import React, { useEffect,useState } from 'react'
// import PropTypes from 'prop-types'

import InfiniteScroll from "react-infinite-scroll-component";
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

const News =(props)=> {
  const [articles,setArticles]=useState([])
  const [loading,setLoading]=useState(true)
  const [page,setPage]=useState(1)
  const [totalResults,setTotalResults]=useState(0)
  
  // static defaultProps={
  //   country:'in',
  //   pagesize:8,
  //   category:"general",
  // }
  // static propTypes={
  //   country:PropTypes.string,
  //   pagesize:PropTypes.number,
  //   category:PropTypes.string,
  // }
  // constructor(props){
    //   super(props);
  //   // console.log("Hello i am a constructor from news component");
  //   this.state={
    //     articles:[],
  //     loading:true,
  //     page:1,
  //     totalResults:0,
  //   }
  //   document.title=`${this.capitalise(this.props.category)}-NewsMonkey`;
  // }
  
  const capitalise=(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }
  const updateNews=async ()=>{
    props.setProgress(10);
    let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page},&pageSize=${props.pagesize}`;
    // console.log(page);
    let data=await fetch(url);
    props.setProgress(30);
    let parsedData=await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    //   this.setState({
      //     articles:parsedData.articles,
      //     totalResults:parsedData.totalResults,
      //     loading:false
      // })
      props.setProgress(100);
      
    }
    useEffect(()=>{
      document.title=`${capitalise(props.category)}-NewsMonkey`;
      updateNews()
  },[])
  // async componentDidMount(){
    //this will execute after render
    // const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e3480f18fa3a4820bae3c9422310efee&page=${page}&pageSize=${props.pagesize}`;
    // this.setState({loading:true})
    // let data=await fetch(url);
    // let parsedData=await data.json();
    // // console.log(data);
    // // console.log(parsedData);
    // this.setState({articles:parsedData.articles,
    //   totalarticle:parsedData.totalResults,
    //   loading:false})
  //   this.updateNews();
  // }
  
  // handlepreviousclick=async()=>{
  
  //   this.setState({page: page-1})
  //   this.updateNews();
  // }
  // handlenextclick=async()=>{
   
  //     this.setState({page: page+1})
  //     this.updateNews();
  // }
  const fetchMoreData = async() => {
  //  this.setState({page:page+1});
  let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=${props.pagesize}`;
  // console.log(page);
  setPage(page+1)
    
    // this.setState({loading:true})
    setLoading(true);
    let data=await fetch(url);  
    let parsedData=await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    setLoading(false);
  //   this.setState({
  //     articles:this.state.articles.concat(parsedData.articles),
  //     totalResults:parsedData.totalResults,
  //     loading:false,
  // })
  };

    return (<>
        <h2 className='text-center ' style={{marginTop:'90px'}}>NewsMonkey Top headlines from-{capitalise(props.category)}</h2>
        {loading && <Spinner/>}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={<Spinner/>}
          >

        <div className="container">
        <div className="row">

        {/* {!this.state.loading && this.state.articles.map((element)=>{ */}
         {articles.map((element)=>{
           return(
             <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageurl={element.urlToImage?element.urlToImage:"https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/L2YBWTMIHRGDLIJUR74ZUFNFII.jpg&w=1440"} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
          </div>
        )
      })} 
        </div>
      </div>
      </InfiniteScroll>
        {/* <div className="d-flex justify-content-between">
        <button disabled={page<=1} type="button" className="btn btn-dark" onClick={this.handlepreviousclick}> &larr;Previous</button>
        <button disabled={page>=page+1>=(Math.ceil(this.state.totalResults/props.pagesize))}type="button" className="btn btn-dark" onClick={this.handlenextclick}>Next &rarr;</button>
        </div>*/}
     </>
    )
  
}
News.defaultProps={
  country:'in',
  pagesize:8,
  category:"general",
}
News.propTypes={
  country:PropTypes.string,
  pagesize:PropTypes.number,
  category:PropTypes.string,
}
export default News
