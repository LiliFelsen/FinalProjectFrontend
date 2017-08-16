import React, { Component } from 'react'
import { Button, Form, Grid, Card } from 'semantic-ui-react'

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
      <div id='login-sign-up'>
        <Grid centered style={{ margin: '12em 0' }}>
          <Grid.Column computer={6} largeScreen={5} >
            <Card fluid textAlign='center' style={{ background: 'rgba(245, 243, 243, 0.90)' }}>
              <Card.Content>
                <br/>
                <center>
                  <h2 style={{ color: '#EF4343' }}>Welcome!</h2>
                  <h3 style={{ color: '#EF4343' }}>Please fill in to create your account:</h3>
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
                  <center><Button type='submit' color='teal'>Sign Up</Button></center>
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

export default SignUpPage
