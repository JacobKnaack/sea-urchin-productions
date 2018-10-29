import React from 'react'

const Subscribe = () => (
  <div id="mc_embed_signup">
    <form action="https://netlify.us19.list-manage.com/subscribe/post?u=531dcd59f3891cc065b22852d&amp;id=ffee6b8b23" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
      <div id="mc_embed_signup_scroll" >
        <h2>Subscribe to our mailing list</h2>
        <div className="indicates-required"><span className="asterisk">*</span> indicates required</div>
        <div className="mc-field-group">
          <label htmlFor="mce-EMAIL">Email Address  <span className="asterisk">*</span></label>
          <input type="email" value="" name="EMAIL" className="required email" id="mce-EMAIL" />
        </div>
        <div className="mc-field-group">
          <label htmlFor="mce-FNAME">First Name </label>
          <input type="text" value="" name="FNAME" className="" id="mce-FNAME" />
        </div>
        <div className="mc-field-group">
          <label htmlFor="mce-LNAME">Last Name </label>
          <input type="text" value="" name="LNAME" className="" id="mce-LNAME" />
        </div>
        <div id="mce-responses" className="clear">
          <div className="response" id="mce-error-response" style={{ display: 'none' }}></div>
          <div className="response" id="mce-success-response" style={{ display: 'none' }}></div>
        </div>
        <div style={{ position: 'absolute', left: '-5000px', ariaHidden: 'true' }}>
          <input type="text" name="b_531dcd59f3891cc065b22852d_ffee6b8b23" tabIndex="-1" value="" />
        </div>
        <div className="clear">
          <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button" />
        </div>
      </div>
    </form>
  </div>
)

export default Subscribe