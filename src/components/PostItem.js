import React from 'react'
import PropTypes from 'prop-types'

const PostItem = (props) => {
  const { type, postData, selectPost } = props
  let backgroundImage
  if (postData.featured_image) {
    backgroundImage = postData.featured_image
  } else {
    backgroundImage = postData.video.snippet.thumbnails.high.url
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
    },

    title: {
      fontFamily: "'Knewave', cursive",
      color: '#3F89B0',
      fontSize: '200%',
      margin: '10px 0',
      textAlign: 'center',
    },

    header: {
      maxHeight: "200px",
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },

    headerImg: {
      height: '100px',
      backgroundColor: "#C0C0C0",
      borderRadius: '50px',
    },

    headerText: {
      height: '25px',
      fontFamily: "'Didact Gothic', sans-serif",
    },

    info: {
      display: 'flex',
      minHeight: '200px',
      width: '100%',
      margin: '5px auto 0 auto',
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

  return (
    <div
      className="postItem-container"
      style={Styles.container}
      onClick={() => selectPost(postData)}
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
              <h3 style={Styles.headerText}>
                {postData.channel.snippet.channelTitle} | {new Date(postData.video.snippet.publishedAt).toString()}
              </h3>
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
              <img style={Styles.headerImg} src={postData.author.profile_image} alt={postData.author.email} />
              <h3 style={Styles.headerText}>
                {postData.author.first_name} {postData.author.last_name} | {new Date(postData.published).toString()}
              </h3>
            </div>
            <div className='article info' style={Styles.info}>
              <h4>{postData.summary}</h4>
              <p>{postData.meta_description}</p>
            </div>
          </div>
        )}
    </div>
  )
}

PostItem.propTypes = {
  type: PropTypes.string,
  postData: PropTypes.object,
  selectPost: PropTypes.func,
}

export default PostItem