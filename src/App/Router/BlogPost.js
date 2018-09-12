import React from 'react'
import PropTypes from 'prop-types'

class BlogPost extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      postData: this.props.posts || {},
      selectedPost: this.props.match.params.postId || '',
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.posts !== nextProps.posts && nextProps.posts) {
      this.setState({ postData: nextProps.posts })
    }
  }

  render() {
    const selectedPostData = () => {
      let data = {}
      const { selectedPost, postData } = this.state
      for (const post in postData) {
        if (postData[post]) {
          if (postData[post].url && postData[post].url === selectedPost) {
            data = postData[post]
          }

          if (postData[post].id && postData[post].id.videoId === selectedPost) {
            // data = {
            //   etag: postData[post].etag,
            //   videoId: postData[post].id.videoId,
            //   snippet: postData[post].snippet,
            // }
            data = postData[post].snippet
          }
        } else data = 'loading'
      }

      return data
    }

    const Styles = {
      container: {
        width: 'calc(100% - 40px)',
        height: 'calc(100% - 40px)',
        margin: '20px',
        backgroundColor: '#ffffff',
        borderRadius: "5px",
      }
    }

    console.log(selectedPostData())
    return (
      <div
        className="blogPost-container"
        style={Styles.container}
      >
        {selectedPostData().url
          ? <div className="article-post">
            <h2>{selectedPostData().title}</h2>
            <h3>{selectedPostData().author.first_name} {selectedPostData().author.last_name}</h3>
            <div
              className="article-body"
              dangerouslySetInnerHTML={{ __html: selectedPostData().body }}
            />
          </div>
          : <div className="video-post">
            <h2>{selectedPostData().title}</h2>

          </div>
        }
      </div>
    )
  }
}

BlogPost.propTypes = {
  posts: PropTypes.array,
  match: PropTypes.object,
}

export default BlogPost
