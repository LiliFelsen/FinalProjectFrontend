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

  fetchRestaurantsDetails = () => {
    fetch(process.env.REACT_APP_API + '/restaurants')
    .then(resp => resp.json())
    .then(restaurants => {
      this.setState({
        restaurantsDetails: this.state.userRestaurants.map(rest =>
          restaurants.filter(r => r.id === rest.restaurant_id)[0]),
          doneDetails:  this.state.doneRestaurants.map(rest =>
            restaurants.filter(r => r.id === rest.restaurant_id)[0]),
            wishlistDetails:  this.state.wishlistRestaurants.map(rest =>
              restaurants.filter(r => r.id === rest.restaurant_id)[0])
            })
          }
        )
      }

  fetchUserRestaurants = () => {
    fetch(process.env.REACT_APP_API + '/user_restaurants')
      .then(resp => resp.json())
      .then(restaurants => this.setState({
        userRestaurants: restaurants.filter(r => r.user_id === this.state.shownUserId),
        doneRestaurants: restaurants.filter(r => r.user_id === this.state.shownUserId && r.visited === true),
        wishlistRestaurants: restaurants.filter(r => r.user_id === this.state.shownUserId && r.visited === false),
      }))
      .then(() => this.fetchRestaurantsDetails())
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
    this.setState({ shownUserId: parseInt(event.target.id) },
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
                    changeShownUser={this.changeShownUser}
                    backToCurrentUser={this.backToCurrentUser}
                    fetchUserRestaurants={this.fetchUserRestaurants}
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
