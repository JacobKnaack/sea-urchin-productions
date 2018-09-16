import React, { Component } from 'react'
import Butter from 'buttercms'
// import Feature from '../components/Feature'
// import ContentList from '../components/ContentList'
// import Post from '../components/Post'
import Footer from '../components/Footer'
import Messenger from '../components/Messenger'
import Router from './Router'
import './App.css'

const butter = Butter('283702b3276b10a88e38bf31e3356505f663bb1b')

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      channelContent: [],
      blogContent: {},
    }
  }

  componentWillMount() {
    fetch(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyDleGdEZLlURoFgCDs6OXFMjSCpvi3gfIw&channelId=UCG71-DN0mFrGvoLrtuSRLwA&part=snippet,id&order=date&maxResults=20`)
      .then(resp => resp.json())
      .then((resp) => {
        this.setState({ channelContent: resp.items })
      })
    butter.post.list()
      .then(response => {
        this.setState({ blogContent: response.data })
      })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div className="Header-title">
            <img
              className="App-logo"
              src={'https://image.flaticon.com/icons/png/512/456/456037.png'}
              alt="site-logo"
            />
            <h1 className="App-title">Sea Urchin Players</h1>
          </div>
          <p className="App-header-sub">A Lisi Family Blog</p>
        </div>

        <div className="content">
          <Router
            channelContent={this.state.channelContent}
            blogContent={this.state.blogContent}
          />
        </div>
        <Footer />
        <Messenger />
      </div>
    )
  }
}

export default App
