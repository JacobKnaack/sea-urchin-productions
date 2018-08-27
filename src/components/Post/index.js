import React from 'react'
import PropTypes from 'prop-types'
import './_post.css'

class Post extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.postData || {},
      type: props.type || null,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.postData !== nextProps.postData) {
      this.setState({
        data: nextProps.postData,
        type: nextProps.type,
      })
    }
  }

  render() {
    const { type, postData } = this.props
    console.log(postData, type)
    return (
      <div className='post-container'>
        <div className='post-modal'>
          <div className='postHeading'>
            <h2>Sea Urchin Players</h2>
          </div>
          {this.state.type === 'article'
            ? <div className="post-article">
              <h3>{postData.title}</h3>
              <h4>{postData.author.first_name} {postData.author.last_name}</h4>
              <h5>{postData.summary}</h5>
              <div dangerouslySetInnerHTML={{ __html: postData.body }} />
            </div>
            : <div className="post-video">
              <iframe
                className="embeddedVideo"
                title="Unique Title"
                src={`https://www.youtube.com/embed/${postData.video.id.videoId}`}
              />
              <p>{postData.video.snippet.description}</p>
            </div>
          }
        </div>
      </div>
    )
  }
}

Post.propTypes = {
  postData: PropTypes.object,
  type: PropTypes.string,
}

export default Post