import React, { Component } from 'react'
import Butter from 'buttercms'
// import Feature from '../components/Feature'
// import ContentList from '../components/ContentList'
import Post from '../components/Post'
import Footer from '../components/Footer'
import Router from './Router'
import './App.css'

const butter = Butter('283702b3276b10a88e38bf31e3356505f663bb1b')

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      channelContent: [],
      blogContent: {},
      selectedPost: {},
    }

    this.selectPost = this.selectPost.bind(this)
  }

  componentWillMount() {
    window.addEventListener('popstate', () => {
      if (!window.location.href.includes('?post')) {
        this.setState({ selectedPost: {} })
      } else {
        this.setState({ selectedPost: window.history.state })
      }
    })

    fetch(`https://www.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&channelId=UCG71-DN0mFrGvoLrtuSRLwA&part=snippet,id&order=date&maxResults=20`)
      .then(resp => resp.json())
      .then((resp) => {
        //this.setState({video: resp.results});
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
            selectPost={this.selectPost}
            channelContent={this.state.channelContent}
            blogContent={this.state.blogContent}
          />
        </div>

        {Object.keys(this.state.selectedPost).length
          ? <Post
            type={this.state.selectedPost.video ? 'video' : 'article'}
            postData={this.state.selectedPost}
          />
          : null
        }
        <Footer />
      </div>
    )
  }

  selectPost(data) {
    this.setState({
      selectedPost: data
    }, () => {
      if (data.video) {
        window.history.pushState({ post: data }, null, `?post=${data.video.id.videoId}`)
      }
      if (data.url) {
        window.history.pushState({ post: data }, null, `?post=${data.slug}`)
      }
    })
  }
}

export default App
