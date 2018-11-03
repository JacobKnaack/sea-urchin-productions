import React from 'react'
import PropTypes from 'prop-types'
import MailChimpSubscribe from 'react-mailchimp-subscribe'

import Subscribe from './Subscribe'

const MailChimpForm = ({ email, firstName, lastName, handleInput, closeForm }) => {
  return (
    <MailChimpSubscribe
      url={"https://netlify.us19.list-manage.com/subscribe/post?u=531dcd59f3891cc065b22852d&amp;id=ffee6b8b23"}
      render={({ subscribe, status, message }) => (
        <div>
          <Subscribe
            handleSubmit={e => {
              e.preventDefault()
              subscribe({
                EMAIL: email,
                FNAME: firstName,
                LNAME: lastName,
              })
            }}
            status={status}
            message={message}
            inputChange={handleInput}
            email={email}
            firstName={firstName}
            lastName={lastName}
            closeForm={closeForm}
          />
        </div>
      )}
    />
  )
}

MailChimpForm.propTypes = {
  email: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  handleInput: PropTypes.func,
  closeForm: PropTypes.func,
}

export default MailChimpForm