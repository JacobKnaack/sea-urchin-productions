import React from 'react'
import MailChimpForm from './MailChimpForm'
import "./_messenger.css"

class Messenger extends React.Component {
  constructor() {
    super()
    this.state = {
      open: false,
      email: '',
      firstName: '',
      lastName: '',
    }

    this.handleInput = this.handleInput.bind(this)
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
  }

  render() {
    const containerClasses = () => {
      if (this.state.open) {
        return 'messenger-container open'
      }

      return 'messenger-container'
    }

    return (
      <div className={containerClasses()}>
        {!this.state.open
          ? <i
            className="fas fa-envelope formIcon"
            onClick={this.open} />
          : <MailChimpForm
            email={this.state.email}
            firstName={this.state.firstName}
            lastName={this.state.lastName}
            handleInput={this.handleInput}
            closeForm={this.close}
          />
        }
      </div>
    )
  }

  handleInput(e) {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  open() {
    this.setState({
      open: true,
    })
  }

  close() {
    this.setState({
      open: false,
    })
  }
}

export default Messenger