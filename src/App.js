import React, { Component } from 'react'
import Navbar from './Components/Navbar'
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export class App extends Component {
  pageSize = 5;
  state = {
    progress: 0,
  }
  setProgress = (progress) => {
    this.setState({progress: progress})
  }
  render() {
    return (
      <div>
        <Router>
            <Navbar/>
            <LoadingBar
                height={3}
                color='#f11946'
                progress={this.state.progress}
            />
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} key="general" pageSize={5} country="us" category="general"/>}></Route>
            <Route exact path="/business" element={<News setProgress={this.setProgress} key="business" pageSize={5} country="us" category="business"/>}></Route>
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" pageSize={5} country="us" category="entertainment"/>}></Route>
            <Route exact path="/general" element={<News setProgress={this.setProgress} key="general" pageSize={5} country="us" category="general"/>}></Route>
            <Route exact path="/health" element={<News setProgress={this.setProgress} key="health" pageSize={5} country="us" category="health"/>}></Route>
            <Route exact path="/science" element={<News setProgress={this.setProgress} key="science" pageSize={5} country="us" category="science"/>}></Route>
            <Route exact path="/sports" element={<News setProgress={this.setProgress} key="sports" pageSize={5} country="us" category="sports"/>}></Route>
            <Route exact path="/technology" element={<News setProgress={this.setProgress} key="technology" pageSize={5} country="us" category="technology"/>}></Route>
          </Routes>
        </Router>
      </div>
    )
  }
}

export default App
