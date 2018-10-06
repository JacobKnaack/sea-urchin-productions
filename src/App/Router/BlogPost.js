import React from 'react'
import { Link } from 'react-router-dom'
import dateFormat from 'dateformat'
import PropTypes from 'prop-types'

import DisqusThread from '../../components/DisqusThread'
import Styles from './styles/_blogPost'

class BlogPost extends React.Component {
  constructor(props) {
    super(props)
    this.topRef = React.createRef()
    this.state = {
      postData: this.props.posts || {},
      selectedPost: this.props.match.params.postId || '',
      width: 0,
      height: 0,
    }

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    this.filterPostData = this.filterPostData.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.posts !== nextProps.posts && nextProps.posts) {
      this.setState({ postData: nextProps.posts })
    }
  }

  componentDidMount() {
    window.scrollTo(0, this.topRef)
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  render() {
    const post = this.filterPostData()
    let ProfileImageEl
    if (post.author) {
      if (post.author.profile_image) {
        ProfileImageEl = <img src={post.author.profile_image} alt={`Profile post.author.profile_image`} style={Styles.profileImage} />
      } else {
        ProfileImageEl = <i className="fas fa-user-circle" style={Styles.profileImage} />
      }
    } else {
      ProfileImageEl = <img src={post.thumbnail} alt={`Profile ${post.thumbnail}`} />
    }

    return (
      <div
        className="blogPost-container"
        style={Styles.container}
      >
        <Link to="/" style={this.state.width >= 475 ? Styles.closeBtn : Styles.closeBtnMobile}>
          <i className="fas fa-home"></i>
          Close
        </Link>
        <div className="post-menu" ref={this.topRef}>

        </div>
        {post.url
          ? <div className="article-post">
            <div className="post-heading" style={Styles.postHeading}>
              <h2 style={Styles.postTitle}>{post.title}</h2>
              <div style={Styles.divider} />
              <div className="postHeading-meta" style={Styles.meta}>
                {ProfileImageEl}
                <h3 style={Styles.authorName}>{post.author.first_name} {post.author.last_name}</h3>
                <p style={Styles.metaDivider}>/</p>
                <h3 style={Styles.postDate}>{dateFormat(post.published, "mmmm dS, yyyy")}</h3>
              </div>
            </div>
            <div
              className="article-body"
              style={Styles.postBody}
              dangerouslySetInnerHTML={{ __html: this.textRenderer(post.body) }}
            />
          </div>
          : <div className="video-post" style={Styles.videoPost}>
            <div className="video-heading" style={Styles.videoHeading}>
              <h2 className="video-title" style={Styles.postTitle}>{post.title}</h2>
              <div style={Styles.divider} />
              <div className="videoPost-meta">
                <h3 style={Styles.postDate}>{dateFormat(post.publishedAt, "mmmm dS, yyyy")}</h3>
              </div>
            </div>
            <iframe
              style={Styles.videoEmbedded}
              className="video-embedded"
              title={post.title}
              src={`https://www.youtube.com/embed/${post.id}`}
              width="100%"
            />
            <p style={Styles.videoDescription}>{post.description}</p>
          </div>
        }
        <DisqusThread
          id={post.id || post.url}
          title={post.title}
          path={window.location.href}
        />
      </div>
    )
  }

  filterPostData() {
    let data = {}
    const { selectedPost, postData } = this.state
    for (const post in postData) {
      if (postData[post]) {
        if (postData[post].url && postData[post].url === selectedPost) {
          data = postData[post]
        }

        if (postData[post].id && postData[post].id.videoId === selectedPost) {
          data = {
            etag: postData[post].etag,
            id: postData[post].id.videoId,
            title: postData[post].snippet.title,
            description: postData[post].snippet.description,
            channelId: postData[post].snippet.channelId,
            publishedAt: postData[post].snippet.publishedAt,
            thumbnail: postData[post].snippet.thumbnails.high.url,
          }
        }
      } else data = 'loading'
    }

    return data
  }

  textRenderer(html) {
    const re = /<p>(.+?)<\/p>/
    const matches = html.match(re)
    const firstLetter = matches[0].slice(0, 3) + "<span class='firstLetter'>" + matches[0][3] + "</span>" + matches[0].slice(4)
    return html.replace(re, firstLetter)
  }
}

BlogPost.propTypes = {
  posts: PropTypes.array,
  match: PropTypes.object,
}

export default BlogPost
