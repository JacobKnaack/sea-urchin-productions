import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './_feature.css'
import './_carousel.css'

class Carousel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 0,
      lastIndex: this.props.items.length - 1,
      navBtns: 'inactive',
    }
    this.prevIndex = this.prevIndex.bind(this)
    this.nextIndex = this.nextIndex.bind(this)
    this.autoRotate = setInterval(this.nextIndex, 7000)
  }

  componentWillUnmount() {
    clearInterval(this.autoRotate)
  }

  render() {
    const { items } = this.props
    const { activeIndex } = this.state

    return (
      <div
        className="Feature-carousel"
        onMouseEnter={() => this.setState({ navBtns: 'active' })}
        onMouseLeave={() => this.setState({ navBtns: 'inactive' })}
      >
        <Link
          className={`feature-link-btn ${this.state.navBtns}`}
          to={`/post/${items[activeIndex].link}`}
        >
          <i className="far fa-hand-pointer carousel-icon"></i>
        </Link>
        <div
          className={`prev carousel-btn ${this.state.navBtns}`}
          onClick={this.prevIndex}
        >
          <i className="fas fa-angle-left carousel-icon"></i>
        </div>
        {items.map(item => {
          let itemImageUrl = item.imageUrl
          let displayClasses = 'carousel-display-item'
          if (items.indexOf(item) === this.state.activeIndex) {
            displayClasses += ' active'
          }
          if (!itemImageUrl) {
            itemImageUrl = 'https://image.flaticon.com/icons/png/512/456/456037.png'
          }

          return (
            <div key={item.title || Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)} className={displayClasses}>
              <div>
                <h2 className="Feature-carousel-title">{item.title}</h2>
                <p className="Feature-carousel-description">{item.description}</p>
              </div>
              {item.imageUrl === "loading"
                ? "...Loading"
                : <img
                  className="Feature-carousel-image"
                  src={itemImageUrl}
                  alt={`${itemImageUrl}`}
                />
              }
              {/* <p className="Feature-carousel-description">{item.description}</p> */}
            </div>
          )
        })}
        <div
          className={`next carousel-btn ${this.state.navBtns}`}
          onClick={this.nextIndex}
        >
          <i className="fas fa-angle-right carousel-icon"></i>
        </div>
      </div>
    )
  }

  prevIndex() {
    clearInterval(this.autoRotate)
    if (this.state.activeIndex !== 0) {
      this.setState({
        activeIndex: this.state.activeIndex - 1,
      })
    } else {
      this.setState({
        activeIndex: this.state.lastIndex,
      })
    }
    this.autoRotate = setInterval(this.nextIndex, 7000)
  }

  nextIndex() {
    clearInterval(this.autoRotate)
    if (this.state.activeIndex !== this.state.lastIndex) {
      this.setState({
        activeIndex: this.state.activeIndex + 1,
      })
    } else {
      this.setState({
        activeIndex: 0,
      })
    }
    this.autoRotate = setInterval(this.nextIndex, 7000)
  }
}

const Feature = (props) => {
  const recentPosts = (posts) => {
    if (posts) {
      const sortedData = posts.sort((a, b) => {
        return new Date(b.published) - new Date(a.published)
      })
      return [
        sortedData[0],
        sortedData[1],
      ]
    }
    return "awaiting Blog Data"
  }

  const recentVideo = (videos) => {
    let result = {
      imageUrl: "loading",
      description: "loading",
      id: null,
    }

    if (videos.length) {
      const sortedContent = videos.slice().sort((a, b) => {
        return a.snippet.publishedAt < b.snippet.publishedAt ? 1 : -1
      })
      result = {
        title: sortedContent[0].snippet.title,
        imageUrl: sortedContent[0].snippet.thumbnails.high.url,
        description: sortedContent[0].snippet.description,
        id: sortedContent[0].id.videoId,
      }
    }

    return result
  }

  const posts = recentPosts(props.blogData)
  const video = recentVideo(props.channelContent)
  return (
    <div className="feature">
      <Carousel
        items={[
          {
            title: posts[0].title,
            imageUrl: posts[0].featured_image,
            description: posts[0].summary,
            link: posts[0].url
          },
          {
            title: posts[1].title,
            imageUrl: posts[1].featured_image,
            description: posts[1].summary,
            link: posts[1].url,
          },
          {
            title: `Recent Video: ${video.title}`,
            imageUrl: video.imageUrl,
            description: video.description,
            link: video.id,
          },
        ]}
      />
    </div>
  )
}

Carousel.propTypes = {
  items: PropTypes.array,
}

Feature.propTypes = {
  channelContent: PropTypes.array,
  blogData: PropTypes.array,
}

export default Feature
