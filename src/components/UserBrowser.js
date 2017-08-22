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

  setRestaurantData = (restaurants, userRestaurants, doneRestaurants, wishlistRestaurants) => {
    let restaurantsDetails = userRestaurants.map(rest =>
      restaurants.filter(r => r.id === rest.restaurant_id)[0])
    let doneDetails = doneRestaurants.map(rest =>
      restaurants.filter(r => r.id === rest.restaurant_id)[0])
    let wishlistDetails = wishlistRestaurants.map(rest =>
      restaurants.filter(r => r.id === rest.restaurant_id)[0])

    this.setState({
      restaurantsDetails: restaurantsDetails,
      doneDetails: doneDetails,
      wishlistDetails: wishlistDetails
    })
  }

  fetchRestaurantsDetails = (userRestaurants, doneRestaurants, wishlistRestaurants) => {
    fetch(process.env.REACT_APP_API + '/restaurants')
    .then(resp => resp.json())
    .then(restaurants => this.setRestaurantData(restaurants, userRestaurants, doneRestaurants, wishlistRestaurants))
  }

  fetchUserRestaurants = () => {
    fetch(process.env.REACT_APP_API + '/user_restaurants')
      .then(resp => resp.json())
      .then(restaurants => {
        let userRestaurants = restaurants.filter(r => r.user_id === this.state.shownUserId)
        let doneRestaurants = restaurants.filter(r => r.user_id === this.state.shownUserId && r.visited === true)
        let wishlistRestaurants = restaurants.filter(r => r.user_id === this.state.shownUserId && r.visited === false)
        this.setState({
          userRestaurants: userRestaurants,
          doneRestaurants: doneRestaurants,
          wishlistRestaurants: wishlistRestaurants
        })})
      .then((userRestaurants, doneRestaurants, wishlistRestaurants) => this.fetchRestaurantsDetails(userRestaurants, doneRestaurants, wishlistRestaurants))
  }

  fetchUsers = (currentUser) => {
    fetch(process.env.REACT_APP_API + '/users')
      .then(resp => resp.json())
      .then(users => this.setState({
        allUsers: users,
        currentUser: users.filter(user => user.id === currentUser.id)[0],
        shownUserId: users.filter(user => user.id === currentUser.id)[0].id
      }))
  }

  componentDidMount = () => {
    AuthAdapter.currentUser()
      .then(currentUser => this.fetchUsers(currentUser))
      .then(() => this.fetchUserRestaurants())
  }

  changeShownUser = (event) => {
    this.setState({ shownUserId: parseInt(event.target.id, 10) },
    () => this.fetchUserRestaurants())
  }

  backToCurrentUser = () => {
    this.setState({ shownUserId: this.state.currentUser.id },
    () => this.fetchUserRestaurants())
  }

  render(){
    return(
      <div>
        <Route exact path="/my_places" render={()=>
          <UserPage allUsers={this.state.allUsers}
                    currentUser={this.state.currentUser}
                    shownUserId={this.state.shownUserId}
                    fetchUsers={this.fetchUsers}
                    fetchUserRestaurants={this.fetchUserRestaurants}
                    changeShownUser={this.changeShownUser}
                    backToCurrentUser={this.backToCurrentUser}
                    restaurantsDetails={this.state.restaurantsDetails}
                    doneDetails={this.state.doneDetails}
                    wishlistDetails={this.state.wishlistDetails}
                  />
        }/>
        <Route path="/my_places/:id" render={(props)=>
          <RestaurantPage allUsers={this.state.allUsers}
                    currentUser={this.state.currentUser}
                    shownUserId={this.state.shownUserId}
                    {...props} />
        }/>
      </div>
    )
  }
}

export default UserBrowser
