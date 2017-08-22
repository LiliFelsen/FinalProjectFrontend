import React, { Component } from 'react'
import { Grid, Card, Input, Icon, Button } from 'semantic-ui-react'
import AddFriendModal from './AddFriendModal'

class FriendList extends Component {

  state = {
    usernameInput: '',
    addedFriend: '',
    modalOpen: false
  }

  handleOpen = () => {
    this.setState({ modalOpen: true })
  }

  handleClose = () => {
    this.setState({ modalOpen: false })
  }

  handleChange = (event) => {
    this.setState({ usernameInput: event.target.value })
  }

  handleFriend = (event) => {
    this.handleOpen()
    this.setState({ addedFriend: this.props.allUsers.filter(
      user => user.username.toLowerCase() === this.state.usernameInput.toLowerCase())[0]
    })
  }

  createFriendship = () => {
    document.getElementById('friend-username').value = ""
    this.handleClose()
    fetch(process.env.REACT_APP_API + '/friendships', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        user_id: this.props.currentUser.id,
        friend_id: this.state.addedFriend.id
      })
    })
      .then(() => this.props.fetchUsers(this.props.currentUser))
  }


  render(){
    return(
      <div style={{ margin: '2em 0 0 0' }}>
        <Grid centered>
          <Grid.Column>
            <Card fluid  style={{ background: 'rgba(245, 243, 243, 0.85)' }}>
              <Card.Content>
                <center>
                  <h3>Your friends:</h3>
                  {this.props.currentUser.id !== this.props.shownUserId ?
                    <Button onClick={this.props.backToCurrentUser} className='button-colored-red' size='tiny'>Go back to your places.</Button>
                  : null}
                </center>
                <br/>
                  {this.props.currentUser ?
                    this.props.currentUser.friends.map(friend =>
                      <p id={friend.id} key={friend.id} onClick={this.props.changeShownUser}>
                        <Icon name='user circle' size='big' color='teal' />
                        {friend.username}
                      </p>)
                  : null}
                  <br/>
                  <center>
                  <Input id='friend-username' placeholder='Add friend by username' onChange={this.handleChange}/>
                  <AddFriendModal handleFriend={this.handleFriend}
                    modalOpen={this.state.modalOpen}
                    handleClose={this.handleClose}
                    addedFriend={this.state.addedFriend}
                    createFriendship={this.createFriendship}
                    />
                  </center>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
      </div>
    )
  }

}

export default FriendList
