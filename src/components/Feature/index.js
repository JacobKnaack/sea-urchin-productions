import React from 'react'
import PropTypes from 'prop-types'
import './_feature.css'
import './_carousel.css'
import Seals from '../../assets/images/seals.JPG'

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
    return (
      <div
        className="Feature-carousel"
        onMouseEnter={() => this.setState({ navBtns: 'active' })}
        onMouseLeave={() => this.setState({ navBtns: 'inactive' })}
      >
        <div
          className={`prev carousel-btn ${this.state.navBtns}`}
          onClick={this.prevIndex}
        >
          <i className="fas fa-angle-left carousel-icon"></i>
        </div>
        {this.props.items.map(item => {
          let displayClasses = 'carousel-display-item'
          if (this.props.items.indexOf(item) === this.state.activeIndex) {
            displayClasses += ' active'
          }

          return (
            <div key={item.title} className={displayClasses}>
              <h2 className="Feature-carousel-title">{item.title}</h2>
              <img
                className="Feature-carousel-image"
                src={item.imageUrl}
                alt={`${item.imageUrl} : ${item.description}`}
              />
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
  const recentVideo = () => {
    if (props.channelContent.length) {
      return props.channelContent[1].snippet.thumbnails.medium.url
    }

    return null
  }


  return (
    <div className="feature">
      <Carousel
        items={[
          {
            imageUrl: Seals,
            title: 'Welcome!',
            description: 'We are the Sea Urchin Players.',
            link: null
          },
          {
            imageUrl:
              'https://wallpapercave.com/wp/7peJ8rK.jpg',
            title: 'Lisi Reunion 2018',
            description: "The Lisi's meet again!",
            link: null,
          },
          {
            imageUrl: recentVideo(),
            title: 'New Production',
            description: 'Check out our Newest Production',
            link: null,
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
}

export default Feature
