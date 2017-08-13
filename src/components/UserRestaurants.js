import React, { Component } from 'react'
import RestaurantMap from './RestaurantMap'
import RestaurantList from './RestaurantList'

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
    // console.log('current user id:', this.props.currentUserId);
    // console.log('current user restaurants:', this.state.userRestaurants);
    // console.log('current restaurants details:', this.state.restaurantsDetails);
    return(
      <div>
        <RestaurantMap restaurantsDetails={this.state.restaurantsDetails} />
        <RestaurantList restaurantsDetails={this.state.restaurantsDetails} />
      </div>
    )
  }

}

export default UserRestaurants
