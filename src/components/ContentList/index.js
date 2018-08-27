import React from 'react'
import PropTypes from 'prop-types'
import './_contentList.css'

const ContentList = (props) => {
  return (
    <div className="contentList">
      {props.channelContent.map(item => {
        if (item.id.kind === 'youtube#video') {
          return (
            <div key={item.id.videoId} className="contentList-item">
              <h2>{new Date(item.snippet.publishedAt).toString()}</h2>
              <iframe
                className="embeddedVideo"
                title="Unique Title"
                src={`https://www.youtube.com/embed/${item.id.videoId}`}
              />
              <h3>{item.snippet.title}</h3>
              <p>
                {item.snippet.description}
              </p>
            </div>
          )
        }
        return null
      })}
    </div>
  )
}

ContentList.propTypes = {
  channelContent: PropTypes.array,
}

export default ContentList
