import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import LandingPage from './LandingPage'
import LoginPage from './LoginPage'
import SignUpPage from './SignUpPage'
import UserPage from './UserPage'
import NavBar from './NavBar'
import RestaurantPage from './RestaurantPage'
import Auth from '../Auth/authorize'
import AuthAdapter from '../Auth/authAdapter'

class App extends Component {

  state = {
    auth: {
      isLoggedIn: false,
      user: ''
    }
  }

  onLogin = (loginParams) => {
    AuthAdapter.login(loginParams)
      .then(resp => {
        if(resp.error){
          console.log("error, do nothing", resp.error)
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
          console.log("error, do nothing", resp.error)
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
          <Route path="/" render={() => <NavBar currentUser={this.state.auth.user}/>} />

          <Route path="/home" render={()=> this.state.auth.isLoggedIn ?
            <Redirect to="/my_places"/> :
            <LandingPage />} />

          <Route path="/signup" render={()=> this.state.auth.isLoggedIn ?
            <Redirect to="/my_places"/> :
            <SignUpPage onSendSignUp={this.onSignUp} />} />

          <Route path="/login" render={()=> this.state.auth.isLoggedIn ?
            <Redirect to="/my_places"/> :
            <LoginPage onSendLogin={this.onLogin} />} />

          <Route path="/logout" render={()=> {
            this.handleLogout()
            return (<Redirect to="/home" />)}} />

          <Route exact path="/my_places" component={Auth(UserPage)} />

          <Route path="/my_places/:id" component={Auth(RestaurantPage)} />
        </div>
      </Router>
    )
  }
}

export default App
