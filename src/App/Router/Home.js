import React from 'react'
import PropTypes from 'prop-types'

// import { Link } from 'react-router-dom'
import Feature from '../../components/Feature'
import PostItem from '../../components/PostItem'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: '',
      channelItems: [],
      blogItems: []
    }
  }

  componentWillMount() {
    if (Object.keys(this.props.blogContent).length) {
      this.setState({
        blogItems: [...this.props.blogContent.data, this.props.blogContent.meta],
      })
    }

    if (this.props.channelContent.length) {
      this.setState({
        channelItems: [...this.props.channelContent],
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.blogContent !== this.props.blogContent) {
      this.setState({
        blogItems: [...nextProps.blogContent.data, nextProps.blogContent.meta],
      })
    }

    if (nextProps.channelContent !== this.props.channelContent) {
      this.setState({
        channelItems: [...nextProps.channelContent],
      })
    }
  }

  render() {
    const displayItems = () => {
      const ci = []
      const bi = []
      let result = []
      let channelInfo = {}
      for (var i in this.state.channelItems) {
        if (this.state.channelItems[i].id.kind === 'youtube#video') {
          ci.push(this.state.channelItems[i])
        } else {
          channelInfo = this.state.channelItems[i]
        }
      }
      for (let item in ci) {
        ci[item] = { video: ci[item], channel: channelInfo, published: ci[item].snippet.publishedAt }
      }

      for (var j in this.state.blogItems) {
        if (this.state.blogItems[j].url) {
          bi.push(this.state.blogItems[j])
        }
      }

      result = [...ci, ...bi]
      return result.sort((a, b) => {
        return new Date(b.published) - new Date(a.published)
      })
    }

    return (
      <div>
        <Feature
          channelContent={this.props.channelContent}
          blogData={this.props.blogContent.data}
        />
        <nav className="Home-nav">
          <ul className="Home-nav-filter">
            <li className="Home-nav-filter-item">
              <p className="filter-name">Most Recent</p>
            </li>
            <li className="Home-nav-filter-item">
              <p className="filter-name">Videos</p>
            </li>
            <li className="Home-nav-filter-item">
              <p className="filter-name">Reunions</p>
            </li>
          </ul>
          <div className="search-bar-container">
            <i className="fas fa-search search-icon"></i>
            <input className="search-bar-input" placeholder='...search' />
          </div>
        </nav>
        <div className="Home-content">
          {displayItems().map(postData => (
            <PostItem
              key={postData.video ? postData.video.id.videoId : postData.url}
              type={postData.video ? "video" : "article"}
              postData={postData}
            />
          ))}
        </div>
      </div>
    )
  }
}

Home.propTypes = {
  channelContent: PropTypes.array,
  blogContent: PropTypes.object,
}

export default Home