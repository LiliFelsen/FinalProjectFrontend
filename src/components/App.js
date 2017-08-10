import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import LoginPage from './LoginPage'
import UserPage from './UserPage'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path='/login' component={LoginPage} />
          <Route path='/my_page' component={UserPage} />
        </div>
      </Router>
    )
  }
}

export default App
