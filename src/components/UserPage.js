import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import UserNavbar from './UserNavbar'
import UserRestaurants from './UserRestaurants'
import FiltersTags from './FiltersTags'
import FriendList from './FriendList'
import AuthAdapter from '../Auth/authAdapter'

class UserPage extends Component {

  state = {
    currentUserId: '',
    userRestaurants: [],
    restaurantsDetails: [],
    mapVisible: true,
    searchTerm: ''
  }

  fetchUserRestaurants = () => {
    fetch('http://localhost:3000/api/v1/user_restaurants')
      .then(resp => resp.json())
      .then(restaurants => this.setState({
        userRestaurants: restaurants.filter(r => r.user_id === this.state.currentUserId)
      }))
      .then(() => this.fetchRestaurantsDetails())
  }

  fetchRestaurantsDetails = () => {
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

  componentDidMount = () => {
    AuthAdapter.currentUser()
      .then(user => this.setState({ currentUserId: user.id }))
  }

  handleShow = () => {
    this.setState({
      mapVisible: !this.state.mapVisible
    })
  }

  handleSearch = (event) => {
    this.setState({ searchTerm: event.target.value })
  }

  render(){
    return(
      <div>
        <UserNavbar handleShow={this.handleShow}
          fetchRestaurants={this.fetchUserRestaurants}
          restaurantsDetails={this.state.restaurantsDetails}
          handleSearch={this.handleSearch}
        />
        <Grid>
          <Grid.Row>
            <Grid.Column width={3}>
              <FiltersTags />
            </Grid.Column>
            <Grid.Column width={10}>
              <UserRestaurants currentUserId={this.state.currentUserId}
                mapVisible={this.state.mapVisible}
                restaurantsDetails={this.state.restaurantsDetails}
                searchTerm={this.state.searchTerm}
              />
            </Grid.Column>
            <Grid.Column width={3}>
              <FriendList />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }

}

export default UserPage
