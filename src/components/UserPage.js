import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import UserNavbar from './UserNavbar'
import UserRestaurants from './UserRestaurants'
import FiltersTags from './FiltersTags'
import FriendList from './FriendList'

class UserPage extends Component {

  state = {
    currentUser: ''
  }

  componentDidMount = () => {
    fetch('http://localhost:3000/api/v1/users/1')
      .then(resp => resp.json())
      .then(currentUser => this.setState({ currentUser }))
  }

  render(){
    console.log('current user is:', this.state.currentUser);
    return(
      <div>
        <UserNavbar />
        <Grid>
          <Grid.Row>
            <Grid.Column width={3}>
              <FiltersTags />
            </Grid.Column>
            <Grid.Column width={10}>
              <UserRestaurants />
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
