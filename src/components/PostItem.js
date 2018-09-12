import React from 'react'
import PropTypes from 'prop-types'
import dateFormat from 'dateformat'
import { Link } from 'react-router-dom'


const PostItem = (props) => {
  const { type, postData, selectPost } = props
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
    container: {
      width: "calc(50vw - 80px)",
      minHeight: "300px",
      margin: "20px",
      padding: "20px",
      textAlign: "right",
      transition: '0.3s ease-in-out',
      borderRadius: '10px',
      cursor: 'pointer',
      textDecoration: 'none',
    },

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
      width: '80%',
      textAlign: 'left',
    },

    info: {
      display: 'flex',
      minHeight: '200px',
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
      border: 'solid thin #F9008A',
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
    // onClick={() => selectPost(postData)}
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
              <p>{postData.video.snippet.description}</p>
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
                : <i style={Styles.headerIcon} className="far fa-user-circle"></i>}
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
              <h4>{postData.summary}</h4>
              <p>{postData.meta_description}</p>
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