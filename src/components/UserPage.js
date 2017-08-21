import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import NavBar from './NavBar'
import UserNavbar from './UserNavbar'
import UserRestaurants from './UserRestaurants'
import FiltersTags from './FiltersTags'
import FriendList from './FriendList'
import AuthAdapter from '../Auth/authAdapter'

class UserPage extends Component {

  state = {
    allUsers: [],
    currentUser: '',
    userRestaurants: [],
    doneRestaurants: [],
    wishlistRestaurants: [],
    restaurantsDetails: [],
    doneDetails: [],
    wishlistDetails: [],
    mapVisible: true,
    searchTerm: '',
    tagSearch: '',
    show: ''
  }

  fetchUserRestaurants = () => {
    fetch(process.env.REACT_APP_API + '/user_restaurants')
      .then(resp => resp.json())
      .then(restaurants => this.setState({
        userRestaurants: restaurants.filter(r => r.user_id === this.state.currentUser.id),
        doneRestaurants: restaurants.filter(r => r.user_id === this.state.currentUser.id && r.visited === true),
        wishlistRestaurants: restaurants.filter(r => r.user_id === this.state.currentUser.id && r.visited === false),
      }))
      .then(() => this.fetchRestaurantsDetails())
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

  fetchUsers = (currentUser) => {
    fetch(process.env.REACT_APP_API + '/users')
      .then(resp => resp.json())
      .then(users => this.setState({
        allUsers: users,
        currentUser: users.filter(user => user.id === currentUser.id)[0]
      }))
  }

  componentDidMount = () => {
    AuthAdapter.currentUser()
      .then(currentUser => this.fetchUsers(currentUser))
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

  handleClick = (event) => {
    this.setState({ show: event.target.value })
  }

  render(){
    return(
      <div id='user-page'>
        <NavBar username={this.state.currentUser.username} />
        <UserNavbar
          handleShow={this.handleShow}
          fetchRestaurants={this.fetchUserRestaurants}
          restaurantsDetails={this.state.restaurantsDetails}
          handleSearch={this.handleSearchByName}
          currentUser={this.state.currentUser}
        />
        <Grid centered style={{ margin: '3em 0' }}>
          <Grid.Row>
            <Grid.Column width={3}>
              <FiltersTags
              handleSearch={this.handleTagSearch}
              handleClick={this.handleClick} />
            </Grid.Column>
            <Grid.Column width={8}>
              <UserRestaurants
                mapVisible={this.state.mapVisible}
                restaurantsDetails={this.state.restaurantsDetails}
                doneDetails={this.state.doneDetails}
                wishlistDetails={this.state.wishlistDetails}
                searchTerm={this.state.searchTerm}
                tagSearch={this.state.tagSearch}
                show={this.state.show}
              />
            </Grid.Column>
            <Grid.Column width={3}>
              <FriendList currentUser={this.state.currentUser}
                allUsers={this.state.allUsers}
                fetchUsers={this.fetchUsers} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }

}

export default UserPage
