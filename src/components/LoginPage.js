import React, { Component } from 'react'
import { Button, Form, Grid, Card } from 'semantic-ui-react'

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
      <div id='login-sign-up'>
        <Grid centered style={{ margin: '12em 0' }}>
          <Grid.Column computer={6} largeScreen={5} >
            <Card fluid textAlign='center' style={{ background: 'rgba(245, 243, 243, 0.90)' }}>
              <Card.Content>
                <br/>
                <center>
                  <h2 style={{ color: '#EF4343' }}>Welcome Back!</h2>
                </center>
                <br/><br/>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                    <label>Your username</label>
                    <input name='username' placeholder='Username' onChange={this.handleChange} />
                  </Form.Field>
                  <Form.Field>
                    <label>Your password</label>
                    <input type='password' name='password' placeholder='Password' onChange={this.handleChange} />
                  </Form.Field>
                  <br/>
                  <center><Button type='submit' color='teal'>Log In</Button></center>
                  <br/>
                </Form>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
      </div>
    )
  }

}

export default LoginPage
