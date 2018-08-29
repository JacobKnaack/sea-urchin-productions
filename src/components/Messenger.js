import React from 'react'

class Messenger extends React.Component {
  constructor() {
    super()
    this.state = {
      open: false,
    }

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
        top: '1%',
        right: '4%',
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
      // filter: {
      //   height: '100%',
      //   width: '100%',
      //   filter: 'blur(2px)',
      //   backgroundColor: 'rgba(0,0,0,0.6)',
      // },

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

      input: {
        outline: 'none',
        border: 'none',
        margin: '10px auto',
        width: '100%',
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
            className="far fa-comments"
            style={Styles.messageIcon}
            onClick={this.openMessenger}></i>
          : <form
            className='messenger-form'
            style={Styles.messageForm}
          // action="https://formspree.io/jacobknck@gmail.com"
          // method="POST"
          >
            <i
              className="fas fa-times"
              onClick={this.closeMessenger}
              style={Styles.closeIcon}>
            </i>
            <p style={Styles.formPrompt}>This blog is in a development cycle!  Send the developer a message:</p>
            <input
              type='text'
              name='email'
              placeholder='...Email'
              style={Styles.input}
            />
            <textarea
              name='message'
              placeholder='...Message'
              style={Styles.input}
            />
            <input type="submit" value="Send" />
          </form>
        }
      </div>
    )
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