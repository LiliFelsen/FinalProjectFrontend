import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'

class SignUpPage extends Component {

  state = {
    username: '',
    password: '',
    email: ''
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.onSendSignUp(this.state)
    this.setState({ username: '', password: '', email: '' })
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
        <Button type='submit'>Sign Up</Button>
      </Form>
    )
  }

}

export default SignUpPage
