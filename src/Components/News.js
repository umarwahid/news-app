import React, { Component } from 'react'
import NewsItems from './NewsItems';
import '../style.css';
import PropTypes from 'prop-types';
// import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {
  static defaultProps = {
    pageSize: 5,
    country: "us",
    category: "general"
  }
  static propTypes = {
    pageSize: PropTypes ,
    country: PropTypes.string,
    category: PropTypes.string,
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props){
    super(props);
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - News Tech`
  }
  async updateNews(){
    this.props.setProgress(10); 
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0991100231ea436e93648f4d84fbde5c&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.props.setProgress(30); 
    let parsedData = await data.json();
    this.props.setProgress(70); 
    this.setState
    ({articles: parsedData.articles, totalResults: parsedData.totalResults})
    this.props.setProgress(100)
  }

  async componentDidMount(){
    // console.log("cmd")
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0991100231ea436e93648f4d84fbde5c&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults})
      this.updateNews();
    }

  handlePrevClick = async ()=>{
    // console.log("Prev")
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0991100231ea436e93648f4d84fbde5c&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // let data = await fetch(url);  
    // let parsedData = await data.json();

    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles
    // })
    this.setState=({page: this.state.page - 1})
    this.updateNews();

  }

  handleNextClick = async ()=>{
  //   if (this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){
  //   }
  //   else{
  //   console.log("Next")
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0991100231ea436e93648f4d84fbde5c&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  //   let data = await fetch(url);  
  //   let parsedData = await data.json();

  //   this.setState({
  //     page: this.state.page + 1,
  //     articles: parsedData.articles
  //   })
  // }
  this.setState({page: this.state.page + 1})
  this.updateNews();
  }

  render() {
    return (
      <div>
        <div className="container my-3">
          <h2 className="text-center" style={{margin: "35px 0px"}}>News Talk Hub - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
          {/* <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<h4>Loading...</h4>}
          /> */}
          <div className="row">
            {this.state.articles?.map((element) => {

              return  <div className="col-md-4" key={element.url}>
                  <NewsItems title={element.title?element.title.slice(0, 45):""} description={element.description?element.description.slice(0, 80):""} 
                  imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}
                  source={element.source.name}/>
                </div>
            
            })}
          </div>
          {/* </InfiniteScroll>  */}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
