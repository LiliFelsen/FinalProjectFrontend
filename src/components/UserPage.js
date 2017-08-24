import React, { Component } from 'react'
import { Grid, Dimmer, Loader } from 'semantic-ui-react'
import NavBar from './NavBar'
import UserNavbar from './UserNavbar'
import UserRestaurants from './UserRestaurants'
import FiltersTags from './FiltersTags'
import FriendList from './FriendList'

class UserPage extends Component {

  state = {
    mapVisible: true,
    searchTerm: '',
    tagSearch: '',
    show: '',
    shownUser: [],
    loading: true
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.shownUserId) {
      this.setState({ loading: false })
    }
  }

  componentDidMount = () => {
    this.props.fetchData(this.props.shownUserId)
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

  render() {

    const loader = (
      <Dimmer active>
        <Loader size='medium' content='Loading...'/>
      </Dimmer>)

    return (
      <div id='user-page'>
        <NavBar username={this.props.currentUser.username} />
        <UserNavbar
          handleShow={this.handleShow}
          fetchRestaurants={this.props.fetchUserRestaurants}
          handleSearch={this.handleSearchByName}
          currentUser={this.props.currentUser}
          fetchData={this.props.fetchData}
          shownUserId={this.props.shownUserId}
        />
        {this.state.loading ? loader :
        <Grid centered>
          <Grid.Row>
            <Grid.Column>
            </Grid.Column>
          </Grid.Row>
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
                shownUserId={this.props.shownUserId}
              />
            </Grid.Column>
            <Grid.Column width={3}>
              <FriendList currentUser={this.props.currentUser}
                shownUser={this.props.shownUser}
                shownUserId={this.props.shownUserId}
                allUsers={this.props.allUsers}
                fetchCurrentUser={this.props.fetchCurrentUser}
                changeShownUser={this.props.changeShownUser}
                backToCurrentUser={this.props.backToCurrentUser} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        }
      </div>
    )
  }

}

export default UserPage
