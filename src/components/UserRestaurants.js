import React, { Component } from 'react'
import RestaurantsMap from './RestaurantsMap'
import RestaurantsList from './RestaurantsList'

class UserRestaurants extends Component {

  state = {
    userRestaurants: [],
    restaurantsDetails: []
  }

  componentDidMount = () => {
    fetch('http://localhost:3000/api/v1/user_restaurants')
      .then(resp => resp.json())
      .then(restaurants => this.setState({
        userRestaurants: restaurants.filter(r => r.user_id === 1)
      }))
      .then(() => this.fetchRestaurant())
  // TODO: make sure this.props.currentUserId works to filter userRestaurants
  }

  fetchRestaurant = () => {
    fetch('http://localhost:3000/api/v1/restaurants')
      .then(resp => resp.json())
      .then(restaurants => {
        this.setState({
          restaurantsDetails: this.state.userRestaurants.map(rest =>
          restaurants.filter(r => r.id === rest.restaurant_id)[0])
        })
      }
    )
  }

  render(){
    return(
      <div>
        <RestaurantsMap restaurantsDetails={this.state.restaurantsDetails} />
        <RestaurantsList restaurantsDetails={this.state.restaurantsDetails} />
      </div>
    )
  }

}

export default UserRestaurants
