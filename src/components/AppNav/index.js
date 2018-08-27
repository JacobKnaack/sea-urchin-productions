import React from 'react'
import { Link } from 'react-router-dom'

class AppNav extends React.Component {
  render() {
    return (
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-list-item">
            <Link to='/'>Home</Link>
          </li>
          <li className="nav-list-item">
            <Link to='/blog'>Blog</Link>
          </li>
        </ul>
        <div className="search-bar-container">
          <input className="search-bar-input" placeholder='search' />
        </div>
      </nav>
    )
  }
}

export default AppNav
