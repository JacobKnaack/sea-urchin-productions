import React from 'react'
import "./_messenger.css"

class Messenger extends React.Component {
  constructor() {
    super()
    this.state = {
      open: false,
      email: '',
      message: '',
    }

    this.handleInput = this.handleInput.bind(this)
    this.openMessenger = this.openMessenger.bind(this)
    this.closeMessenger = this.closeMessenger.bind(this)
  }

  render() {
    const Styles = {
      container: {
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        zIndex: '101',
        top: '10px',
        right: '10px',
        backgroundColor: '#0F70B2',
        borderRadius: '30px',
        boxShadow: ' 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        transition: '0.5s, ease-in-out',
      },

      messageIcon: {
        color: 'white',
        fontSize: '150%',
        width: '100%',
        height: '100%',
        lineHeight: '50px',
      },

      closeIcon: {
        position: 'relative',
        width: '30px',
        color: 'white',
        fontSize: '150%',
        left: '2%',
      },

      messageForm: {
        height: '100%',
        width: '90%',
        margin: '10px auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      },

      formPrompt: {
        color: 'white',
      },

      email: {
        outline: 'none',
        border: 'none',
        margin: '10px auto',
        width: '100%',
        borderRadius: '5px',
        fontSize: '120%',
      },

      message: {
        outline: 'none',
        border: 'none',
        margin: '10px auto',
        width: '100%',
        borderRadius: '5px 5px 0 0',
        height: '200px',
        fontSize: '120%',
      },

      formInputs: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        height: '80%',
      },

      sendBtn: {
        width: '100px',
        margin: '0 auto',
        backgroundColor: '#d3d3d3',
        border: 'thin solid white',
        color: 'white',
        fontSize: '150%',
        borderRadius: '5px',
      }
    }

    const containerStyleHandler = () => {
      let style = Styles.container
      if (this.state.open) {
        style.width = '300px'
        style.height = '400px'
        style.cursor = 'auto'
      } else {
        style.width = '50px'
        style.height = '50px'
        style.cursor = 'pointer'
      }

      return style
    }

    return (
      <div
        className="messenger-container"
        style={containerStyleHandler()}
      >
        {!this.state.open
          ? <i
            className="fas fa-envelope"
            style={Styles.messageIcon}
            onClick={this.openMessenger}></i>
          : <form
            className='messenger-form'
            style={Styles.messageForm}
            action="https://formspree.io/jacobknck@gmail.com"
            method="POST"
          >
            <i
              className="fas fa-times"
              onClick={this.closeMessenger}
              style={Styles.closeIcon}>
            </i>
            <p style={Styles.formPrompt}>This blog is in a development cycle!  Send the developer a message:</p>
            <div className='formInputs' style={Styles.formInputs}>
              <input
                type='text'
                name='email'
                value={this.state.email}
                placeholder='Email'
                style={Styles.email}
                onChange={this.handleInput}
              />
              <textarea
                name='message'
                value={this.state.message}
                placeholder='Message'
                style={Styles.message}
                onChange={this.handleInput}
              />
              <input
                type="submit"
                value="Send"
                style={Styles.sendBtn}
              />
            </div>
          </form>
        }
      </div>
    )
  }

  handleInput(e) {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  openMessenger() {
    this.setState({
      open: true,
    })
  }

  closeMessenger() {
    this.setState({
      open: false,
    })
  }
}

export default Messenger