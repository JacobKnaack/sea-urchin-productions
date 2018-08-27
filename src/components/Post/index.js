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
            <h3>Sea Urchin Players</h3>
          </div>
          {}
          <h3>Post Data!!</h3>
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