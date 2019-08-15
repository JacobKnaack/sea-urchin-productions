const Styles = {
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: "5px",
    paddingBottom: '50px',
  },

  postHeading: {
    minHeight: '300px',
    width: '100%',
    display: 'flex',
    backgroundColor: '#464754',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: '40px',
  },

  meta: {
    height: '65px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: '12%',
    marginTop: '20px',
  },

  postTitle: {
    width: '75%',
    fontSize: '225%',
    lineHeight: '50px',
    textAlign: 'left',
    margin: '0 auto',
    color: '#ffffff',
  },

  divider: {
    margin: '15px 0 0 12%',
    height: '10px',
    width: '175px',
    backgroundColor: '#03F2FD',
  },

  metaDivider: {
    fontSize: '225%',
    color: '#03F2FD',
    height: '100%',
    lineHeight: '65px',
    margin: '0 10px 0 10px',
  },

  authorName: {
    fontFamily: 'Arvo, serif',
    color: '#d3d3d3',
    height: '100%',
    lineHeight: '65px',
  },

  postDate: {
    fontFamily: 'Arvo, serif',
    color: '#a9a9a9',
    height: '100%',
    lineHeight: '65px',
  },

  profileImage: {
    color: '#ffffff',
    margin: '10px',
    fontSize: '200%',
    maxWidth: '75px',
    borderRadius: '50%',
  },

  videoPost: {
    backgroundColor: '#464754',
  },

  videoHeading: {
    height: '200px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  videoEmbedded: {
    outline: 'none',
    border: 'none',
    minHeight: '500px',
  },

  videoDescription: {
    color: '#ffffff',
    fontSize: '150%',
    textAlign: 'left',
    margin: '0 40px',
    padding: '30px 0',
  },

  closeBtn: {
    position: 'fixed',
    right: '75px',
    top: '10px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100px',
    height: '50px',
    cursor: 'pointer',
    textDecoration: 'none',
    boxShadow: '0 4px 2px -2px #a9a9a9',
    borderRadius: '50px',
    backgroundColor: '#399198',
    color: '#ffffff',
    zIndex: '1',
    textAlign: 'center',
    lineHeight: '50px',
    verticalAlign: 'middle',
  },

  closeBtnMobile: {
    position: 'fixed',
    right: '10px',
    top: '5px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100px',
    height: '50px',
    cursor: 'pointer',
    textDecoration: 'none',
    boxShadow: '0 4px 2px -2px #a9a9a9',
    borderRadius: '50px',
    backgroundColor: '#399198',
    color: '#ffffff',
    zIndex: '1',
    textAlign: 'center',
    lineHeight: '50px',
    verticalAlign: 'middle',
  }
}

export default Styles
