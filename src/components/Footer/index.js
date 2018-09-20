import React from 'react'
import './_footer.css'

const Footer = () => {
  return (
    <div className="footer">
      <p>
        Built by <a href="https://jacobknaack.me">Jacob Knaack</a> using:
      </p>
      <a
        href="https://buttercms.com"
        target="_blank"
        className="footer-attribute"
        rel="noopener noreferrer"
      >
        <img
          id="butter-link-img"
          src="https://cdn.buttercms.com/RyJ7UhcVTCRqrCFXwgCo"
          alt="Butter CMS"
        />
      </a>
    </div>
  )
}

export default Footer
