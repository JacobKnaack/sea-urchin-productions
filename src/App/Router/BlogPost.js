import React from 'react'
import { Link } from 'react-router-dom'
import dateFormat from 'dateformat'
import PropTypes from 'prop-types'

class BlogPost extends React.Component {
  constructor(props) {
    super(props)
    this.topRef = React.createRef()
    this.state = {
      postData: this.props.posts || {},
      selectedPost: this.props.match.params.postId || '',
    }

    this.filterPostData = this.filterPostData.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.posts !== nextProps.posts && nextProps.posts) {
      this.setState({ postData: nextProps.posts })
    }
  }

  componentDidMount() {
    window.scrollTo(0, this.topRef)
  }

  render() {
    const post = this.filterPostData()
    const Styles = {
      container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
        borderRadius: "5px",
        paddingBottom: '50px',
      },

      postHeading: {
        minHeight: '300px',
        width: '100%',
        display: 'flex',
        backgroundColor: '#464754',
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: '40px',
      },

      meta: {
        height: '65px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: '12%',
        marginTop: '20px',
      },

      postTitle: {
        width: '75%',
        fontSize: '225%',
        lineHeight: '50px',
        textAlign: 'left',
        margin: '0 auto',
        color: '#ffffff',
      },

      divider: {
        margin: '15px 0 0 12%',
        height: '10px',
        width: '175px',
        backgroundColor: '#03F2FD',
      },

      metaDivider: {
        fontSize: '225%',
        color: '#03F2FD',
        height: '100%',
        lineHeight: '65px',
        margin: '0 10px 0 10px',
      },

      authorName: {
        fontFamily: 'Arvo, serif',
        color: '#d3d3d3',
        height: '100%',
        lineHeight: '65px',
      },

      postDate: {
        fontFamily: 'Arvo, serif',
        color: '#a9a9a9',
        height: '100%',
        lineHeight: '65px',
      },

      profileImage: {
        color: '#ffffff',
        margin: '10px',
        fontSize: '200%',
        maxWidth: '75px',
        borderRadius: '50%',
      },

      videoPost: {
        backgroundColor: '#464754',
      },

      videoHeading: {
        height: '200px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      },

      videoEmbedded: {
        outline: 'none',
        border: 'none',
        minHeight: '500px',
      },

      videoDescription: {
        color: '#ffffff',
        fontSize: '150%',
        textAlign: 'left',
        margin: '0 40px',
        padding: '30px 0',
      },

      closeBtn: {
        position: 'fixed',
        right: '9%',
        top: '1%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        cursor: 'pointer',
        textDecoration: 'none',
        color: '#ffffff',
        backgroundColor: '#399198',
        fontSize: '80%',
        boxShadow: '0 4px 2px -2px gray',
      },
    }

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
        <Link to="/" style={Styles.closeBtn}>
          <i className="fas fa-times"></i>
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
