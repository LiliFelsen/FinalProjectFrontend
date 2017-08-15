import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'

class LoginPage extends Component {

  state = {
    username: '',
    password: ''
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.onSendLogin(this.state)
    this.setState({ username: '', password: '' })
  }

  render(){
    return(
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>Username</label>
          <input name='username' placeholder='Username' onChange={this.handleChange} />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input type='password' name='password' placeholder='Password' onChange={this.handleChange} />
        </Form.Field>
        <Button type='submit'>Log In</Button>
      </Form>
    )
  }

}

export default LoginPage
