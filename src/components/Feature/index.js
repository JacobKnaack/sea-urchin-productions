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
              <h2 className="Feature-carousel-title">{item.title}</h2>
              {item.imageUrl === "loading"
                ? "...Loading"
                : <img
                  className="Feature-carousel-image"
                  src={itemImageUrl}
                  alt={`${itemImageUrl}`}
                />
              }
              <p className="Feature-carousel-description">{item.description}</p>
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
  const recentPosts = () => {
    if (props.blogData) {
      const sortedData = props.blogData.sort((a, b) => {
        return new Date(b.published) - new Date(a.published)
      })
      return [
        sortedData[0],
        sortedData[1],
      ]
    }
    return "awaiting Blog Data"
  }
  const recentVideo = () => {
    let result = {
      imageUrl: "loading",
      description: "loading",
    }

    if (props.channelContent.length) {
      const sortedContent = props.channelContent.slice().sort((a, b) => {
        return a.published < b.published ? 1 : -1
      })
      result = {
        imageUrl: sortedContent[0].snippet.thumbnails.high.url,
        description: sortedContent[0].snippet.description,
        id: sortedContent[0].id.videoId,
      }
    }

    return result
  }


  return (
    <div className="feature">
      <Carousel
        items={[
          {
            imageUrl: recentPosts()[0].featured_image,
            title: recentPosts()[0].title,
            description: recentPosts()[0].summary,
            link: recentPosts()[0].url
          },
          {
            imageUrl: recentPosts()[1].featured_image,
            title: recentPosts()[1].title,
            description: recentPosts()[1].summary,
            link: recentPosts()[1].url,
          },
          {
            imageUrl: recentVideo().imageUrl,
            title: 'Recent Videos',
            description: recentVideo().description,
            link: recentVideo().id,
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
