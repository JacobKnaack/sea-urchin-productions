import React from 'react'
import PropTypes from 'prop-types'

let SHORTNAME = 'sea-urchin-players'
let WEBSITE_URL = 'https://seaurchinplayers.com'
if (process.env.NODE_ENV !== 'production') {
  WEBSITE_URL = 'http://localhost:3000'
}

function renderDisqus() {
  if (window.DISQUS === undefined) {
    var script = document.createElement('script')
    script.async = true
    script.src = 'https://' + SHORTNAME + '.disqus.com/embed.js'
    document.getElementsByTagName('head')[0].appendChild(script)
  } else {
    window.DISQUS.reset({ reload: true });
  }
}

class DisqusThread extends React.Component {
  shouldComponentUpdate(nextProps) {
    return (
      this.props.id !== nextProps.id ||
      this.props.title !== nextProps.title ||
      this.props.path !== nextProps.path
    )
  }

  componentDidMount() {
    renderDisqus()
  }

  componentDidUpdate() {
    renderDisqus()
  }

  render() {
    let { id, title, path } = this.props
    if (process.env.BROWSER) {
      window.disqus_shortname = SHORTNAME
      window.disqus_identifier = id
      window.disqus_title = title
      window.disqus_url = WEBSITE_URL + path
    }

    return <div id="disqus_thread" />
  }
}

DisqusThread.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
}

export default DisqusThread
