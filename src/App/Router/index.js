import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

import Home from './Home'
import Blog from './Blog'

const Router = (props) => {
  let { channelContent, blogContent, selectPost } = props

  return (
    <Switch>
      <Route exact path='/' render={(props) => (
        <Home {...props} channelContent={channelContent} blogContent={blogContent} selectPost={selectPost} />
      )} />
      <Route path='/blog' render={(props) => (
        <Blog {...props} channelContent={channelContent} />
      )} />
    </Switch>
  )
}

Router.propTypes = {
  channelContent: PropTypes.array,
  blogContent: PropTypes.object,
  selectPost: PropTypes.func,
}

export default Router