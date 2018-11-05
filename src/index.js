import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

const reactRoot = (node) => {
  ReactDOM.render(node, document.getElementById('root'))
}

if (window.location.pathname === '/.rss') {
  reactRoot(
    <div id="xmlDisplay">
      {document.getElementById('xmlFeed').textContent}
    </div>
  )
} else {
  reactRoot(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

registerServiceWorker()
