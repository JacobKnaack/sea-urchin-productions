import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

import Home from './Home'
import Blog from './Blog'
import BlogPost from './BlogPost'
import Rss from './Rss'

const Router = (props) => {
  const { channelContent, blogContent, butter } = props
  return (
    <Switch>
      <Route exact path='/' render={(props) => (
        <Home
          {...props}
          channelContent={channelContent}
          blogContent={blogContent}
        />
      )} />
      <Route path='/blog' render={(props) => (
        <Blog {...props} channelContent={channelContent} />
      )} />
      <Route path='/post/:postId' render={(props) => (
        <BlogPost {...props} posts={[].concat.apply([], [blogContent.data, channelContent])} />
      )} />
      <Route path='/rss' render={() => (
        <Rss butter={butter} />
      )} />
    </Switch>
  )
}

Router.propTypes = {
  channelContent: PropTypes.array,
  blogContent: PropTypes.object,
  butter: PropTypes.object,
}

export default Router