import React from 'react'
import PropTypes from 'prop-types'
import dateFormat from 'dateformat'
import { Link } from 'react-router-dom'


const PostItem = (props) => {
  const { type, postData } = props
  let backgroundImage, pubDate
  if (type === 'article') {
    backgroundImage = postData.featured_image
    pubDate = dateFormat(new Date(postData.published), 'mmmm dS yyyy, @ h:MM TT')
  } else {
    backgroundImage = postData.video.snippet.thumbnails.high.url
    pubDate = dateFormat(new Date(postData.video.snippet.publishedAt), 'mmmm dS yyyy, @ h:MM TT')
  }

  if (!postData) {
    return <h4>...Loading</h4>
  }

  const Styles = {
    title: {
      fontFamily: "'Arvo', serif",
      color: 'white',
      fontSize: '200%',
      margin: '10px 0',
      textAlign: 'left',
    },

    header: {
      maxHeight: "200px",
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    headerIcon: {
      height: '100px',
      minWidth: '100px',
      lineHeight: 'px',
      borderRadius: '50px',
      fontSize: '350%',
      color: '#ffffff',
      marginRight: '10px',
    },

    headerImg: {
      height: '100px',
      minWidth: '100px',
      backgroundColor: "#C0C0C0",
      borderRadius: '50px',
    },

    headerText: {
      height: '25px',
      margin: '10px auto',
      color: 'white',
      fontFamily: "'Didact Gothic', sans-serif",
    },

    headerTextContainer: {
      width: 'calc(80% - 10px)',
      textAlign: 'left',
    },

    info: {
      display: 'flex',
      minHeight: '400px',
      width: '100%',
      margin: '5px auto 0 auto',
      color: 'white',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      background: `url(${backgroundImage})`,
      backgroundColor: '#6b5b95',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: "cover",
      borderRadius: '5px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    },

    textOverlay: {
      fontSize: '140%',
      margin: '0',
      padding: '10px',
      textAlign: 'center',
      lineHeight: '35px',
      minHeight: '100px',
      color: '#ffffff',
      fontFamily: 'Didact Gothic',
      textShadow: '1px 1px #000000'
    }
  }

  const postId = () => {
    if (type === 'video') return postData.video.id.videoId
    if (type === 'article') return postData.url
  }
  return (
    <Link
      className="postItem-container"
      style={Styles.container}
      to={`/post/${postId()}`}
    >
      {type === 'video'
        ? (
          <div className="video layout">
            <h2 style={Styles.title}>{postData.video.snippet.title}</h2>
            <div
              className="video header"
              style={Styles.header}
            >
              <img
                src={postData.channel.snippet.thumbnails.default.url}
                alt={postData.channel.snippet.thumbnails.default.url}
                style={Styles.headerImg}
              />
              <div style={Styles.headerTextContainer}>
                <h3 style={Styles.headerText}>
                  {postData.channel.snippet.channelTitle}
                </h3>
                <h4 style={Styles.headerText}>
                  {pubDate}
                </h4>
              </div>
            </div>
            <div className="video info" style={Styles.info}>
              <h4 style={Styles.textOverlay}>{postData.video.snippet.description}</h4>
            </div>
          </div>
        )
        : (
          <div className="article layout">
            <h2 style={Styles.title}>{postData.title}</h2>
            <div
              className="article header"
              style={Styles.header}
            >
              {postData.author.profile_image
                ? <img style={Styles.headerImg} src={postData.author.profile_image} alt={postData.author.email} />
                : <i style={Styles.headerIcon} className="fas fa-user-circle"></i>}
              <div style={Styles.headerTextContainer}>
                <h3 style={Styles.headerText}>
                  {postData.author.first_name} {postData.author.last_name}
                </h3>
                <h4 style={Styles.headerText}>
                  {pubDate}
                </h4>
              </div>
            </div>
            <div className='article info' style={Styles.info}>
              <h4 style={Styles.textOverlay}>{postData.summary}</h4>
            </div>
          </div>
        )}
    </Link>
  )
}

PostItem.propTypes = {
  type: PropTypes.string,
  postData: PropTypes.object,
  selectPost: PropTypes.func,
}

export default PostItem