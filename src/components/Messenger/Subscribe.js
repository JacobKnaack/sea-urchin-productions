import React from 'react'
import PropTypes from 'prop-types'

const Subscribe = ({ handleSubmit, status, message, inputChange, email, firstName, lastName, closeForm }) => {
  return (
    <div id="mc_embed_signup">
      {status === 'sending' &&
        <div className="subscribeFeedback request">
          <p>Sending...</p>
        </div>
      }
      {status === 'error' &&
        <div className="subscribeFeedback failure">
          <p>{message}</p>
        </div>
      }
      {status === 'success' &&
        <div className="subscribeFeedback success">
          <p>Success {message}</p>
        </div>
      }
      <form
        onSubmit={handleSubmit}
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        className="validate"
        noValidate
      >
        <div id="mc_embed_signup_scroll" >
          <h2>Subscribe to our mailing list</h2>
          <div className="indicates-required"><span className="asterisk">*</span> indicates required</div>
          <div className="mc-field-group">
            <label
              className="input-label"
              htmlFor="mce-EMAIL"
            >
              Email Address  <span className="asterisk">*</span>
            </label>
            <input
              type="email"
              onChange={inputChange}
              value={email}
              name="email"
              className="required email"
              id="mce-EMAIL"
            />
          </div>
          <div className="mc-field-group">
            <label
              className="input-label"
              htmlFor="mce-FNAME"
            >
              First Name
            </label>
            <input
              type="text"
              onChange={inputChange}
              value={firstName}
              name="firstName"
              className="firstname"
              id="mce-FNAME"
            />
          </div>
          <div className="mc-field-group">
            <label
              className="input-label"
              htmlFor="mce-LNAME"
            >
              Last Name
            </label>
            <input
              type="text"
              onChange={inputChange}
              value={lastName}
              name="lastName"
              className="lastname"
              id="mce-LNAME"
            />
          </div>
          <div id="mce-responses" className="clear">
            <div className="response" id="mce-error-response" style={{ display: 'none' }}></div>
            <div className="response" id="mce-success-response" style={{ display: 'none' }}></div>
          </div>
          <div style={{ position: 'absolute', left: '-5000px', ariaHidden: 'true' }}>
            <input
              type="text"
              name="b_531dcd59f3891cc065b22852d_ffee6b8b23"
              tabIndex="-1"
              value=""
            />
          </div>
          <div className="clear">
            <input
              type="submit"
              value="Subscribe"
              name="subscribe"
              id="mc-embedded-subscribe"
              className="button"
            />
            <input
              type="button"
              value="close"
              name="close"
              id="mc-embedded-close"
              className="button"
              onClick={closeForm}
            />
          </div>
        </div>
      </form>
    </div>
  )
}

Subscribe.propTypes = {
  handleSubmit: PropTypes.func,
  inputChange: PropTypes.func,
  status: PropTypes.string,
  message: PropTypes.string,
  email: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  closeForm: PropTypes.func,
}

export default Subscribe