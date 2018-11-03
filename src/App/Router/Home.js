import React from 'react'
import PropTypes from 'prop-types'

// import { Link } from 'react-router-dom'
import Feature from '../../components/Feature'
import PostItem from '../../components/PostItem'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      channelItems: [],
      blogItems: [],
      filter: 'recent',
      query: '',
    }

    this.setFilter = this.setFilter.bind(this)
    this.filterBlogItems = this.filterBlogItems.bind(this)
    this.categoryFilter = this.categoryFilter.bind(this)
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
      const bi = this.filterBlogItems()
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

      result = this.categoryFilter(ci, bi)
      return result.sort((a, b) => {
        return new Date(b.published) - new Date(a.published)
      })
    }

    const isNavItemActive = (btnName) => {
      if (this.state.filter === btnName) {
        return 'Home-nav-filter-item active'
      }

      return 'Home-nav-filter-item'
    }

    const homeContent = displayItems()
    return (
      <div>
        <Feature
          channelContent={this.props.channelContent}
          blogData={this.props.blogContent.data}
        />
        <nav className="Home-nav">
          <ul className="Home-nav-filter">
            <li className={isNavItemActive('recent')} onClick={() => this.setFilter('recent')}>
              <p className="filter-name">Most Recent</p>
            </li>
            <li className={isNavItemActive('videos')} onClick={() => this.setFilter('videos')}>
              <p className="filter-name">Videos</p>
            </li>
            <li className={isNavItemActive('reunions')} onClick={() => this.setFilter('reunions')}>
              <p className="filter-name">Reunions</p>
            </li>
          </ul>
          <div className="search-bar-container">
            <i className="fas fa-search search-icon"></i>
            <input
              className="search-bar-input"
              placeholder='...search'
              name="query"
              value={this.state.query}
              onChange={(e) => this.setState({ query: e.target.value })} />
          </div>
        </nav>
        {homeContent.length
          ? <div className="Home-content">
            {homeContent.map(postData => (
              <PostItem
                key={postData.video ? postData.video.id.videoId : postData.url}
                type={postData.video ? "video" : "article"}
                postData={postData}
              />
            ))}
          </div>
          : <div className="Home-content-empty">
            {this.state.query.length
              ? <h2>No results</h2>
              : <h2>Loading...</h2>
            }
          </div>
        }
      </div>
    )
  }

  setFilter(string) {
    this.setState({
      filter: string
    })
  }

  categoryFilter(ci, bi) {
    if (this.state.query) {
      const queryResult = []
      for (var i in ci) {
        if (ci[i].video.snippet.title.includes(this.state.query)) {
          queryResult.push(ci[i])
        }
      }
      for (var j in bi) {
        if (bi[j].title.includes(this.state.query)) {
          queryResult.push(bi[j])
        }
      }

      return queryResult
    }
    switch (this.state.filter) {
      case 'videos':
        return [...ci]
      case 'reunions':
        return [...bi]
      default:
        return [...ci, ...bi]
    }
  }

  filterBlogItems() {
    const filteredItems = []
    for (var i in this.state.blogItems) {
      if (this.state.blogItems[i].url) {
        if (this.state.filter === 'reunions') {
          for (var j in this.state.blogItems[i].categories) {
            if (this.state.blogItems[i].categories[j].name === 'Reunion') {
              filteredItems.push(this.state.blogItems[i])
            }
          }
        } else {
          filteredItems.push(this.state.blogItems[i])
        }
      }
    }

    return filteredItems
  }
}

Home.propTypes = {
  channelContent: PropTypes.array,
  blogContent: PropTypes.object,
  filter: PropTypes.string,
  setFilter: PropTypes.func,
}

export default Home