import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from './Spinner';

export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
  constructor(){
    super();
    this.state={
            articles: [],
            loading: false,
            page: 1
    }
  }
  async componentDidMount(){
        let url=`https://saurav.tech/NewsAPI//top-headlines/category/${this.props.category}/${this.props.country}.json`;
         {/*let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=99d19f0da90f496eaaddcc8999c19fcf&page=1&pageSize=${this.props.pageSize}`;*/}
         let data=await fetch(url);
        let parsedData=await data.json()
        console.log(parsedData);
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults})
  }

   handlePrevClick = async ()=>{
    console.log("prev");
    let url=`https://saurav.tech/NewsAPI//top-headlines/category/${this.props.category}/${this.props.country}.json`;
    {/*let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=99d19f0da90f496eaaddcc8999c19fcf&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;*/}
    let data=await fetch(url);
   let parsedData=await data.json()
   console.log(parsedData);
    this.setState({
     page: this.state.page-1,
     articles: parsedData.articles
    })
  }

   handleNextClick = async ()=>{
         console.log("next");
        if(this.state.page+1>Math.ceil(this.state.totalResults/20)){

        }
        else{
         let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=99d19f0da90f496eaaddcc8999c19fcf&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
         let data=await fetch(url);
        let parsedData=await data.json()
        console.log(parsedData);
         this.setState({
          page: this.state.page+1,
          articles: parsedData.articles
         })
        }
  }

  
  fetchMoreData = async () => {
   this.setState({page: this.state.page+1});
   let url=`https://saurav.tech/NewsAPI//top-headlines/category/${this.props.category}/${this.props.country}.json`;
   {/*let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=99d19f0da90f496eaaddcc8999c19fcf&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;*/}
         let data=await fetch(url);
        let parsedData=await data.json()
        console.log(parsedData);
         this.setState({
          page: this.state.page+1,
          totalResults: parsedData.totalResults,
          articles: this.state.articles.concat(parsedData.articles),
          loading:false
         })
  };

  render() {
    return (
      <>
      <h2 className="text-center" style={{margin:'35px 0px', marginTop:'10npm0px'}}>THE NEWS EXPRESS - TOP HEADLINES</h2>
      <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
      <div className="row">
        {this.state.articles.map ((element)=>{
           return <div className="col-md-4" key={element.url}>
        <NewsItem title={element.title?element.title:""} description={element.description?element.description.slice(0,88):"" } imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
        </div>
        })}
      </div>
      </div>
      </InfiniteScroll>
      {/*<div className="container d-flex justify-content-between">
      <button disabled={this.state.page<=1} type="button" class="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
      <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/20)} type="button" class="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
      </div>*/}
      </> 
    )
  }
}

export default News