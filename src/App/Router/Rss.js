import React from 'react'
import PropTypes from 'prop-types'

class Rss extends React.Component {
  constructor() {
    super()
    this.state = {
      xml: '',
      error: null,
    }
  }

  componentWillMount() {
    this.props.butter.feed.retrieve('rss')
      .then(res => {
        this.setState({
          xml: res.data.data,
        })
      })
      .catch(error => this.setState({ error: error }))
  }

  render() {
    return (
      <div id="rss-container">
        {this.state.xml}
      </div>
    )
  }
}

Rss.propTypes = {
  butter: PropTypes.object.isRequired
}

export default Rss
