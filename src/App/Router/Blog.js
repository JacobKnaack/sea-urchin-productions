import React from 'react'
import PropTypes from 'prop-types'
import ContentList from '../../components/ContentList'

class Blog extends React.Component {
  render() {
    return (
      <div className="blog-container">
        <ContentList channelContent={this.props.channelContent} />
      </div>
    )
  }
}

Blog.propTypes = {
  channelContent: PropTypes.array,
}

export default Blog