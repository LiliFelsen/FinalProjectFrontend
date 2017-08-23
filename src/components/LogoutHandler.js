import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class LogoutHandler extends Component {

  componentWillMount = () => {
    this.props.logout()
  }

  render() {
    return (
      <div>
        <Redirect to="/" />
      </div>
    )
  }

}

export default LogoutHandler
