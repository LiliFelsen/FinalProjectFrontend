import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import LandingPage from './LandingPage'
import LogoutHandler from './LogoutHandler'
import LoginPage from './LoginPage'
import SignUpPage from './SignUpPage'
import UserBrowser from './UserBrowser'
import Auth from '../Auth/authorize'
import AuthAdapter from '../Auth/authAdapter'

import '../index.css'

class App extends Component {

  state = {
    auth: {
      isLoggedIn: false,
      user: ''
    },
    errors: []
  }

  onLogin = (loginParams) => {
    AuthAdapter.login(loginParams)
      .then(resp => {
        if(resp.error){
          this.setState({ errors: resp.error })
        } else {
          localStorage.setItem('jwt', resp.jwt)
          this.setState({
            auth: {
              isLoggedIn: true,
              user: resp.username
            }
          })
        }
      })
  }

  onSignUp = (signUpParams) => {
    AuthAdapter.signUp(signUpParams)
      .then(resp => {
        if(resp.error){
          this.setState({ errors: resp.error })
        } else {
          localStorage.setItem('jwt', resp.jwt)
          this.setState({
            auth: {
              isLoggedIn: true,
              user: resp.username
            }
          })
        }
      })
  }

  handleLogout = () => {
    localStorage.clear()
    this.setState({
      auth: {
        isLoggedIn: false,
        user: ''
      }
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" render={()=> this.state.auth.isLoggedIn ?
            <Redirect to="/my_places"/> :
            <LandingPage />} />

          <Route path="/signup" render={()=> this.state.auth.isLoggedIn ?
            <Redirect to="/my_places"/> :
            <SignUpPage onSendSignUp={this.onSignUp} errors={this.state.errors} />} />

          <Route path="/login" render={()=> this.state.auth.isLoggedIn ?
            <Redirect to="/my_places"/> :
            <LoginPage onSendLogin={this.onLogin} errors={this.state.errors} />} />

          <Route path="/logout" render={()=> (
            <LogoutHandler logout={this.handleLogout} />
          )} />

          <Route path="/my_places" component={Auth(UserBrowser)} />
        </div>
      </Router>
    )
  }
}

export default App
