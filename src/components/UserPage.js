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
    restaurantsDetails: [],
    mapVisible: true,
    searchTerm: '',
    tagSearch: '',
    show: ''
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      restaurantsDetails: nextProps.restaurantsDetails
    })
  }

  componentDidMount = () => {
    this.props.fetchUserRestaurants()
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
        <NavBar username={this.props.currentUser.username} />
        <UserNavbar
          handleShow={this.handleShow}
          fetchRestaurants={this.props.fetchUserRestaurants}
          handleSearch={this.handleSearchByName}
          currentUser={this.props.currentUser}
        />
        <Grid centered>
          <Grid.Row>
            <Grid.Column width={3}>
              <FiltersTags
              handleSearch={this.handleTagSearch}
              handleClick={this.handleClick} />
            </Grid.Column>
            <Grid.Column width={8}>
              <UserRestaurants
                mapVisible={this.state.mapVisible}
                restaurantsDetails={this.props.restaurantsDetails}
                doneDetails={this.props.doneDetails}
                wishlistDetails={this.props.wishlistDetails}
                searchTerm={this.state.searchTerm}
                tagSearch={this.state.tagSearch}
                show={this.state.show}
              />
            </Grid.Column>
            <Grid.Column width={3}>
              <FriendList currentUser={this.props.currentUser}
                shownUserId={this.props.shownUserId}
                allUsers={this.props.allUsers}
                fetchUsers={this.props.fetchUsers}
                changeShownUser={this.props.changeShownUser}
                backToCurrentUser={this.props.backToCurrentUser} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }

}

export default UserPage
