import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import UserPage from './UserPage'
import RestaurantPage from './RestaurantPage'
import AuthAdapter from '../Auth/authAdapter'

class UserBrowser extends Component {

  state = {
    allUsers: [],
    currentUser: '',
    shownUserId: '',
    userRestaurants: [],
    doneRestaurants: [],
    wishlistRestaurants: [],
    restaurantsDetails: [],
    doneDetails: [],
    wishlistDetails: []
  }

  fetchData = (shownUserId) => {
    fetch(process.env.REACT_APP_API + '/users')
      .then(resp => resp.json())
      .then(users => {
        let shownUser = users.find(user => user.id === shownUserId)
        if (shownUser) {
          let doneRestaurants = shownUser.user_restaurants.filter(rest => rest.visited === true)
          let wishlistRestaurants = shownUser.user_restaurants.filter(rest => rest.visited === false)
          let doneDetails = doneRestaurants.map(rest => shownUser.restaurants.filter(r => r.id === rest.restaurant_id)[0])
          let wishlistDetails = wishlistRestaurants.map(rest => shownUser.restaurants.filter(r => r.id === rest.restaurant_id)[0])

          this.setState({
            allUsers: users,
            shownUser: shownUser,
            shownUserId: shownUser.id,
            userRestaurants: shownUser.user_restaurants,
            doneRestaurants: doneRestaurants[0],
            wishlistRestaurants: wishlistRestaurants[0],
            restaurantsDetails: shownUser.restaurants,
            doneDetails: doneDetails,
            wishlistDetails: wishlistDetails
          })
        }
      })
  }

  fetchCurrentUser = (currentUser) => {
    fetch(process.env.REACT_APP_API + '/users')
      .then(resp => resp.json())
      .then(users => {
        let user = users.find(user => user.id === currentUser.id)
        this.setState({ currentUser: user })
      })
  }

  componentDidMount = () => {
    AuthAdapter.currentUser()
      .then(currentUser => {
        this.fetchCurrentUser(currentUser)
        this.fetchData(currentUser.id)
      })
  }

  changeShownUser = (event) => {
    this.setState({ shownUserId: parseInt(event.target.id, 10) },
    () => this.fetchData(this.state.shownUserId))
  }

  backToCurrentUser = () => {
    this.setState({ shownUserId: this.state.currentUser.id },
    () => this.fetchData(this.state.shownUserId))
  }

  render() {
    return (
      <div>
        <Route exact path="/my_places" render={()=>
          <UserPage allUsers={this.state.allUsers}
                    currentUser={this.state.currentUser}
                    shownUserId={this.state.shownUserId}
                    shownUser={this.state.shownUser}
                    fetchCurrentUser={this.fetchCurrentUser}
                    fetchUserRestaurants={this.fetchUserRestaurants}
                    changeShownUser={this.changeShownUser}
                    backToCurrentUser={this.backToCurrentUser}
                    restaurantsDetails={this.state.restaurantsDetails}
                    doneDetails={this.state.doneDetails}
                    wishlistDetails={this.state.wishlistDetails}
                    fetchData={this.fetchData}
                  />
        }/>
        <Route path="/my_places/:id" render={(props)=>
          <RestaurantPage allUsers={this.state.allUsers}
                    currentUser={this.state.currentUser}
                    shownUserId={this.state.shownUserId}
                    fetchData={this.fetchData}
                    {...props} />
        }/>
      </div>
    )
  }
}

export default UserBrowser
