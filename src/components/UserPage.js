import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import UserNavbar from './UserNavbar'
import UserRestaurants from './UserRestaurants'
import FiltersTags from './FiltersTags'
import FriendList from './FriendList'

class UserPage extends Component {

  state = {
    currentUserId: ''
  }

  componentDidMount = () => {
    fetch('http://localhost:3000/api/v1/users/1')
      .then(resp => resp.json())
      // .then(currentUser => {debugger})
      .then(currentUser => this.setState({ currentUserId: currentUser.id }))
  }

  render(){
    // console.log('current user id is:', this.state.currentUserId);
    return(
      <div>
        <UserNavbar />
        <Grid>
          <Grid.Row>
            <Grid.Column width={3}>
              <FiltersTags />
            </Grid.Column>
            <Grid.Column width={10}>
              <UserRestaurants currentUserId={this.state.currentUserId}/>
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
