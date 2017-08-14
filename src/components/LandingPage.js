import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

class LandingPage extends Component {

  render(){
    return(
      <div>
        <Link to="/signup"><Button>Sign Up</Button></Link>
        <Link to="/login"><Button>Login</Button></Link>
      </div>
    )
  }
}


export default LandingPage
