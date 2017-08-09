import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login'

class responseFacebook extends Component {
  responseFacebook(response) {
    console.log(response)
  }

  render() {
      return (
        <FacebookLogin
          appId="529310444073410"
          autoLoad={true}
          fields="name,email,picture"
          callback={this.responseFacebook}
        />
    )
  }
}

export default responseFacebook
