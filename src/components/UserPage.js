import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import UserNavbar from './UserNavbar'
import UserRestaurants from './UserRestaurants'
import FiltersTags from './FiltersTags'
import FriendList from './FriendList'

class UserPage extends Component {

  state = {
    currentUserId: '',
    userRestaurants: [],
    restaurantsDetails: [],
    mapVisible: true
  }

  fetchUserRestaurants = () => {
    fetch('http://localhost:3000/api/v1/user_restaurants')
      .then(resp => resp.json())
      .then(restaurants => this.setState({
        userRestaurants: restaurants.filter(r => r.user_id === 1)
      }))
      .then(() => this.fetchRestaurantsDetails())
  // TODO: make sure this.props.currentUserId works to filter userRestaurants
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
    this.fetchUserRestaurants()
    fetch('http://localhost:3000/api/v1/users/1')
      .then(resp => resp.json())
      .then(currentUser => this.setState({ currentUserId: currentUser.id }))
  }

  handleShow = () => {
    this.setState({
      mapVisible: !this.state.mapVisible
    })
  }

  render(){
    return(
      <div>
        <UserNavbar handleShow={this.handleShow}
          fetchRestaurants={this.fetchUserRestaurants} />
        <Grid>
          <Grid.Row>
            <Grid.Column width={3}>
              <FiltersTags />
            </Grid.Column>
            <Grid.Column width={10}>
              <UserRestaurants currentUserId={this.state.currentUserId}
                mapVisible={this.state.mapVisible}
                restaurantsDetails={this.state.restaurantsDetails}
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
