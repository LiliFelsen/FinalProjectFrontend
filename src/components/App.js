import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import LoginPage from './LoginPage'
import UserPage from './UserPage'
import RestaurantPage from './RestaurantPage'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/login" component={LoginPage} />
          <Route exact path="/my_places" component={UserPage} />
          <Route path="/my_places/:id" component={RestaurantPage} />
        </div>
      </Router>
    )
  }
}

export default App
