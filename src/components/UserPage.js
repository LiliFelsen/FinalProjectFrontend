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
    searchTerm: '',
    tagSearch: ''
  }

  fetchUserRestaurants = () => {
    fetch(process.env.REACT_APP_API + '/user_restaurants')
      .then(resp => resp.json())
      .then(restaurants => this.setState({
        userRestaurants: restaurants.filter(r => r.user_id === this.state.currentUserId)
      }))
      .then(() => this.fetchRestaurantsDetails())
  }

  fetchRestaurantsDetails = () => {
    fetch(process.env.REACT_APP_API + '/restaurants')
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
      .then(() => this.fetchUserRestaurants())
  }

  handleShow = () => {
    this.setState({
      mapVisible: !this.state.mapVisible
    })
  }

  handleSearchByName = (event) => {
    this.setState({ searchTerm: event.target.value })
  }

  handleTagSearch = (event) => {
    this.setState({ tagSearch: event.target.value })
  }

  handleFilter = (event) => {

  }

  render(){
    return(
      <div>
        <UserNavbar handleShow={this.handleShow}
          fetchRestaurants={this.fetchUserRestaurants}
          restaurantsDetails={this.state.restaurantsDetails}
          handleSearch={this.handleSearchByName}
          currentUserId={this.state.currentUserId}
        />
        <Grid>
          <Grid.Row>
            <Grid.Column width={3}>
              <FiltersTags
              handleSearch={this.handleTagSearch} />
            </Grid.Column>
            <Grid.Column width={10}>
              <UserRestaurants currentUserId={this.state.currentUserId}
                mapVisible={this.state.mapVisible}
                restaurantsDetails={this.state.restaurantsDetails}
                userRestaurants={this.state.userRestaurants}
                searchTerm={this.state.searchTerm}
                tagSearch={this.state.tagSearch}
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
